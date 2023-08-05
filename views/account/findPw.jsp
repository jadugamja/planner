<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/common.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/main.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/dialog.css">
    <script src="/planner/resources/js/account/findPw.js"></script>
</head>
<body>
    <!-- 헤더 -->
    <header>
        <div class="logo">
            <img src="../../resources/img/logo_with_text.png" />
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
                <h1 class="title">비밀번호 찾기</h1>
                <form>
                    <div class="item-wrapper">
                        <label for="uid" class="label-txt">아이디(이메일)</label>
                        <input type="email" name="uid" id="uid" class="input-box input-txt" placeholder="email@example.com"/>
                    </div>
                    <div class="etc-area">
                        <div class="etc-txt blue-txt go-to-login">
                            <i class="fa-solid fa-angle-left i-left"></i>
                            <span class="go-to-login-txt">로그인 페이지로 돌아가기</span>
                        </div>
                    </div>
                    <input type="submit" id="find-pw-btn" class="btn square-btn login-btn" value="비밀번호 찾기" />
                </form>
            </div>
        </section>
    </main>
    <!-- //메인 -->
</body>