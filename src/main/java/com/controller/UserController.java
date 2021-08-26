package com.controller;

import com.model.users.application.IUserApplication;
import com.model.users.command.CommandAddUser;
import com.utils.ResponseUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Component
@RestController
public class UserController extends ResponseUtils {
    @Autowired
    private IUserApplication userApplication;

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public Map<String, Object> root() {
        try {
            return this.outJson(9999, null, userApplication.find(new HashMap<>()).orElse(null));
        } catch (Throwable throwable) {
            return this.outJson(-9999, throwable.getMessage(), null);
        }
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Map<String, Object> add(@RequestBody CommandAddUser command) {
        try {
            return this.outJson(9999, null, userApplication.add(command).orElse(null));
        } catch (Throwable throwable) {
            return this.outJson(-9999, throwable.getMessage(), null);
        }
    }
}
