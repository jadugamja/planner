<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>

<%
    // 세션 값 불러오기
    String uid = session.getAttribute("uid") != null ? (String)session.getAttribute("uid") : "";
    int isAdmin = session.getAttribute("isAdmin") != null && session.getAttribute("isAdmin") instanceof Integer ? (int)session.getAttribute("isAdmin") : 0;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/common.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/main.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/dialog.css">
    <script src="/planner/resources/js/plan/checkDelete.js"></script>
    <script>
        if(<%= uid.length() %> == 0) 
            window.location.href = "/planner/index.jsp";
    </script>
</head>
<body>
    <main class="modal success-window">
        <div class="modal-box modal-color">
            <div class="modal-content">
                <div class="result-wrapper">
                    <span class="result-txt">삭제하시겠습니까?</span>
                </div>
                <div class="btn-wrapper">
                    <button class="d-btn ok-btn">확인</button>
                    <button class="d-btn cancel-btn">취소</button>
                </div>
            </div>
        </div>
    </main>
</body>