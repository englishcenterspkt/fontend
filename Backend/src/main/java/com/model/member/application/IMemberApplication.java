package com.model.member.application;

import com.model.member.Member;
import com.model.member.command.CommandAddMember;
import com.model.member.command.CommandSearchMember;
import com.utils.Paging;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IMemberApplication {
    Optional<List<Member>> find(Map<String, Object> query);

    Optional<Paging<Member>> getList(CommandSearchMember command) throws Exception;

    Optional<Member> add(CommandAddMember command) throws Exception;

    Optional<Member> getById(String id);
}
