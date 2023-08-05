<%@ page language="java" contentType="text/html" pageEncoding="utf-8" %>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/common.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/main.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/join/join.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/plan/list.css">
    <link rel="stylesheet" type="text/css" href="/planner/resources/css/comm/dialog.css">
    <script src="/planner/resources/js/comm/dialog.js"></script>
    <script src="/planner/resources/js/plan/insert.js"></script>
</head>
<body>
    <!-- 일정 추가 창 -->
    <div class="modal no-dim">
        <div class="modal-box no-dim-box no-dim-color">
            <form class="modal-content no-dim-content">
                <h2>일정 추가</h2>
                <div class="table-aligned">
                    <label for="category" class="font-medium ratio-20">카테고리</label>
                    <div class="select input-box ratio-80 input-txt" id="category">
                        <input type="hidden" name="categories" class="category-value" value="0"/> 
                        <div class="selected between-justified">
                            <span class="selected-value">이벤트</span>
                        </div>
                        <ul class="option-wrapper hide">
                            <li class="option box-padding" value="0">이벤트</li>
                            <li class="option box-padding" value="1">할 일</li>
                        </ul>
                    </div>
                </div>
                <div class="table-aligned">
                    <label for="title" class="font-medium ratio-20">제목</label>
                    <input type="text" id="title" name="title" class="input-box ratio-80 input-txt" />
                    <div class="right limited-text-length">
                        <span id="text-length"></span>
                        <span>/140</span>
                    </div>
                </div>
                <div class="table-aligned">
                    <label for="date" class="font-medium ratio-20">날짜</label>
                    <input type="date" id="date" name="date" class="input-box ratio-80 input-txt" />
                </div>
                <div class="table-aligned">
                    <label for="time" class="font-medium ratio-20">시작 시간</label>
                    <input type="time" id="time" name="time" class="input-box ratio-80 input-txt" />
                </div>
                <div class="right btn-group">
                    <input type="submit" class="plan-btn plan-save-btn" value="저장"/>
                    <input type="button" class="plan-btn plan-cancel-btn" value="취소" />
                </div>
            </form>
        </div>
    </div>
    <!-- //일정 추가 창 -->
</body>