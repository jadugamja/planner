<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>

<%
    // 인코딩 설정
    request.setCharacterEncoding("utf-8");

    // 데이터베이스 연결 정보
    String url = "jdbc:mysql://localhost/planner";
    String username = "stageus";
    String password = "1234";

    Connection conn = null;
    ResultSet rs = null;
    PreparedStatement query = null;

    // 값 받기
    String nameValue = request.getParameter("uname");
    String telValue = request.getParameter("tel");

    // 결과값 초기화
    String uid = "";
    
    try {

        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");
    
        // DB 연결
        conn = DriverManager.getConnection(url, username, password);
        
        // 쿼리
        String sql = "SELECT u.id AS id " +
                     "FROM `user` u " +
                     "WHERE u.name = ? " +
                     "AND u.tel = ?; ";

        query = conn.prepareStatement(sql);
        query.setString(1, nameValue);
        query.setString(2, telValue);
    
        // 쿼리 전송 및 결과 받기
        rs = query.executeQuery();

        if(rs.next()){
            uid = rs.getString("id");

            //if(!uid.equals("")) {
                // 세션에 아이디, 비밀번호 값 저장
            //  session.setAttribute("uid", uid);
            // session.setAttribute("pw", "");
            //}
        }

    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        if(rs != null)
           rs.close();
        if(query != null)
           query.close();
        if(conn != null)
           conn.close();
    }

%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/common.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/main.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/dialog.css">
    <script src="/planner/resources/js/account/findIdResult.js"></script>
</head>
<body>
    <!-- 성공 시 -->
    <main class="modal success-window hide">
        <div class="modal-box modal-color">
            <div class="modal-content">
                <div class="input-wrapper">
                    <span class="input-txt">다음 정보로 가입된 아이디가 있습니다.</span>
                </div>
                <div class="result-wrapper">
                    <span class="normal-txt">· 아이디</span>
                    <span class="normal-txt result-txt"><%= uid %></span>
                </div>
                <div class="btn-wrapper">
                    <button class="d-btn login-btn">로그인</button>
                    <button class="d-btn go-pw-btn">비밀번호 찾기</button>
                </div>
            </div>
        </div>
    </main>
    <!-- //성공 시 -->

    <!-- 실패 시 -->
    <main class="modal failure-window hide">
        <div class="modal-box modal-color">
            <div class="modal-content">
                <div class="result-wrapper">
                    <span class="result-txt">입력된 정보로 가입된 회원 아이디가 존재하지 않습니다.</span>
                </div>
                <div class="btn-wrapper">
                    <button class="d-btn cancel-btn">확인</button>
                </div>
            </div>
        </div>
    </main>
    <!-- //실패 시 -->
</body>