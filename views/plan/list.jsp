<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Set" %>
<%@ page import="java.util.TreeSet" %>
<%@ page import="java.time.LocalDate" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@ include file="../../action/selectUserList.jsp" %>

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

    // 현재 날짜 추출 및 대입
    LocalDate now = LocalDate.now();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
    DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MM");

    // 현재 날짜 세팅
    String yearMonth = now.format(formatter);
    String mon = Integer.parseInt(now.format(monthFormatter)) < 10 ? now.format(monthFormatter).substring(1) + "월" : now.format(monthFormatter) + "월";
    
    // 날짜 파라미터가 있는 경우
    if(request.getParameter("yearMonth") != null) {
        yearMonth = request.getParameter("yearMonth");
        mon = Integer.parseInt(yearMonth.split("-")[1]) < 10 ? yearMonth.split("-")[1].substring(1) + "월" : yearMonth.split("-")[1] + "월";
    }

    String year = yearMonth.split("-")[0];

    // 세션 값 불러오기
    String uid = session.getAttribute("uid") != null ? (String)session.getAttribute("uid") : "";
    int isAdmin = session.getAttribute("isAdmin") != null && session.getAttribute("isAdmin") instanceof Integer ? (int)session.getAttribute("isAdmin") : 0;

    // 직원 파라미터가 있는 경우
    if(request.getParameter("empId") != null) {
        uid = request.getParameter("empId");
    }

    List<List<String>> rsList = new ArrayList<>();
    if(isAdmin == 1) {
        rsList = selectUserList(uid);
    }
    
    // 결과값 넣을 리스트 생성
    List<Map> planList = new ArrayList<Map>();
    Map<String, Object> map;

    try {
        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");

        // DB 연결
        conn = DriverManager.getConnection(url, username, password);

        String query = "SELECT p.id id, " +
                              //"CASE " +
                              //"   WHEN DATE_FORMAT(p.date, '%d') LIKE '0%' THEN REPLACE(DATE_FORMAT(p.date, '%d'), '0', '') " +
                              //"   ELSE DATE_FORMAT(p.date, '%d') " +
                              //"END day, " +
                              "DATE_FORMAT(p.date, '%d') day, " +
                              "CASE " +
                              "   WHEN DATE_FORMAT(p.date, '%a') = 'Mon' THEN '月'" +
                              "   WHEN DATE_FORMAT(p.date, '%a') = 'Tue' THEN '火'" +
                              "   WHEN DATE_FORMAT(p.date, '%a') = 'Wed' THEN '水'" +
                              "   WHEN DATE_FORMAT(p.date, '%a') = 'Thu' THEN '木'" +
                              "   WHEN DATE_FORMAT(p.date, '%a') = 'Fri' THEN '金'" +
                              "   WHEN DATE_FORMAT(p.date, '%a') = 'Sat' THEN '土'" +
                              "   ELSE '日'" +
                              "END yoil, " +
                              "CASE " +
                              "   WHEN DATE_FORMAT(p.start_time, '%p %l:%i') LIKE 'PM%' THEN REPLACE(DATE_FORMAT(p.start_time, '%p %l:%i'), 'PM', '오후') " +
                              "   ELSE REPLACE(DATE_FORMAT(p.start_time, '%p %l:%i'), 'AM', '오전') " +
                              "END time, " +
                              "p.title title " +
                        "FROM plan p " +
                        "JOIN `user` u ON u.id = p.user_id " +
                        "WHERE u.del_yn != 1 AND p.del_yn != 1 AND DATE_FORMAT(p.`date`, '%Y-%m') = ? " +
                        "AND u.id = ?  " +
                        "ORDER BY p.`date`, p.start_time, p.id;";
        
        pstmt = conn.prepareStatement(query);
        pstmt.setString(1, yearMonth);
        pstmt.setString(2, uid);

        rs = pstmt.executeQuery();
        
        while(rs.next()) {
            map = new HashMap<String, Object>();
            String id = rs.getString("id"); 		    // 일정 아뒤
            String day = rs.getString("day"); 		    // 일정 날짜
            String yoil = rs.getString("yoil"); 		// 일정 요일
            String time = rs.getString("time");		    // 일정 시작 시간
            String title = rs.getString("title");		// 일정 제목

            map.put("id", id);
            map.put("day", day);
            map.put("yoil", yoil);
            map.put("time", time);
            map.put("title", title);

            planList.add(map);
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
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/common.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/main.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/join/join.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/dialog.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/plan/list.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/plan/aside.css" />
    <script>
        if(<%= uid.length() %> == 0) 
            window.location.href = "/planner/index.jsp";
    </script>
    <script src="/planner/resources/js/plan/list.js"></script>
    <script src="/planner/resources/js/plan/aside.js"></script>
</head>
<body>
    <!-- 현재 로그인 아이디 -->
    <input type="hidden" class="rsList" value="<%= rsList %>" />
    <input type="hidden" class="login-id" value="<%= uid %>" />

    <!-- 헤더 -->
    <header>
        <div class="logo">
            <img src="/planner/resources/img/logo.png" />
        </div>
        <div class="menu">
            <i class="fa-solid fa-align-right fa-flip-vertical"></i>
        </div>
    </header>
    <!-- //헤더 -->

    <!-- 사이드바 -->
    <%@ include file="../comm/aside.jsp" %>
    <!-- //사이드바 -->

    <!-- 메인 -->
    <main>
        <form>
            <div class="main-wrapper">

                <!-- 날짜 검색 영역 -->
                <div class="date-wrapper">
                    <button class="today-btn" value="today">오늘</button>
                    
                    <%-- 연도 --%>
                    <div class="year-wrapper">
                        <button type="button" class="go-year-btn go-prev-year">
                            <i class="fa-solid fa-angle-left"></i>
                        </button>
                        <span class="year"><%= year %>년</span>
                        <button type="button" class="go-year-btn go-next-year">
                            <i class="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                    <%-- //연도 --%>

                    <%-- 월 --%>
                    <div class="select" id="month">
                        <div class="selected between-justified box-padding">
                            <span class="selected-value"><%= mon %></span>
                        </div>
                    </div>
                    <%-- //월 --%>

                </div>
                <!-- //날짜 검색 영역 -->

                <!-- 일정 -->
                <section class="plan-list-wrapper">
                    <%
                        // 중복 없는 날짜 그룹
                        Set<String> dayGroup = new TreeSet<>();
                        // 그 날짜(key)에 해당하는 요일(value)
                        Map<String, String> dayToYoil = new HashMap<>();

                        // 반복문1: 그룹 만들기
                        for (Map<String, Object> plan : planList) { 
                            String noRepeatedDay = (String)plan.get("day");
                            String yoil = (String)plan.get("yoil");
                        
                            dayGroup.add(noRepeatedDay);
                            // key: 날짜/ value: 요일
                            dayToYoil.put(noRepeatedDay, yoil);
                        }    

                        // 반복문2: 코드 만들기
                        for(String day: dayGroup) {
                    %>
                    <article class="plan-list">

                        <!-- 날짜, 요일 출력 영역 -->
                        <div class="plan-left-side">
                            <div>
                    <%
                            if (day.indexOf("0") == 0) {            // 10일 전
                                day = day.substring(1);
                    %>
                                <span class="date date-num"><%= day %></span>
                                <span class="date date-kor-txt">일</span>
                            </div>
                    <%
                                String zero = "0";
                                day = zero.concat(day);
                            } else {                                // 10일부터
                    %>
                                <span class="date date-num"><%= day %></span>
                                <span class="date date-kor-txt">일</span>
                            </div>
                    <%
                            }
                    %>
                            <span class="day day-txt weekday"><%= dayToYoil.get(day) %></span>
                        </div>
                        <!-- //날짜, 요일 출력 영역 -->

                        <!-- 일정 시간, 제목 영역 -->
                        <div class="plan-box-wrapper">
                    <%
                            for (Map<String, Object> plan : planList) { 
                                String planDay = (String) plan.get("day");
                                if (planDay.equals(day)) {                    
                    %>
                            <div class="plan-box">
                                <span>
                                    <i class="fa-solid fa-thumbtack rotate-25 pin-icon"></i>
                                </span>
                                <div class="plan-content">
                                    <span class="time"><%= (String)plan.get("time") %></span>
                                    <span class="plan"><%= (String)plan.get("title") %></span>
                                </div>
                                <div class="plan-icon-group right">
                                    <button type="button" value="upt" class="upt-btn">
                                        <i class="fa-regular fa-pen-to-square plan-icon light-blue-icon"></i>
                                    </button>
                                    <button type="button" value="del" class="del-btn">
                                        <i class="fa-regular fa-trash-can plan-icon light-red-icon"></i>
                                    </button>
                                </div>
                                <input type="hidden" value="<%= (String)plan.get("id") %>"/>
                            </div>
                   <% 
                                }
                            }
                    %>
                        </div>
                        <!-- //일정 시간, 제목 영역 -->

                    </article>
                    <%
                        }
                    %>
                    <!-- 일정 추가 버튼 -->
                    <div class="add-btn">
                        <i class="fa-solid fa-plus plus-icon"></i>
                    </div>
                    <!-- //일정 추가 버튼 -->
                </section>
            </div>
        </form>
    </main>
    <!-- //메인 -->
</body>