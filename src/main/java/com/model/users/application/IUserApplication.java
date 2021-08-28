package com.model.users.application;

import com.model.users.User;
import com.model.users.command.CommandAddUser;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IUserApplication {
    Optional<List<User>> find(Map<String, Object> query);

    Optional<User> add(CommandAddUser command) throws Exception;
}
