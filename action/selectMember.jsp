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
    String uid = request.getParameter("uid");   // 아이디(이메일)
    String pw = request.getParameter("pw");     // 비밀번호

    boolean isValid = true;
    boolean isUser = false;
    int isAdmin = 0;

    // 유효성 검사
    if(uid.trim().equals("") || !checkEmail(uid) || uid.length() > 50 ||
        !checkPasswordCombo(pw) || pw.trim().equals("") || !checkRepeatChar(pw) || pw.equals(uid)) {
        isValid = false;
    }

    try {
        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");

        // DB 연결
        conn = DriverManager.getConnection(url, username, password);

        // 쿼리 만들기
        String sql = "SELECT u.`type` AS type " +
                     "FROM `user` u " +
                     "WHERE u.id = ? " +
                     "AND u.pw = ? ";

        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, uid);
        pstmt.setString(2, pw);

        // 쿼리 전송 및 결과 받기
        rs = pstmt.executeQuery();

        if(rs.next()) {
            isUser = true;
            isAdmin = rs.getInt("type");

            // 세션에 아이디 값, 권한 저장
            session.setAttribute("uid", uid);
            session.setAttribute("isAdmin", isAdmin);
        }

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
    <title>ㄱㄱ일정 전체 목록ㄱㄱ</title>
</head>
<body>
    <script>
        if(<%=isValid%> && <%=isUser%>) {
            window.location.href = "/planner/views/plan/list.jsp";
        } else if(!<%=isUser%>){
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            history.go(-1);
        } else {
            alert("아이디 또는 비밀번호를 정확히 입력했는지 확인하세요.");
            history.go(-1);
        }
    </script>
</body>