package com.model.auth.application;

import com.model.auth.Auth;
import com.utils.MongoDBConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class AuthApplication implements IAuthApplication {
    public final MongoDBConnection<Auth> mongoDBConnection;

    @Autowired
    public AuthApplication() {
        mongoDBConnection = new MongoDBConnection<>("auth", Auth.class);
    }

    @Override
    public Optional<Boolean> checkJwt(String jwt) throws Exception {
        Map<String, Object> query = new HashMap<>();
        query.put("jwt", jwt);
        long count = mongoDBConnection.count(query).orElse(0L);
        if (count > 0) {
            return Optional.of(Boolean.TRUE);
        }
        return Optional.of(Boolean.FALSE);
    }
}
