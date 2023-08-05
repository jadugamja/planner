<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<head>
</head>
<body>
    <!-- 사이드바 -->
    <aside id="my-info" class="side-bar hide">
        <div class="info-box">
            <div class="info-main-box">
                <!-- 회원 유형 -->
                <div class="center-aligned rounded">
                    <span id="my-type"></span>
                </div>
                <!-- // 회원 유형 -->
                <ul class="info-main-txt">
                    <li id="my-name" class="bold-txt">
                        <!-- 회원 이름: 성 -->
                        <span id="my-sur-name"></span>
                        <!-- //회원 이름: 성 -->
                        
                        <!-- 회원 이름: 이름 -->
                        <span id="my-real-name"></span>
                        <!-- //회원 이름: 이름 -->
                    </li>
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
        <div class="info-box">
            <h2 class="list-title-wrapper">
                <span>
                    <i class="fa-regular fa-rectangle-list fontsize-22"></i>
                </span>
                <span class="list-title"></span>
            </h2>
            <div>
                <ul>
                    <li class="list-wrapper">
                        <!-- 회원 유형 -->
                        <div class="center-aligned rounded small-rounded">
                            <span id="my-type"></span>
                        </div>
                        <div class="info-main-txt">
                            <div id="my-name" class="bold-txt fontsize-19">
                                <!-- 성 -->
                                <span id="my-sur-name" class=""></span>
                                <!-- 이름 -->
                                <span id="my-real-name" class=""></span>
                            </div>
                            <!-- 아이디(이메일) -->
                            <span id="my-email" class="gray-txt fontsize-15"></span>
                        </div>
                    </li>
                    <li class="list-wrapper">
                        <div class="center-aligned rounded small-rounded">
                            <span id="my-type"></span>
                        </div>
                        <div class="info-main-txt">
                            <div id="my-name" class="bold-txt fontsize-19">
                                <span id="my-sur-name" class=""></span>
                                <span id="my-real-name" class=""></span>
                            </div>
                            <span id="my-email" class="gray-txt fontsize-15"></span>
                        </div>
                    </li>
                    <li class="list-wrapper">
                        <div class="center-aligned rounded small-rounded">
                            <span id="my-type"></span>
                        </div>
                        <div class="info-main-txt">
                            <div id="my-name" class="bold-txt fontsize-19">
                                <span id="my-sur-name" class=""></span>
                                <span id="my-real-name" class=""></span>
                            </div>
                            <span id="my-email" class="gray-txt fontsize-15"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div id="logout" class="logout">
            <span class="fontsize-22">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
            <span>로그아웃</span>
        </div>
    </aside>
    <!-- //사이드바 -->
</body>