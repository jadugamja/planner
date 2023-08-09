<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.ArrayList" %>

<%
    // 결과값 넣을 리스트 생성
    ArrayList<String> myInfo = new ArrayList<String>();

    try {
        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");

        // DB 연결
        conn = DriverManager.getConnection(url, username, password);

        String query = "SELECT " +
                              "CASE " +
                              "   WHEN u.`type` = 0 THEN '직원' " +
                              "   ELSE '팀장' " +
                              "END 		    AS type, " +
                              "u.name 		AS name," +
                              "u.tel 		AS tel, " +
                              "u.birth 	    AS birth " +
                        "FROM `user` u " +
                        "WHERE u.id = ?; ";
        
        pstmt = conn.prepareStatement(query);
        pstmt.setString(1, uid);

        rs = pstmt.executeQuery();
        
        while(rs.next()) {
            String type = rs.getString("type"); 		// 회원 유형
            String name = rs.getString("name"); 		// 회원 이름
            String tel = rs.getString("tel"); 		    // 회원 휴대폰 번호
            String birth = rs.getString("birth");		// 회원 생일

            myInfo.add("\""+type+"\"");
            myInfo.add("\""+name+"\"");
            myInfo.add("\""+tel+"\"");
            myInfo.add("\""+birth+"\"");
        }

    } catch(SQLException e) {

        // 로그
        e.printStackTrace();

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
    <script>
        const myInfo = <%= myInfo %>;
    </script>
</head>
<body>
    <aside id="my-info" class="side-bar hide">
        <%-- 내 정보 --%>
        <div class="info-box">
            <div class="info-main-box">
                <!-- 회원 유형 -->
                <div class="center-aligned rounded">
                    <span id="my-type"></span>
                </div>
                <!-- // 회원 유형 -->
                <ul class="info-main-txt">
                    <!-- 회원 이름: 이름 -->
                    <li class="bold-txt">
                        <span id="my-name"></span>
                    </li>
                    <!-- //회원 이름: 이름 -->
                    <li id="my-email" class="gray-txt"></span>
                </ul>
            </div>
            <div class="info-sub-box">
                <div class="center-aligned i-bg-circle">
                    <i class="fa-solid fa-mobile-screen fontsize-20"></i>
                </div>
                <span id="my-tel" class="info-sub-txt"></span>
            </div>
            <div class="info-sub-box">
                <div class="center-aligned i-bg-circle">
                    <i class="fa-solid fa-cake-candles fontsize-20"></i>
                </div>
                <span id="my-b-day" class="info-sub-txt"></span>
            </div>
        </div>
        <%-- //내 정보 --%>

        <%-- 직원 정보 (팀장 권한) --%>
        <div class="info-box hide">
            <h2 class="list-title-wrapper">
                <span>
                    <i class="fa-regular fa-rectangle-list fontsize-22"></i>
                </span>
                <span class="list-title">직원 목록</span>
            </h2>
            <div>
                <ul class="emp-list">
                </ul>
            </div>
        </div>
        <%-- //직원 정보 (팀장 권한) --%>

        <div id="logout" class="logout">
            <span class="fontsize-22">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
            <span>로그아웃</span>
        </div>

    </aside>
</body>