package com.model.users.application;

import com.model.users.User;
import com.model.users.command.CommandAddUser;
import org.bson.Document;

import java.util.List;
import java.util.Optional;

public interface IUserApplication {
    Optional<List<User>> find(Document query);

    Optional<User> add(CommandAddUser command) throws Exception;
}
