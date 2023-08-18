<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>

<%!
    public List<List<String>> selectUserList(String uid) throws Exception {

        // 데이터베이스 연결 정보
        String url = "jdbc:mysql://localhost/planner";
        String username = "stageus";
        String password = "1234";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        List<List<String>> userList = new ArrayList<>();
        //String[][] userList = null;

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
                                "u.name 		AS name, " +
                                "u.id 		    AS id FROM `user` u WHERE u.id != ? ORDER BY u.`type` DESC, u.name ;";
            
            pstmt = conn.prepareStatement(query);
            pstmt.setString(1, uid);

            // 쿼리 전송
            rs = pstmt.executeQuery();

            while(rs.next()) {
                List<String> row = new ArrayList<>();

                row.add(rs.getString("type"));    // 회원 유형
                row.add(rs.getString("name"));    // 회원 이름
                row.add(rs.getString("id")); 	  // 회원 아이디(이메일)
                
                userList.add(row);      
            }

        } catch(SQLException e) {

            // 일단 로그 ㄱㄱ
            e.printStackTrace();
            // e.getMessage();

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

        return userList;
    }
%>