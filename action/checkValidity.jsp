<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.util.regex.Pattern" %>

<%!
    // 함수

    // 이메일 형식 검사
    public boolean checkEmail(String str) {
        String regEmail = "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        return Pattern.matches(regEmail, str);
    }

    // 비밀번호 형식 검사
    public boolean checkPasswordCombo(String str) {
        String regPass = "^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\\d~!@#$%^&*()_+=]{8,20}$";

        return Pattern.matches(regPass, str);
    }

    // 연속된 문자/숫자 검사
    public boolean checkRepeatChar(String str) {
        String regRepeat = "(\\w)\\1\\1";

        return !Pattern.matches(regRepeat, str);
    }

    // 이름 검사
    public boolean checkName(String str) {
        String regName = "^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]{3,15}$";

        return Pattern.matches(regName, str);
    }
%>
