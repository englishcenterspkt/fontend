package com.controller;

import com.model.member.application.IMemberApplication;
import com.model.member.command.CommandAddMember;
import com.model.member.command.CommandLogin;
import com.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Component
@RestController(value = "/user")
public class MemberController extends ResponseUtils {
    @Autowired
    private IMemberApplication userApplication;

    @RequestMapping(value = "/user/get", method = RequestMethod.GET)
    public Map<String, Object> root() {
        try {
            return this.outJson(9999, null, userApplication.find(new HashMap<>()).orElse(null));
        } catch (Throwable throwable) {
            return this.outJson(-9999, throwable.getMessage(), null);
        }
    }

    @RequestMapping(value = "/user/add", method = RequestMethod.POST)
    public Map<String, Object> add(@RequestBody CommandAddMember command) {
        try {
            return this.outJson(9999, null, userApplication.add(command).orElse(null));
        } catch (Throwable throwable) {
            return this.outJson(-9999, throwable.getMessage(), null);
        }
    }

    @RequestMapping(value = "/user/login", method = RequestMethod.GET)
    public Map<String, Object> login(@RequestBody CommandLogin command) {
        try {
            return this.outJson(9999, null, userApplication.login(command).orElse(null));
        } catch (Throwable throwable) {
            return this.outJson(-9999, throwable.getMessage(), null);
        }
    }
}
