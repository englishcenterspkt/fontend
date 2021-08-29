package com.model.auth.application;

import com.google.gson.Gson;
import com.model.auth.Auth;
import com.model.auth.command.CommandJwt;
import com.model.member.Member;
import com.utils.MongoDBConnection;
import com.utils.enums.MongodbEnum;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class AuthApplication implements IAuthApplication {
    public final MongoDBConnection<Auth> mongoDBConnection;

    private final String JWT_SECRET = "UUhuhdadyh9*&^777687";
    private final long JWT_EXPIRATION = 30 * 60 * 1000;

    @Autowired
    public AuthApplication() {
        mongoDBConnection = new MongoDBConnection<>(MongodbEnum.collection_auth, Auth.class);
    }

    @Override
    public Optional<Boolean> checkJwt(String jwt) throws Exception {
        Map<String, Object> query = new HashMap<>();
        query.put("jwt", jwt);
        long count = mongoDBConnection.count(query).orElse(0L);
        if (count > 0) {
            Optional<CommandJwt> commandJwt = this.decodeJwt(jwt);
            if (commandJwt.isPresent()) {
                long now = System.currentTimeMillis();
                if (now > commandJwt.get().getExpiration_date()) {
                    this.clearToken(commandJwt.get().getUser_id());
                } else {
                    return Optional.of(Boolean.TRUE);
                }
            }
        }
        return Optional.of(Boolean.FALSE);
    }

    @Override
    public Optional<String> generateToken(Member member) {
        long now = System.currentTimeMillis();
        Map<String, Object> header = new HashMap<>();
        header.put("alg", "HS256");
        header.put("typ", "JWT");

        CommandJwt commandJwt = CommandJwt.builder()
                .create_date(now)
                .expiration_date(now + JWT_EXPIRATION)
                .user_id(member.get_id().toString())
                .role(member.getType())
                .build();
        String result = Jwts.builder()
                .setHeader(header)
                .setPayload(new Gson().toJson(commandJwt))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
        Auth auth = Auth.builder()
                .jwt(result)
                .user_id(member.get_id().toHexString())
                .build();
        mongoDBConnection.insert(auth);
        return Optional.of(result);
    }

    @Override
    public Optional<CommandJwt> decodeJwt(String jwt) {
        try {
            CommandJwt commandJwt = new Gson().fromJson(Jwts.parser().setSigningKey(JWT_SECRET).parse(jwt).getBody().toString(), CommandJwt.class);
            return Optional.of(commandJwt);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private void clearToken(String userId) {
        Map<String, Object> query = new HashMap<>();
        query.put("user_id", userId);
        mongoDBConnection.drop(query);
    }
}
