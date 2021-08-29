package com.security;

import com.model.auth.application.AuthApplication;
import com.model.auth.application.IAuthApplication;
import com.model.auth.command.CommandJwt;
import com.model.member.Member;
import com.model.member.application.IMemberApplication;
import com.model.member.application.MemberApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetails implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String jwt) throws UsernameNotFoundException {
        IAuthApplication authApplication = new AuthApplication();
        IMemberApplication memberApplication = new MemberApplication();
        CommandJwt commandJwt = authApplication.decodeJwt(jwt).get();
        Member member = memberApplication.getById(commandJwt.getUser_id()).get();

        return org.springframework.security.core.userdetails.User
                .withUsername(member.getEmail())
                .password(member.getPassword())
                .authorities(commandJwt.getRole())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
