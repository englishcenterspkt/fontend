package com.model.auth.application;

import com.model.auth.command.CommandJwt;
import com.model.users.User;

import java.util.Optional;

public interface IAuthApplication {
    Optional<Boolean> checkJwt(String jwt) throws Exception;

    Optional<String> generateToken(User user);

    Optional<CommandJwt> decodeJwt(String jwt);
}
