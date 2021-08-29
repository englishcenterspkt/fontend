package com.security;

import com.model.auth.application.IAuthApplication;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtTokenFilter extends OncePerRequestFilter {

    private final IAuthApplication authApplication;
    private final MyUserDetails myUserDetails;

    public JwtTokenFilter(IAuthApplication authApplication) {
        this.authApplication = authApplication;
        this.myUserDetails = new MyUserDetails();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String token = this.resolveToken(httpServletRequest);
        try {
            if (StringUtils.isNotBlank(token) && authApplication.checkJwt(token).orElse(false)) {
                UserDetails userDetails = myUserDetails.loadUserByUsername(token);
                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            SecurityContextHolder.clearContext();
            httpServletResponse.sendError(ex.hashCode(), ex.getMessage());
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
