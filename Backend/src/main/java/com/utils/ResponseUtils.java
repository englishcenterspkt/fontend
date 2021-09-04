package com.utils;

import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;

public abstract class ResponseUtils {
    protected String outJson(Integer code, String message, Object object) {
        Map<String, Object> result = new HashMap<>();
        if (code != null) {
            result.put("code", code);
        }
        if (StringUtils.isNotBlank(message)) {
            result.put("message", message);
        }
        if (object != null) {
            result.put("payload", object);
        }
        return JsonUtils.objectToJson(result);
    }
}
