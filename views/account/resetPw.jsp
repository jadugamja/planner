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
    ResultSet rs = null;
    PreparedStatement query = null;

    // 값 받기
    String idValue = request.getParameter("uid");

    // 결과값 초기화
    String pw = "ddd";
    
    try {

        // Connector 파일 불러와서 MariaDB 연결
        Class.forName("com.mysql.jdbc.Driver");
    
        // DB 연결
        conn = DriverManager.getConnection(url, username, password);
        
        // 쿼리
        String sql = "SELECT u.pw AS pw " +
                     "FROM `user` u " +
                     "WHERE u.id = ? ";

        query = conn.prepareStatement(sql);
        query.setString(1, idValue);
    
        // 쿼리 전송 및 결과 받기
        rs = query.executeQuery();

        if(rs.next()){
            pw = rs.getString("pw");
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
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/account/resetPw.css">
    <script src="/planner/resources/js/account/resetPw.js"></script>
</head>
<body>
    <!-- 결과 넣어두기 -->
    <input type="hidden" class="result" name="pw" value="<%= pw %>">

    <!-- 헤더 -->
    <header>
        <div class="logo">
            <img src="../../resources/img/logo_with_text.png" />
        </div>
    </header>
    <!-- //헤더 -->

    <!-- 메인 -->
    <main class="divided">
        <section class="banner"></section>
        <section class="content">
            <div class="content-wrapper">
                <h1 class="title">비밀번호 재설정하기</h1>
                <p class="guide-txt">새로운 비밀번호를 입력해주세요.</p>
                <form>
                    <div class="item-wrapper">

                        <!-- 입력란 -->
                        <label for="pw" class="label-txt">비밀번호</label>
                        <input type="password" name="pw" id="pw" class="input-box input-txt" placeholder="비밀번호를 입력하세요"/>
                        <!-- //입력란 -->
                        
                        <!-- 유효성 검사 문구 -->
                        <div class="chk-wrapper hide">
                            <div class="chk-group">
                                <i class="fa-solid fa-xmark xmark"></i>
                                <span class="check">영문/숫자/특수문자 중 2가지 조합 (8~20자)</span>
                            </div>
                            <div class="chk-group">
                                <i class="fa-solid fa-xmark xmark"></i>
                                <span class="check">3개 이상 연속되거나 동일한 문자/숫자 조합</span>
                            </div>
                            <div class="chk-group">
                                <i class="fa-solid fa-xmark xmark"></i>
                                <span class="check">아이디(이메일) 제외</span>
                            </div>
                            <div class="chk-group">
                                <i class="fa-solid fa-xmark xmark"></i>
                                <span class="check">기존 비밀번호 제외</span>
                            </div>
                        </div>
                        <!-- //유효성 검사 문구 -->
                        
                        <!-- 유효성 검사 통과 문구 -->
                        <div class="pass-group hide">
                            <i class="fa-solid fa-check pass"></i>
                            <p class="pass">사용 가능한 비밀번호입니다.</p>
                        </div>
                        <!-- //유효성 검사 통과 문구 -->
                    </div>
                    <div class="item-wrapper">
                        <!-- 입력란 -->
                        <label for="chk-pw" class="label-txt">비밀번호 확인</label>
                        <input type="password" name="chk-pw" id="chk-pw" class="input-box input-txt" placeholder="비밀번호를 한 번 더 입력하세요" />
                        <!-- //입력란 -->

                        <!-- 유효성 검사 문구 -->
                        <div class="chk-group chk-pw-guide hide">
                            <i class="fa-solid fa-xmark xmark"></i>
                            <span class="check">확인을 위해 위에서 입력한 비밀번호를 다시 입력하세요.</span>
                        </div>
                        <!-- //유효성 검사 문구 -->

                        <!-- 유효성 검사 통과 문구 -->
                        <div class="pass-group hide">
                            <i class="fa-solid fa-check pass"></i>
                            <p class="pass">비밀번호가 일치합니다.</p>
                        </div>
                        <!-- //유효성 검사 통과 문구 -->
                    </div>
                    <input type="submit" id="reset-pw-btn" class="btn square-btn login-btn reset-btn" value="재설정하기" />
                </form>
            </div>
        </section>
    </main>
    <!-- //메인 -->
</body>