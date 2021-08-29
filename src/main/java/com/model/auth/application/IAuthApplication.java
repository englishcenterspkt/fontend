package com.model.auth.application;

import com.model.auth.command.CommandJwt;
import com.model.member.Member;

import java.util.Optional;

public interface IAuthApplication {
    Optional<Boolean> checkJwt(String jwt) throws Exception;

    Optional<String> generateToken(Member member);

    Optional<CommandJwt> decodeJwt(String jwt);
}
