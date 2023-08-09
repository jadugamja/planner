<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.*" %>
<%@ include file="checkValidity.jsp" %>

<%
    // 인코딩 설정
    request.setCharacterEncoding("utf-8");

    // 데이터베이스 연결 정보
    String url = "jdbc:mysql://localhost/planner";
    String username = "stageus";
    String password = "1234";

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    // 값 받기
    String idVal = request.getParameter("uid");
    String pwVal = request.getParameter("pw");

    boolean isValid = true;

    // 유효성 검사
    if(!checkPasswordCombo(pwVal) || pwVal.trim().equals("") || !checkRepeatChar(pwVal) || pwVal.equals(idVal)) {
        isValid = false;
    }

    try {

        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");

        // DB 연결
        conn = DriverManager.getConnection(url, username, password);

        // 쿼리 만들기 
        String sql = "UPDATE `user` u " +
                     "SET " +
                     "  u.pw = ? " +
                     "WHERE u.id = ?; ";

        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, pwVal);
        pstmt.setString(2, idVal);

        // SQL 전송
        pstmt.executeUpdate();

    } catch(SQLException e) {

        e.getMessage();
    
    } finally {
        // 자원 해제
        if (rs != null) {
            rs.close();
        }
        if (pstmt != null) {
           pstmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        if(<%= isValid %>)
            window.location.href = "/planner/index.jsp";
        else
            history.go(-1);
    </script>
</body>