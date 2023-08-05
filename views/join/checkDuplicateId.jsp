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
    String idValue = request.getParameter("uid");

    // 결과값 초기화
    int isExisted = 0;
    
    try {

        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");
    
        // DB 연결
        conn = DriverManager.getConnection(url, username, password);
        
        // 쿼리
        String sql = "SELECT count(1) AS cnt" +
                     "FROM `user` u " +
                     "WHERE u.id = ?; ";

        query = conn.prepareStatement(sql);
        query.setString(1, idValue);
    
        // 쿼리 전송 및 결과 받기
        rs = query.executeQuery();

        System.out.println("rs ::::::::::::::::::: " + rs);
        System.out.println("rs ::::::::::::::::::: " + rs.getInt("cnt"));
        if(rs.next()){
            isExisted = rs.getInt("cnt");
        }

    } catch (SQLException e) {
        e.getMessage();
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
    <script src="/planner/resources/js/join/checkDuplicateId.js"></script>
</head>
<body>
    <input type="hidden" class="result" name="isExisted" value="<%= isExisted %>">

    <!-- 성공 시 -->
    <main class="modal success-window hide">
        <div class="modal-box modal-color">
            <div class="modal-content">
                <div class="input-wrapper">
                    <span class="input-txt">입력한 아이디(이메일): </span>
                    <span class="input-val"><%= idValue %></span>
                </div>
                <div class="result-wrapper">
                    <span class="result-txt">사용 가능한 아이디입니다.</span>
                    <i class="fa-regular fa-face-smile icon-face"></i>
                </div>
                <div class="btn-wrapper">
                    <button class="d-btn ok-btn">사용하기</button>
                    <button class="d-btn cancel-btn">취소</button>
                </div>
            </div>
        </div>
    </main>
    <!-- //성공 시 -->

    <!-- 실패 시 -->
    <main class="modal failure-window hide">
        <div class="modal-box modal-color">
            <div class="modal-content">
                <div class="input-wrapper">
                    <span class="input-txt">입력한 아이디(이메일): </span>
                    <span class="input-val"><%= idValue %></span>
                </div>
                <div class="result-wrapper">
                    <span class="result-txt">이미 사용 중인 아이디입니다.</span>
                    <i class="fa-solid fa-face-frown icon-face"></i>
                </div>
                <div class="btn-wrapper">
                    <button class="d-btn cancel-btn">다시 쓰기</button>
                </div>
            </div>
        </div>
    </main>
    <!-- //실패 시 -->
</body>