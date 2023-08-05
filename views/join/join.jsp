<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/common.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/main.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/dialog.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/join/join.css">
    <script src="/planner/resources/js/join/join.js"></script>
</head>
<body>
    <!-- 헤더 -->
    <header>
        <div class="logo">
            <img src="../../resources/img/logo_with_text.png" />
        </div>
        <div class="try-login">
            <p class="h-txt">이미 회원이신가요?</p>
            <input type="button" value="로그인" class="btn square-btn go-login-btn" />
        </div>
    </header>
    <!-- //헤더 -->

    <!-- 메인 -->
    <main>
        <div class="content-wrapper">
            <h1 class="title">회원가입</h1>
            <form>
                <div class="item-wrapper row-direction">
                    <label for="type" class="label-txt">회원 유형</label>
                    <!-- 커스텀 콤보 박스 -->
                    <div class="select utype" id="type">
                        <div class="selected between-justified box-padding">
                            <span class="selected-value">직원</span>
                        </div>
                        <ul class="option-wrapper type-list hide">
                            <li class="option box-padding" value="">직원</li>
                            <li class="option box-padding">팀장</li>
                        </ul>
                    </div>
                </div>
                <div class="item-wrapper">
                    <label for="uid" class="label-txt">아이디(이메일)</label>
                    <div class="chk-area">
                        <input type="email" name="uid" id="uid" class="input-box input-txt small-width" placeholder="email@example.com"/>
                        <input type="button" class="double-chk-btn" disabled value="중복 확인" />
                    </div>
                </div>
                <div class="item-wrapper">
                    <label for="pw" class="label-txt">비밀번호</label>
                    <input type="password" name="pw" id="pw" class="input-box input-txt" placeholder="비밀번호를 입력하세요" />
                </div>
                <div class="item-wrapper">
                    <label for="chk-pw" class="label-txt">비밀번호 확인</label>
                    <input type="password" name="chk-pw" id="chk-pw" class="input-box input-txt" placeholder="비밀번호를 한 번 더 입력하세요" />
                </div>
                <div class="item-wrapper">
                    <label for="uname" class="label-txt">이름</label>
                    <input type="text" name="uname" id="uname" class="input-box input-txt" placeholder="이름을 입력하세요" />
                </div>
                <div class="item-wrapper">
                    <label for="tel" class="label-txt">휴대 전화</label>
                    <div class="chk-area">
                        <input type="text" name="tel" id="tel" class="input-box input-txt small-width" placeholder="(-제외) 전화번호를 입력하세요" />
                        <input type="button" class="double-chk-btn" disabled value="중복 확인" />
                    </div>
                </div>
                <div class="item-wrapper">
                    <label for="birth" class="label-txt">생년월일</label>
                    <div id="birth" class="birth">
                        <!-- 연도 -->
                        <input type="text" name="birth" id="b-year" class="input-box input-txt birth-box" placeholder="년" />
                        <!-- 월 -->
                        <input type="text" name="birth" id="b-month" class="input-box input-txt birth-box" placeholder="월" />
                        <!-- 일 -->
                        <input type="text" name="birth" id="b-day" class="input-box input-txt birth-box" placeholder="일" />
                    </div>
                </div>
                <input type="submit" id="join-btn" class="btn square-btn login-btn" value="가입하기" />
            </form>
        </div>
        <!-- </section> -->
    </main>
    <!-- //메인 -->
</body>