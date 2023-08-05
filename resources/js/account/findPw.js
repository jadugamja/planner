window.addEventListener("load", function(){

    // 홈 버튼 클릭 이벤트
    const homeBtn = document.querySelector('.logo');
    homeBtn.onclick = function() {
        location.href = "../../index.jsp";
    }

    // 로그인 페이지로 돌아가기 클릭 이벤트
    const backBtn = document.querySelector('.go-to-login');
    backBtn.onclick = function() {
        location.href = "../../index.jsp";
    }

    // 회원가입 버튼 클릭 이벤트
    const joinBtn = document.querySelector('.go-join-btn');
    joinBtn.onclick = function() {
        location.href = "../../views/join/join.jsp";
    }

    // 페이지 로드 시 아이디 입력란 선택
    const uid = document.querySelector("#uid");
    uid.focus();

    /* 
    * 아이디 입력란 선택 해제 이벤트
    */
    uid.addEventListener("change", function(e){
        var t = e.target
        var lastElem = t.parentNode.lastElementChild;

        if(checkValidation(t)) {    // 유효성 검사 통과
            if(lastElem.nodeName === "P") {
                lastElem.remove()
                t.classList.remove("warning-box")
            }
        } else {                    // 유효성 검사 실패
            if(lastElem.nodeName !== 'P')
                t.after(warningStrId)
            t.classList.add("warning-box")
        }
    });

    /* 
     * 비밀번호 찾기 버튼 클릭 이벤트
     */
    const findPwBtn = document.querySelector('#find-pw-btn');
    const form = document.querySelector('form');
    findPwBtn.addEventListener("click", function (e) {
        e.preventDefault();

        var isValid = true;

        if (!checkValidation(uid)) {
            isValid = false;

            // 유효성 검사를 받지 않은 경우
            if(!uid.classList.contains("warning-box")) {
                // 입력란 테두리 빨간색 처리
                uid.classList.add("warning-box");

                uid.parentNode.appendChild(warningStrId);
            }

            uid.focus();
        }

        if (isValid)
            openResultDialog();
        
    });

    // 유효성 검사
    function checkValidation(t) {
        var str = t.value;
        
        if(t.name == "uid") {                   // 아이디
            if(!str.trim())
                warningStrId.innerText = "아이디를 입력하세요."
            else if(!checkEmail(str))
                warningStrId.innerText = "유효한 이메일 주소가 아닙니다."
            else if(str.length > 50)
                warningStrId.innerText = "최대 길이를 초과했습니다."
            else
                return true;
        }

        return false;
    }

    // 이메일 형식 체크
    function checkEmail(str) {                                                 
        const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

        return reg_email.test(str);
    }
    
    // 결과 대화 상자 열기
    function openResultDialog() {
        var idVal = uid.value;
        
        var popWidth = 530;
        var popHeight = 220;

        // // 팝업창 가운데 정렬
        var popupX = (window.screen.width / 2) - (popWidth / 2);
        var popupY = (window.screen.height / 2) - (popHeight / 2);

        // 새 창 열기
        var url = "/planner/views/account/findPwResult.jsp";
        var name = "_blank"
        var option = "width=" + popWidth + ","
                    + "height=" + popHeight + ","
                    + "left=" + popupX + ","
                    + "top=" + popupY + ","
        ;

        var fakeModal = document.createElement("div")
        fakeModal.classList.add("modal")
        document.body.appendChild(fakeModal);

        window.open(url + "?uid=" + idVal, name, option, true);

    }

});