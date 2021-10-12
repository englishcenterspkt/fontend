package com.ec.member.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommandSearchMember {
    private String member_type;
    private Integer size;
    private Integer page;
    private String keyword;
    private List<String> types;
    private Long from_date;
    private Long to_date;
    @Builder.Default
    private String field_sort = "_id";
    @Builder.Default
    private Boolean is_acs = false;
}
