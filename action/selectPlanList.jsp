<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.time.LocalDate" %>
<%@ page import="java.time.format.DateTimeFormatter" %>

<%

    // 인코딩 설정
    request.setCharacterEncoding("utf-8");

    // 데이터베이스 연결 정보
    String url = "jdbc:mysql://localhost/planner";
    String username = "stageus";
    String password = "1234";

    // 현재 날짜 구하기
    LocalDate now = LocalDate.now();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
    String mm = now.format(formatter);

    // 받은 값으로 세팅 (없으면 현재 날짜)
    String yearMonth = request.getParameter("this-month") != null ? request.getParameter("this-month") : mm;

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    
    List<Map> planList = new ArrayList<Map>();
    Map<String, Object> map;
    
    try {
        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");
    
        // DB 연결
        conn = DriverManager.getConnection(url, username, password);

        String query = "SELECT p.id id, DATE_FORMAT(p.date, '%d') day, p.start_time time, p.title title FROM plan p JOIN `user` u ON u.id = p.user_id WHERE u.del_yn != 1 AND p.del_yn != 1 AND DATE_FORMAT(p.`date`, '%Y-%m') = ? ORDER BY p.`date`, p.id;";
        
        pstmt = conn.prepareStatement(query);
        pstmt.setString(1, yearMonth);

        rs = pstmt.executeQuery();
        
        while(rs.next()) {
            map = new HashMap<String, Object>();
            String id = rs.getString("id"); 		    // 일정 아뒤
            String day = rs.getString("day"); 		    // 일정 날짜
            String time = rs.getString("time");		    // 일정 시작 시간
            String title = rs.getString("title");		// 일정 제목
    
            map.put("id", id);
            map.put("day", day);
            map.put("time", time);
            map.put("title", title);

            planList.add(map);
        }

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
    
    request.setAttribute("result", planList);
    request.getRequestDispatcher("../views/plan/list.jsp").forward(request, response);
    
    // 주소 변경 XX, 하지만.. 빈 리스트로 데이터를 전달해서 한계가 분명
    // String urlWithParams = "../views/plan/list.jsp?result=" + java.net.URLEncoder.encode(planList.toString(), "UTF-8");
    // response.sendRedirect(urlWithParams);
%>