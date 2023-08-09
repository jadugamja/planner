<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.*" %>
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
    int category = Integer.parseInt(request.getParameter("categories"));
    String date = request.getParameter("date");
    String time = request.getParameter("time");
    String title = request.getParameter("title");

    // 세션 값 불러오기
    String uid = session.getAttribute("uid") != null ? (String)session.getAttribute("uid") : "";

    try {

        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");

        // DB 연결
        conn = DriverManager.getConnection(url, username, password);

        // 쿼리 만들기
        String sql = "INSERT INTO plan (user_id, categories , date, start_time, title) " +
                     "VALUES (?, ?, ?, ?, ?);";

        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, uid);
        pstmt.setInt(2, category);
        pstmt.setString(3, date);
        pstmt.setString(4, time);
        pstmt.setString(5, title);

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
        window.self.close();
        window.opener.location.reload();        
    </script>
</body>