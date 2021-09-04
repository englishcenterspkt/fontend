package com.controller;

import com.model.member.application.IMemberApplication;
import com.model.member.command.CommandAddMember;
import com.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "${port.web}")
@Component
@RestController(value = "/member")
public class MemberController extends ResponseUtils {
    @Autowired
    private IMemberApplication userApplication;

    @RequestMapping(value = "/member/get_all", method = RequestMethod.GET)
    public String get() {
        try {
            return this.outJson(9999, null, userApplication.find(new HashMap<>()).orElse(null));
        } catch (Throwable throwable) {
            return this.outJson(-9999, throwable.getMessage(), null);
        }
    }

    @RequestMapping(value = "/member/add", method = RequestMethod.POST)
    public String add(@RequestBody CommandAddMember command) {
        try {
            return this.outJson(9999, null, userApplication.add(command).orElse(null));
        } catch (Throwable throwable) {
            return this.outJson(-9999, throwable.getMessage(), null);
        }
    }
}
