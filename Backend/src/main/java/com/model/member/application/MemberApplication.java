package com.model.member.application;

import com.model.auth.application.IAuthApplication;
import com.model.member.Member;
import com.model.member.command.CommandAddMember;
import com.model.member.command.CommandSearchMember;
import com.utils.MongoDBConnection;
import com.utils.Paging;
import com.utils.enums.ExceptionEnum;
import com.utils.enums.MongodbEnum;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class MemberApplication implements IMemberApplication {
    public final MongoDBConnection<Member> mongoDBConnection;
    @Autowired
    private IAuthApplication authApplication;

    @Autowired
    public MemberApplication() {
        mongoDBConnection = new MongoDBConnection<>(MongodbEnum.collection_member, Member.class);
    }

    @Override
    public Optional<List<Member>> find(Map<String, Object> query) {
        query.put("is_deleted", false);
        return mongoDBConnection.find(query);
    }

    @Override
    public Optional<Paging<Member>> getList(CommandSearchMember command) throws Exception {
        if (!Member.MemberType.ADMIN.equals(command.getMember_type())) {
            throw new Exception(ExceptionEnum.member_type_deny);
        }
        Map<String, Object> query = new HashMap<>();
        Map<String, Object> sort = new HashMap<>();
        sort.put(command.getField_sort(), command.getIs_acs() ? 1 : -1);
        query.put("is_deleted", false);
        return mongoDBConnection.find(query, sort, command.getPage(), command.getSize());
    }

    @Override
    public Optional<Member> add(CommandAddMember command) throws Exception {
        if (StringUtils.isAnyBlank(command.getName(), command.getEmail(), command.getPassword())) {
            throw new Exception(ExceptionEnum.param_not_null);
        }
        Map<String, Object> query = new HashMap<>();
        query.put("is_deleted", false);
        query.put("email", command.getEmail());
        long count = mongoDBConnection.count(query).orElse(0L);
        if (count > 0) {
            throw new Exception(ExceptionEnum.member_exist);
        }
        Member member = Member.builder()
                .create_date(System.currentTimeMillis())
                .name(command.getName())
                .email(command.getEmail())
                .type(command.getType() != null ? command.getType() : Member.MemberType.STUDENT)
                .avatar(command.getAvatar())
                .build();
        Optional<Member> optional = mongoDBConnection.insert(member);
        if (optional.isPresent()) {
            authApplication.add(optional.get(), command.getPassword());
            return optional;
        }
        return Optional.empty();
    }

    private Optional<Member> getByEmail(String email) {
        Map<String, Object> query = new HashMap<>();
        query.put("is_deleted", false);
        query.put("email", email);
        return mongoDBConnection.findOne(query);
    }

    @Override
    public Optional<Member> getById(String id) {
        Map<String, Object> query = new HashMap<>();
        query.put("is_deleted", false);
        query.put("_id", new ObjectId(id));
        return mongoDBConnection.findOne(query);
    }
}
