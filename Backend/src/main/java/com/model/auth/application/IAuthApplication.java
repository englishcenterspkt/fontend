package com.model.auth.application;

import com.model.auth.Auth;
import com.model.auth.command.CommandJwt;
import com.model.auth.command.CommandLogin;
import com.model.member.Member;

import java.util.Optional;

public interface IAuthApplication {
    Optional<Auth> add(Member member, String password) throws Exception;

    Optional<Auth> checkJwt(String jwt) throws Exception;

    Optional<String> login(CommandLogin command) throws Exception;

    Optional<CommandJwt> decodeJwt(String jwt);
}
