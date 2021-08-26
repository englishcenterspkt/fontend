package com.model.auth.application;

import java.util.Optional;

public interface IAuthApplication {
    Optional<Boolean> checkJwt(String jwt) throws Exception;
}
