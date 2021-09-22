package com.controller;

import com.model.auth.command.CommandJwt;
import com.model.member.application.IMemberApplication;
import com.model.member.command.CommandAddMember;
import com.model.member.command.CommandSearchMember;
import com.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

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

    @PostMapping(value = "/member/get_list")
    public String getList(@RequestBody CommandSearchMember command, @RequestParam Integer page, @RequestParam Integer size, @RequestHeader String Authorization) {
        try {
            command.setPage(page);
            command.setSize(size);
            command.setMember_type(this.getMemberType(Authorization));
            return this.outJson(9999, null, userApplication.getList(command).orElse(null));
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
