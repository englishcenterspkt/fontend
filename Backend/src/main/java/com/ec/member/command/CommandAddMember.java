package com.model.member.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommandAddMember {
    private String name;
    private String email;
    private String password;
    private String type;
    private String avatar;
}

