<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<%
    String uid = session.getAttribute("uid") != null ? (String)session.getAttribute("uid") : "";
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="resources/css/comm/common.css">
    <link rel="stylesheet" type="text/css" href="resources/css/comm/main.css">
    <link rel="stylesheet" type="text/css" href="resources/css/account/login.css">
    <script>
        if(<%= uid.length() %> != 0)
            window.location.href = "/planner/views/plan/list.jsp";
        
    </script>
    <script src="resources/js/comm/dialog.js"></script>
    <script src="resources/js/account/login.js"></script>
</head>
<body>
    <!-- 헤더 -->
    <header>
        <div class="logo">
            <img src="resources/img/logo_with_text.png" />
        </div>
        <div class="try-join">
            <p class="h-txt">아직 계정이 없으신가요?</p>
            <input type="button" value="회원가입" class="btn square-btn go-join-btn" />
        </div>
    </header>
    <!-- //헤더 -->

    <!-- 메인 -->
    <main class="divided">
        <section class="banner"></section>
        <section class="content">
            <div class="content-wrapper">
                <h1 class="title">로그인</h1>
                <form>
                    <div class="item-wrapper">
                        <label for="uid" class="label-txt">아이디</label>
                        <input type="email" name="uid" id="uid" class="input-box input-txt" placeholder="email@example.com"/>
                    </div>
                    <div class="item-wrapper">
                        <label for="pw" class="label-txt">비밀번호</label>
                        <input type="password" name="pw" id="pw" class="input-box input-txt" placeholder="비밀번호를 입력하세요" />
                    </div>
                    <div class="etc-area">
                        <div id="remember-me">
                            <input type="checkbox" id="stay-logged-in" class="checkbox" checked/>
                            <label for="stay-logged-in"></label>
                            <span class="after-checkbox-txt">내 정보 기억하기</span>
                        </div>
                        <div class="etc-txt blue-txt find-user-info">
                            <a href="views/account/findId.jsp">아이디 찾기</a>
                            <span>|</span>
                            <a href="views/account/findPw.jsp">비밀번호 찾기</a>
                        </div>
                    </div>
                    <input type="submit" id="login-btn" class="btn square-btn login-btn" value="로그인" />
                </form>
            </div>
        </section>
    </main>
    <!-- //메인 -->
</body>