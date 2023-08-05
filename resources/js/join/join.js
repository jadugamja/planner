window.addEventListener("load", function(){

    const selectBox = document.querySelector("#type");
    const optList = document.querySelector('.type-list');

    const form = document.querySelector("form");

    const uname = document.querySelector("#uname");
    const tel = document.querySelector("#tel");

    const doubleBtn = document.querySelectorAll(".double-chk-btn");

    // 유효성 검사 결과 실패 문구
    const warningStrId = document.createElement("p");
    const warningStrName = document.createElement("p");
    const warningStrTel = document.createElement("p");
    const warningStrBirth = document.createElement("p");
    
    warningStrId.setAttribute("class", "warning");
    warningStrName.setAttribute("class", "warning");
    warningStrTel.setAttribute("class", "warning");
    warningStrBirth.setAttribute("class", "warning");

    var chkGroup;
    var chkIconArr = [];
    var chkStrArr = [];
    var chkIcon = null;
    var chkStr = null;
    const chkWrapper = document.createElement("div");
    chkWrapper.setAttribute("class", "chk-wrapper");

    // uid.focus();

    // 홈 버튼 클릭 이벤트
    const homeBtn = document.querySelector('.logo');
    homeBtn.onclick = function() {
        location.href = "../../index.jsp";
    }

    // 로그인 버튼 클릭 이벤트
    const loginBtn = document.querySelector(".go-login-btn");
    loginBtn.onclick = function(e) {
        e.preventDefault();
        location.href = "../../index.jsp";
    }

    // 셀렉트 박스 클릭 이벤트    
    selectBox.addEventListener("click", function(e){
        var t = e.target;
        var isOption = t.classList.contains("option");

        // 옵션 선택한 경우
        if(isOption)
            selectOption(t)

        // 옵션 리스트 보이기/숨기기
        optList.classList.toggle("hide")
        selectBox.classList.toggle("active")
    });

    function selectOption(t) {

        var selected;
        
        if(t.closest(".utype") != null)           // 회원 유형 콤보 박스
            selected = selectBox.querySelector(".selected-value")
        else if(t.closest("#b-month") != null)       // 회원 생일 월 콤보 박스
            selected = monthBox.querySelector(".selected-value")

        selected.textContent = t.textContent;
    }

    // 셀렉트 박스 바깥 영역 클릭 이벤트
    document.addEventListener("click", function(e){
        var t = e.target
        var isSelect = t.classList.contains("select") || t.closest(".select")

        if(isSelect)
            return;
        
        // 회원 유형
        optList.classList.add("hide");
        selectBox.classList.remove("active");
        // 회원 생일 월
        // monList.classList.add("hide");
        // monthBox.classList.remove("active");

    });


    /*******************************************************************************/
    /* 아이디                                                                      */
    /******************************************************************************/
    /* 
     * 아이디 입력란 
     */
    const uid = document.querySelector("#uid");
    uid.addEventListener("change", function(e){
        var t = e.target
        var lastElem = t.parentNode.parentNode.lastElementChild;

        if(checkValidation(t)) {    // 유효성 검사 통과
            if(lastElem.nodeName === "P") {
                lastElem.remove();
                t.classList.remove("warning-box");
            }
            activateButton(t);
        } else {                    // 유효성 검사 실패
            if(lastElem.nodeName !== 'P')
                t.parentNode.parentNode.appendChild(warningStrId);
            t.classList.add("warning-box");
            disabledButton(t);
        }
    });

    /* 
     * 아이디 중복 확인 클릭 이벤트
     */
    doubleBtn[0].addEventListener("click", function(e){

        var idVal = uid.value
        
        var popWidth = 530;
        var popHeight = 220;

        // // 팝업창 가운데 정렬
        var popupX = (window.screen.width / 2) - (popWidth / 2);
        var popupY = (window.screen.height / 2) - (popHeight / 2);

        // 새 창 열기
        var url = "/planner/views/join/checkDuplicateId.jsp";
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

    });


    /*******************************************************************************/
    /* 비밀번호                                                                    */
    /******************************************************************************/
    /* 
     * 비밀번호 입력란 선택 이벤트
     */
    const pw = document.querySelector("#pw");
    pw.addEventListener("focus", function(e){

        var t = e.target

        // 비밀번호 입력란 첫 선택 시 문구 출력
        if(!t.parentNode.lastElementChild.classList.contains("chk-wrapper") && !t.parentNode.lastElementChild.classList.contains("pass-group")) {
            printCheckConditions(t)
            t.parentNode.appendChild(chkWrapper)
        }

    });

    /* 
     * 비밀번호 입력란 선택 해제 이벤트
     */
    pw.addEventListener("change", function(e){

        var t = e.target

        // 공백 문자 체크
        if(!t.value.trim()) {
            if(!checkValidation(t)) 
                t.classList.add("warning-box")
        }
    });

    /* 
     * 비밀번호 입력란 입력 중 이벤트
     */
    pw.addEventListener("input", function(e){

        var t = e.target

        if(checkValidation(t)) {
            
            t.classList.remove("warning-box")
            // 검사 조건 숨기기
            t.nextElementSibling.classList.add("hide")
            
            // 통과 문구 출력
            if(!t.parentNode.lastElementChild.classList.contains("pass-group")) {
                // t.previousElementSibling.classList.add("valid")
                t.before(createValidIcon())
                
                const passGroup = document.createElement("div");
                const passIcon = document.createElement("i");
                const passStr = document.createElement("p");
                passGroup.setAttribute("class", "pass-group")
                passIcon.setAttribute("class", "fa-solid fa-check pass")
                passStr.setAttribute("class", "pass")
                passStr.innerText = "사용 가능한 비밀번호입니다."
                
                passGroup.appendChild(passIcon)
                passGroup.appendChild(passStr)

                // t.appendChild(passIcon)
                t.parentNode.appendChild(passGroup)
            } else {
                t.previousElementSibling.classList.remove("hide")
                t.parentNode.lastElementChild.classList.remove("hide")
            }

        } else {
            t.classList.add("warning-box")
            
            if(t.parentNode.lastElementChild.classList.contains("pass-group")) {
                t.previousElementSibling.classList.add("hide")
                t.parentNode.lastElementChild.classList.add("hide")
                t.nextElementSibling.classList.remove("hide")
            }
        }

    });


    /*******************************************************************************/
    /* 비밀번호 확인                                                                */
    /******************************************************************************/

    /* 
     * 비밀번호 확인 입력란 선택 이벤트
     */
    const chkPw = document.querySelector("#chk-pw");
    chkPw.addEventListener("focus", function(e){

        var t = e.target

        // 비밀번호 입력란 첫 선택 시 문구 출력
        if(!t.parentNode.lastElementChild.classList.contains("chk-group") && !t.parentNode.lastElementChild.classList.contains("pass-group")) {
            printCheckConditions(t)
            t.parentNode.appendChild(chkGroup)
        }
    });

    /* 
     * 비밀번호 확인 입력란 선택 해제 이벤트
     */
    chkPw.addEventListener("change", function(e){

        var t = e.target

        // 공백 문자 체크
        if(!t.value.trim()) {
            if(!checkValidation(t)) 
                t.classList.add("warning-box")
        }
    });

    /* 
     * 비밀번호 확인 입력란 입력 이벤트
     */
    chkPw.addEventListener("input", function(e){
        var t = e.target

        if(checkValidation(t)) {
            

            t.classList.remove("warning-box")
            // 검사 조건 숨기기
            t.nextElementSibling.classList.add("hide")

            // 통과 문구 출력
            if(!t.parentNode.lastElementChild.classList.contains("pass-group")) {
                t.before(createValidIcon())

                const passGroup = document.createElement("div");
                const passIcon = document.createElement("i");
                const passStr = document.createElement("p");
                passGroup.setAttribute("class", "pass-group")
                passIcon.setAttribute("class", "fa-solid fa-check pass")
                passStr.setAttribute("class", "pass")
                passStr.innerText = "비밀번호가 일치합니다."
                
                passGroup.appendChild(passIcon)
                passGroup.appendChild(passStr)

                // t.appendChild(passIcon)
                t.parentNode.appendChild(passGroup)
            } else {
                t.previousElementSibling.classList.remove("hide")
                t.parentNode.lastElementChild.classList.remove("hide")
            }

        } else {

            t.classList.add("warning-box")

            if(t.parentNode.lastElementChild.classList.contains("pass-group")) {
                 t.previousElementSibling.classList.add("hide")
                t.parentNode.lastElementChild.classList.add("hide")
                t.nextElementSibling.classList.remove("hide")
            } 
        }
    });

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

            if(t.parentElement.getElementsByClassName("valid").length == 0)
                t.before(createValidIcon())
            else
                t.previousElementSibling.classList.remove("hide")
        } else {                    // 유효성 검사 실패
            if(lastElem.nodeName !== 'P') {
                if(t.previousElementSibling.classList.contains("valid-span"))
                    t.previousElementSibling.classList.add("hide")
    
                t.parentNode.appendChild(warningStrName)
            }
            // if(t.previousElementSibling.classList.contains("valid-span"))
            //     t.previousElementSibling.classList.add("hide")
            t.classList.add("warning-box")
        }
    });

    /* 
     * 휴대 전화 입력란 선택 해제 이벤트
     */
    tel.addEventListener("change", function(e){
        if(!e.target.value.trim()) {
            e.target.classList.add("warning-box")
            warningStrTel.innerText = "휴대폰 번호를 입력하세요."
            if(e.target.parentElement.parentElement.getElementsByClassName(warningStrTel).length == 0)
                e.target.parentElement.parentElement.appendChild(warningStrTel)
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
            warningStrTel.innerText = ""
            t.classList.remove("warning-box")
            activateButton(t)
        } else {
            disabledButton(t)
            t.classList.add("warning-box")
    
            if(num.length == 0)
                warningStrTel.innerText = "휴대폰 번호를 입력하세요."
            else
                warningStrTel.innerText = "유효한 번호가 아닙니다."
    
            if(t.parentElement.parentElement.getElementsByClassName(warningStrTel).length == 0)
                t.parentElement.parentElement.appendChild(warningStrTel)
        }
        
    });

    /* 
     * 휴대폰 번호 중복 확인 클릭 이벤트
     */
    doubleBtn[1].addEventListener("click", function(e){

        var telVal = tel.value
        
        var popWidth = 530;
        var popHeight = 220;

        // // 팝업창 가운데 정렬
        var popupX = (window.screen.width / 2) - (popWidth / 2);
        var popupY = (window.screen.height / 2) - (popHeight / 2);

        // 새 창 열기
        var url = "/planner/views/join/checkDuplicateTel.jsp";
        var name = "_blank"
        var option = "width=" + popWidth + ","
                    + "height=" + popHeight + ","
                    + "left=" + popupX + ","
                    + "top=" + popupY + ","
        ;

        var fakeModal = document.createElement("div")
        fakeModal.classList.add("modal")
        document.body.appendChild(fakeModal);

        window.open(url + "?tel=" + telVal, name, option, true);

    });
    
    
    /* 
     * 생년월일 연도 입력란 선택 해제 이벤트
     */
    const byear = document.querySelector("#b-year");
    byear.addEventListener("blur", function(e){
        var t = e.target;
        const num = e.target.value.replace(/\D/g, "");
        var year = num.slice(0, 4);
       
        t.value = year;
       
        if(year.length == 4) {
            if(t.classList.contains("warning-box"))
                t.classList.remove("warning-box")

            bmon.focus();
        } else {
            t.classList.add("warning-box")
        }
        
    });
    
    /* 
     * 생년월일 월 입력란 선택 해제 이벤트
     */
    const bmon = document.querySelector("#b-month");
    bmon.addEventListener("blur", function(e){
        var t = e.target;
        const num = e.target.value.replace(/\D/g, "");
        var month = num.slice(0, 2);
       
        t.value = month;
       
        if(month.length == 2) {
            if(t.classList.contains("warning-box"))
                t.classList.remove("warning-box")

            bday.focus();
        } else {
            t.classList.add("warning-box")
        }
    });
    
    /* 
     * 생년월일 일 입력란 선택 해제 이벤트
     */
    const bday = document.querySelector("#b-day");
    bday.addEventListener("blur", function(e){
        var t = e.target;
        const num = e.target.value.replace(/\D/g, "");
        var day = num.slice(0, 2);

        t.value = day;

        if(day.length != 2)
            t.classList.add("warning-box")
    
        if(byear.classList.contains("warning-box") 
            || bmon.classList.contains("warning-box") 
            || bday.classList.contains("warning-box")) {
            
            // 체크(✓) 아이콘 있으면 숨기기
            if(t.parentElement.firstElementChild.nodeName == "SPAN")
                t.parentElement.firstElementChild.classList.add("hide")

            // 유효성 검사
            if(!checkValidation(t)) {

                // 문구 없으면 생성
                if(t.parentElement.parentElement.lastElementChild.nodeName != "P")
                    t.parentElement.parentElement.appendChild(warningStrBirth)
            }

        } else {

            // 체크(✓) 아이콘 없으면 만들기
            if(t.parentElement.firstElementChild.nodeName != "SPAN")
                t.parentElement.prepend(createValidIcon());
            // 있으면 숨기기 해제하기
            else
                t.parentElement.firstElementChild.classList.remove("hide");

            // 문구 있으면 숨기기
            if(t.parentElement.parentElement.lastElementChild.nodeName == "P")
                t.parentElement.parentElement.lastElementChild.classList.add("hide");
            
        }

    });

    /* 
     * 가입 버튼 클릭 이벤트
     */
    const joinBtn = document.querySelector("#join-btn");
    joinBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // 유효성 검사를 위한 입력란 배열
        const inputFields = [uid, pw, chkPw, uname, tel, byear, bmon, bday];

        // 유효성 검사 통과 여부
        let isValidationPassed = true;

        for(const inputField of inputFields) {

            
            // 비밀번호 -> 문구 출력부터 나와야 함
            if (!checkValidation(inputField)) {
                isValidationPassed = false;

                // 유효성 검사를 받지 않은 경우
                if(!inputField.classList.contains("warning-box")) {
                    
                    // 입력란 테두리 빨간색 처리
                    inputField.classList.add("warning-box");

                    if(inputField.id == "uid") {            // 아이디
                        inputField.parentNode.parentNode.appendChild(warningStrId);
                    } else if(inputField.id == "pw") {      // 비밀번호
                        inputField.parentNode.appendChild(chkWrapper);
                    } else if(inputField.id == "chk-pw") {  // 비밀번호 확인
                        inputField.parentNode.appendChild(chkGroup);
                    } else if(inputField.id == "uname") {   // 이름
                        inputField.parentNode.appendChild(warningStrName);
                    } else if(inputField.id == "tel") {     // 휴대 전화
                        inputField.parentElement.parentElement.appendChild(warningStrTel);
                    } else {                                // 생일
                        inputField.parentElement.parentElement.appendChild(warningStrBirth);
                        if(inputField.id == "b-year") {
                            // 월, 일에도 테두리 처리
                            inputField.nextElementSibling.classList.add("warning-box");
                            inputField.nextElementSibling.nextElementSibling.classList.add("warning-box");
                        } else if(inputField.id == "b-month") {
                            // 일에도 테두리 처리
                            inputField.nextElementSibling.classList.add("warning-box");
                        }
                    }
                }
                
                inputField.focus();
                break;

            } else if(!checkDouble(inputField)) {       // idk this is the right position
                isValidationPassed = false;

                if(inputField.id == "uid") {            // 아이디
                    inputField.parentNode.parentNode.appendChild(warningStrId);
                } else if(inputField.id == "tel") {     // 휴대 전화
                    inputField.parentElement.parentElement.appendChild(warningStrTel);
                }

                inputField.nextElementSibling.focus();
                break;
            }
        }
        if(isValidationPassed) {
            form.submit();
        }
    });


    // 유효성 검사 통과 아이콘 생성
    function createValidIcon(){
        const validSpan = document.createElement("span");
        const validIcon = document.createElement("i");

        validSpan.setAttribute("class", "valid-span")
        validIcon.setAttribute("class", "fa-solid fa-check valid")

        validSpan.appendChild(validIcon)
        return validSpan
    }

    // 검사 조건 문구 출력
    function printCheckConditions(t) {
        if(t.name == "pw") {
            for(var i = 0; i < 3; i++) {
                chkGroup = document.createElement("div");
                chkIconArr[i] = document.createElement("i");
                chkStrArr[i] = document.createElement("span");
                chkGroup.setAttribute("class", "chk-group")
                chkIconArr[i].setAttribute("class", "fa-solid fa-xmark xmark")
                chkStrArr[i].setAttribute("class", "check")
    
                if (i == 0)
                    chkStrArr[i].innerText = "영문/숫자/특수문자 중 2가지 조합 (8~20자)"
                else if (i == 1)
                    chkStrArr[i].innerText = "3개 이상 연속되거나 동일한 문자/숫자 조합"
                else if (i == 2)
                    chkStrArr[i].innerText = "아이디(이메일) 제외"
                
                chkGroup.appendChild(chkIconArr[i])
                chkGroup.appendChild(chkStrArr[i])
                chkWrapper.appendChild(chkGroup)
            }
    
            return chkWrapper;

        } else if (t.name == "chk-pw") {
            chkGroup = document.createElement("div");
            chkIcon = document.createElement("i");
            chkStr = document.createElement("span");
            chkGroup.setAttribute("class", "chk-group")
            chkIcon.setAttribute("class", "fa-solid fa-xmark xmark")
            chkStr.setAttribute("class", "check")
            chkStr.innerText = "확인을 위해 위에서 입력한 비밀번호를 다시 입력하세요."

            chkGroup.appendChild(chkIcon)
            chkGroup.appendChild(chkStr)

            return chkGroup;
        }
    
    }


    /*******************************************************************************/
    /* 유효성 검사                                                                 */
    /******************************************************************************/
    function checkValidation(t) {

        var str = t.value
        
        if(t.name == "uid") {                   // 아이디
            if(!str.trim()) {
                warningStrId.innerText = "아이디를 입력하세요.";
            } else if(!checkEmail(str)) {
                warningStrId.innerText = "유효한 이메일 주소가 아닙니다.";
            } else if(str.length > 50) {
                warningStrId.innerText = "최대 길이를 초과했습니다.";
            } else {
                return true;
            }
        } else if(t.name == "pw") {            // 비밀번호

            // 검사 문구가 없는 경우
            if(t.nextElementSibling == null) {
                printCheckConditions(t);
            }

            // 1번 조건
            if(!checkPasswordCombo(str) || !str.trim()) {

                if(chkIconArr[0].classList.contains("fa-check")) {
                    // 아이콘 교체: ✓ 빼고 x
                    chkIconArr[0].classList.remove("fa-check", "pass");
                    chkIconArr[0].classList.add("fa-xmark", "xmark");
                }

                // 문구 색상 변경: 초록에서 빨강으루
                chkIconArr[0].classList.add("warning");
                chkStrArr[0].classList.remove("pass");
                chkStrArr[0].classList.add("warning");

            } else {

                // 아이콘 교체: x 빼고 ✓
                chkIconArr[0].classList.remove("fa-xmark", "xmark", "warning");
                chkIconArr[0].classList.add("fa-check", "pass");

                // 문구 색상 변경: 빨강에서 초록으루
                chkStrArr[0].classList.remove("warning");
                chkStrArr[0].classList.add("pass");
            }

            // 2번 조건
            if(!checkRepeatChar(str)) {
                if(chkIconArr[1].classList.contains("fa-check")) {
                    // 아이콘 교체: ✓ 빼고 x
                    chkIconArr[1].classList.remove("fa-check", "pass");
                    chkIconArr[1].classList.add("fa-xmark", "xmark");
                }
                // 문구 색상 변경: 초록에서 빨강으루
                chkIconArr[1].classList.add("warning")
                chkStrArr[1].classList.remove("pass")
                chkStrArr[1].classList.add("warning")
            } else {
                // 아이콘 교체: x 빼고 ✓
                chkIconArr[1].classList.remove("fa-xmark", "xmark", "warning")
                chkIconArr[1].classList.add("fa-check", "pass")
                
                // 문구 색상 변경: 빨강에서 초록으루
                chkStrArr[1].classList.remove("warning")
                chkStrArr[1].classList.add("pass")
            }

            // 3번 조건
            if(t.value == uid.value) {
                if(chkIconArr[2].classList.contains("fa-check")) {
                    // 아이콘 교체: ✓ 빼고 x
                    chkIconArr[2].classList.remove("fa-check", "pass")
                    chkIconArr[2].classList.add("fa-xmark", "xmark")
                }
                // 문구 색상 변경: 초록에서 빨강으루
                chkIconArr[2].classList.add("warning")
                chkStrArr[2].classList.remove("pass")
                chkStrArr[2].classList.add("warning")
            } else {
                // 아이콘 교체: x 빼고 ✓
                chkIconArr[2].classList.remove("fa-xmark", "xmark", "warning")
                chkIconArr[2].classList.add("fa-check", "pass")

                // 문구 색상 변경: 빨강에서 초록으루
                chkStrArr[2].classList.remove("warning")
                chkStrArr[2].classList.add("pass")
            }

            if(checkPasswordCombo(str) && checkRepeatChar(str) && t.value != uid.value)
                return true;

        } else if(t.name == "chk-pw") {         // 비밀번호 확인

            // 검사 문구가 없는 경우
            if(t.nextElementSibling == null) {
                printCheckConditions(t);
            }

            if(!str.trim())
                chkStr.innerText = "확인을 위해 위에서 입력한 비밀번호를 다시 입력하세요."
            else if (t.value != pw.value)
                chkStr.innerText = "비밀번호가 일치하지 않습니다."
            
            if(chkIcon.classList.contains("fa-check")) {
                chkIcon.classList.remove("fa-check")
                chkIcon.classList.add("fa-xmark", "xmark")
            }
            chkIcon.classList.add("warning")
            chkStr.classList.add("warning")

            if(!!t.value && t.value == pw.value)
                return true;

        } else if(t.name == "uname") {           // 이름
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
        } else {                                // 생일
            if(!byear.innerHTML.trim() || !bmon.innerHTML.trim() || !bday.innerHTML.trim()) {
                warningStrBirth.innerHTML = "생년월일을 입력하세요.";
            } else if (byear.innerHTML < 4 || bmon.innerHTML < 2 || bday.innerHTML < 2) {
                warningStrBirth.innerHTML = "생년월일 숫자를 정확하게 입력하세요.";
            } else {
                return true;
            }
        }

        return false;
    }

    // 이메일 형식 체크
    function checkEmail(str) {                                                 
        const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

        return reg_email.test(str);
    }

    // 비밀번호 형식 체크
    function checkPasswordCombo(str) {                                                 
        const reg_pass = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;
        
        return reg_pass.test(str);
    }

    // 연속된 문자/숫자 체크
    function checkRepeatChar(str) {
        const reg_repeat = /(\w)\1\1/;
        
        return !reg_repeat.test(str);
    }
    
    // 이름 체크
    function checkName(str) {                                                 
        const reg_name = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]{3,15}$/;

        return reg_name.test(str);
    }

    // 중복 확인 여부 확인
    function checkDouble(t) {
        if(t.name == "uid") {               // 아뒤
            if(t.nextElementSibling.classList.contains("active")){
                warningStrId.innerText = "아이디가 중복되는지 확인하세요.";
                return false;
            }
        } else if(t.name == "tel") {        // 폰번
            if(t.nextElementSibling.classList.contains("active")) {
                warningStrTel.innerText = "휴대폰 번호가 중복되는지 확인하세요.";
                return false;
            }
        }
    }

    // 중복 확인 버튼 활성화
    function activateButton(t) {
        var doubleBtn = t.nextElementSibling;
        doubleBtn.classList.add("active");
        doubleBtn.removeAttribute("disabled")
    }

    // 중복 확인 버튼 비활성화
    function disabledButton(t) {
        var doubleBtn = t.nextElementSibling;
        doubleBtn.classList.remove("active");

        doubleBtn.disabled = true;
    }


});