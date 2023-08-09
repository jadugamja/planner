window.onload = function() {
    
    const warningStrId = document.createElement("p");
    const warningStrPw = document.createElement("p");
    warningStrId.setAttribute("class", "warning");
    warningStrPw.setAttribute("class", "warning");
    
    /* 
    * 홈 버튼 클릭 이벤트
    */
    const homeBtn = document.querySelector('.logo');
    homeBtn.onclick = function(e) {
        e.preventDefault();

        location.href = "index.jsp";
    }

    /* 
    * 회원가입 버튼 클릭 이벤트
    */
    const joinBtn = document.querySelector('.go-join-btn');
    joinBtn.onclick = function(e) {
        e.preventDefault();

        location.href = "views/join/join.jsp";
    }

    // ★ 페이지 로드 시 ★ 아이디 입력란 선택
    const uid = document.querySelector('#uid');
    const pw = document.querySelector('#pw');
    // uid.value = document.querySelector("#sessionId").value != "" ? document.querySelector("#sessionId").value : "";
    // pw.value = document.querySelector("#sessionPw").value != "" ? document.querySelector("#sessionPw").value : "";
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
    * 비밀번호 입력란 선택 해제 이벤트
    */
    pw.addEventListener("blur", function(e){
        var t = e.target
        var lastElem = t.parentNode.lastElementChild;

        if(checkValidation(t)) {    // 유효성 검사 통과
            if(lastElem.nodeName === "P") {
                lastElem.remove()
                t.classList.remove("warning-box")
            }
        } else {                    // 유효성 검사 실패
            if(lastElem.nodeName !== 'P')
                t.after(warningStrPw)
            t.classList.add("warning-box")
        }
    });

    /* 
     * 로그인 버튼 클릭 이벤트
     */
    const loginBtn = document.querySelector('#login-btn');
    const form = document.querySelector('form');
    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const inputFields = [uid, pw];
        var isValid = true;

        for (const inputField of inputFields) {
            if (!checkValidation(inputField)) {
                isValid = false;
    
                // 유효성 검사를 받지 않은 경우
                if(!inputField.classList.contains("warning-box")) {
                    
                    // 입력란 테두리 빨간색 처리
                    inputField.classList.add("warning-box");

                    if(inputField.id == "uid") {            // 아이디
                        inputField.parentNode.appendChild(warningStrId);
                    } else if(inputField.id == "pw") {      // 비밀번호
                        inputField.parentNode.appendChild(warningStrPw);
                    }
                }
                inputField.focus();
                break;
            }
        }

        if (isValid) {
            form.action = "/planner/action/selectMember.jsp";
            form.method = "POST";
            form.submit();
        }
        
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
        } else if(t.name == "pw") {            // 비밀번호
            if(!str.trim())
                warningStrPw.innerText = "비밀번호를 입력하세요."
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

}