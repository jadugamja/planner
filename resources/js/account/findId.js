window.addEventListener("load", function(){

    // 유효성 검사 문구
    const warningStrName = document.createElement("p");
    const warningStrTel = document.createElement("p");

    warningStrName.setAttribute("class", "warning");
    warningStrTel.setAttribute("class", "warning");

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

    // 페이지 로드 시 이름 입력란 선택
    const uname = document.querySelector('#uname');
    uname.focus();

    /* 
     * 이름 입력란 선택 해제 이벤트
     */
    uname.addEventListener("change", function(e){
        var t = e.target
        var lastElem = t.parentNode.lastElementChild;

        if(checkValidation(t)) {    // 유효성 검사 통과
            if(t.parentElement.getElementsByClassName("warning").length == 1) {
                lastElem.remove()
                t.classList.remove("warning-box")
            }
        } else {                    // 유효성 검사 실패
            if(lastElem.nodeName !== 'P') {
                t.parentNode.appendChild(warningStrName)
            }
            t.classList.add("warning-box")
        }
    });

    /* 
     * 휴대 전화 입력란 선택 해제 이벤트
     */
    const tel = document.querySelector("#tel");
    tel.addEventListener("change", function(e){

        if(!e.target.value.trim()) {
            e.target.classList.add("warning-box")
            warningStrTel.innerText = "휴대폰 번호를 입력하세요."
            if(e.target.parentElement.getElementsByClassName(warningStrTel).length == 0)
                e.target.parentElement.appendChild(warningStrTel)
        }

    });

    /* 
     * 휴대 전화 번호 입력란 입력 이벤트
     */
    tel.addEventListener("input", function(e){

        var t = e.target;
        const num = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
        const firstPart = num.slice(0, 3);
        const secondPart = num.slice(3, 7);
        const thirdPart = num.slice(7, 11);
        
        let formattedNumber = "";
        
        if (firstPart)
            formattedNumber += firstPart;

        if (secondPart) 
            formattedNumber += "-" + secondPart;
    
        if (thirdPart) 
            formattedNumber += "-" + thirdPart;
        
        e.target.value = formattedNumber;

        if(num.length == 11 || num.length == 12) {
            warningStrTel.innerText = "";
            t.classList.remove("warning-box");
        } else {
            t.classList.add("warning-box");
    
            if(num.length == 0)
                warningStrTel.innerText = "휴대폰 번호를 입력하세요.";
            else
                warningStrTel.innerText = "유효한 번호가 아닙니다.";
    
            if(t.parentElement.getElementsByClassName(warningStrTel).length == 0)
                t.parentElement.appendChild(warningStrTel);
        }
        
    });
    
    /* 
     * 아이디 찾기 버튼 클릭 이벤트
     */
    const findIdBtn = document.querySelector('#find-id-btn');
    const form = document.querySelector('form');
    findIdBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const inputFields = [uname, tel];
        var isValid = true;

        for (const inputField of inputFields) {
            
            if (!checkValidation(inputField)) {
                isValid = false;
    
                // 유효성 검사를 받지 않은 경우
                if(!inputField.classList.contains("warning-box")) {
                    
                    // 입력란 테두리 빨간색 처리
                    inputField.classList.add("warning-box");

                    if(inputField.id == "uname") {          // 이름
                        inputField.parentNode.appendChild(warningStrName);
                    } else if(inputField.id == "tel") {     // 휴대 전화
                        inputField.parentElement.appendChild(warningStrTel);
                    }
                }

                inputField.focus();
                break;
            }
        }

        if (isValid)
            openResultDialog();
        
    });

    // 유효성 검사
    function checkValidation(t) {

        var str = t.value;

        if(t.name == "uname") {           // 이름
            if(!str.trim()) {
                warningStrName.innerText = "이름을 입력하세요."
            } else if(!checkName(str)) {
                warningStrName.innerText = "유효한 이름이 아닙니다."
            } else {
                return true;
            }
        } else if(t.name == "tel") {            // 휴대 전화
            if(!str.trim()) {
                warningStrTel.innerText = "휴대폰 번호를 입력하세요."
            } else if(str.length < 11) {
                warningStrTel.innerText = "유효한 번호가 아닙니다."
            } else {
                return true;
            }
        }

        return false;
    }

    // 이름 체크
    function checkName(str) {                                                 
        const reg_name = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]{3,15}$/;

        return reg_name.test(str);
    }

    // 결과 대화 상자 열기
    function openResultDialog() {
        var nameVal = uname.value;
        var telVal = tel.value;
        
        // 대화 상자 크기 설정
        var popWidth = 530;
        var popHeight = 220;

        // 대화 상자 가운데 정렬
        var popupX = (window.screen.width / 2) - (popWidth / 2);
        var popupY = (window.screen.height / 2) - (popHeight / 2);

        // 새 창 열기
        var url = "/planner/views/account/findIdResult.jsp";
        var name = "_blank"
        var option = "width=" + popWidth + ","
                    + "height=" + popHeight + ","
                    + "left=" + popupX + ","
                    + "top=" + popupY + ","
        ;

        var fakeModal = document.createElement("div")
        fakeModal.classList.add("modal")
        document.body.appendChild(fakeModal);

        window.open(url + "?uname=" + nameVal + "&tel=" + telVal, name, option, true);

    }
    
});