package com.model.users.application;

import com.model.users.User;
import com.model.users.command.CommandAddUser;
import com.utils.MongoDBConnection;
import com.utils.enums.ExceptionEnum;
import com.utils.enums.MongodbEnum;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class UserApplication implements IUserApplication {
    public final MongoDBConnection<User> mongoDBConnection;

    @Autowired
    public UserApplication() {
        mongoDBConnection = new MongoDBConnection<>(MongodbEnum.collection_user, User.class);
    }

    @Override
    public Optional<List<User>> find(Map<String, Object> query) {
        query.put("is_deleted", false);
        return mongoDBConnection.find(query);
    }

    @Override
    public Optional<User> add(CommandAddUser command) throws Exception {
        if (StringUtils.isAnyBlank(command.getName(), command.getEmail(), command.getPassword())) {
            throw new Exception(ExceptionEnum.param_not_null);
        }
        User user = User.builder()
                .create_date(System.currentTimeMillis())
                .name(command.getName())
                .build();
        return mongoDBConnection.insert(user);
    }
}
