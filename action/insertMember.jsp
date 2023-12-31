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

    // 초기화
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    // 값 받기
    String uid = request.getParameter("uid");                       // 아이디(이메일)
    String pw = request.getParameter("pw");                         // 비밀번호
    String uname = request.getParameter("uname");                   // 이름
    String tel = request.getParameter("tel");                       // 휴대 전화
    String birth = request.getParameter("birth");                   // 생년월일
    int type = Integer.parseInt(request.getParameter("utype"));     // 회원 유형

    boolean isValid = true;

    // 유효성 검사
    if(uid.trim().equals("") || !checkEmail(uid) || uid.length() > 50 ||
        !checkPasswordCombo(pw) || pw.trim().equals("") || !checkRepeatChar(pw) || pw.equals(uid) ||
        uname.trim().equals("") || !checkName(uname)) {
        isValid = false;
    }

    try {
        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");

        // DB 연결
        conn = DriverManager.getConnection(url, username, password);

        // 쿼리 만들기
        String sql = "INSERT INTO `user` (id, pw, name, tel, birth, type) " +
                     "VALUES (?, ?, ?, ?, ?, ?); ";

        pstmt = conn.prepareStatement(sql);

        pstmt.setString(1, uid);
        pstmt.setString(2, pw);
        pstmt.setString(3, uname);
        pstmt.setString(4, tel);
        pstmt.setString(5, birth);
        pstmt.setInt(6, type);

        // SQL 전송
        pstmt.executeUpdate();

        // 세션에 아이디, 비밀번호 값 저장
        // request.setAttribute("uid", uid);
        // request.setAttribute("pw", pw);

    } catch(SQLException e) {

        e.printStackTrace();
        // e.getMessage();
    
    } finally {
        // 자원 해제
        if (rs != null)
            rs.close();

        if (pstmt != null)
            pstmt.close();

        if (conn != null)
            conn.close();
    }
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원 가입 성공!</title>
</head>
<body>
    <script>
        if(<%= isValid %>)
            window.location.href = "/planner/index.jsp";
        else
            history.go(-1);
    </script>
</body>