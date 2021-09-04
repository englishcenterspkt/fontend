package com.security;

import com.model.auth.application.IAuthApplication;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtTokenFilterConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private IAuthApplication authApplication;

    public JwtTokenFilterConfigurer(IAuthApplication authApplication) {
        this.authApplication = authApplication;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        JwtTokenFilter customFilter = new JwtTokenFilter(authApplication);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
