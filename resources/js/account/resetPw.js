window.onload = function() {

    // 현재 페이지 쿼리 스트링 추출
    var urlStr = window.location.href;
    var url = new URL(urlStr);
    const uid = url.searchParams.get("uid");
    const prevPw = document.querySelector(".result");
    
    // 홈 버튼 클릭 이벤트
    const homeBtn = document.querySelector('.logo');
    homeBtn.onclick = function() {
        location.href = "../../index.jsp";
    }
    
    const pw = document.querySelector("#pw");
    const chkWrapper = document.querySelector(".chk-wrapper");
    const passGroup = document.querySelectorAll(".pass-group");
    // pw.focus();
    
    /* 
     * 비밀번호 입력란 선택 이벤트
     */
    pw.addEventListener("focus", function(){
    
        // 유효성 검사 문구 hide 풀기
        if(chkWrapper.classList.contains("hide") && passGroup[0].classList.contains("hide"))
            chkWrapper.classList.remove("hide");
        
    });
    
    /* 
     * 비밀번호 입력란 입력 중 이벤트
     */
    pw.addEventListener("input", function(e){
    
        var t = e.target
    
        if(checkValidation(t)) {                        // 통과
            
            // 입력란 박스 빨간색 테두리 해제
            t.classList.remove("warning-box");
    
            // 검사 조건 숨김
            chkWrapper.classList.add("hide");
    
            // 유효성 검사 통과 문구 출력
            if(t.parentNode.lastElementChild.classList.contains("hide")) {
                t.parentNode.lastElementChild.classList.remove("hide");
            }
    
        } else {                                        // 실패
    
            // 입력란 박스 빨간색 테두리 치기
            t.classList.add("warning-box");
            
            // 유효성 검사 통과 문구 숨김
            if(!t.parentNode.lastElementChild.classList.contains("hide")) {
                t.parentNode.lastElementChild.classList.add("hide");
            }
            
            // 검사 조건 숨김
            chkWrapper.classList.remove("hide");
        }
    
    });
    
    
    /* 
     * 비밀번호 확인 입력란 선택 이벤트
     */
    const chkPw = document.querySelector("#chk-pw");
    const chkPWGuide = document.querySelector(".chk-pw-guide");
    chkPw.addEventListener("focus", function(){
    
        // 유효성 검사 문구 hide 풀기
        if(chkPWGuide.classList.contains("hide") && passGroup[1].classList.contains("hide"))
            chkPWGuide.classList.remove("hide");
    
    });
    
    /* 
     * 비밀번호 확인 입력란 입력 이벤트
     */
    chkPw.addEventListener("input", function(e){
        
        var t = e.target;
    
        if(checkValidation(t)) {                        // 통과
        
            // 입력란 박스 빨간색 테두리 해제
            t.classList.remove("warning-box");
            
            // 검사 조건 숨기기
            chkPWGuide.classList.add("hide");
    
            // 유효성 검사 통과 문구 출력
            if(t.parentNode.lastElementChild.classList.contains("hide")) {
                t.parentNode.lastElementChild.classList.remove("hide");
            }
    
        } else {                                        // 실패
    
            // 입력란 박스 빨간색 테두리 치기
            t.classList.add("warning-box")
    
            // 유효성 검사 통과 문구 숨김
            if(!t.parentNode.lastElementChild.classList.contains("hide")) {
                t.parentNode.lastElementChild.classList.add("hide");
            }
            
            // 검사 조건 숨김
            chkPWGuide.classList.remove("hide");
    
        }
    });
    
    /* 
     * 비밀번호 재설정하기 클릭 이벤트
     */
    const resetPwBtn = document.querySelector("#reset-pw-btn");
    resetPwBtn.addEventListener("click", function(e) {
        e.preventDefault();
    
        const inputFields = [pw, chkPw];
        var isValid = true;
    
        for (const inputField of inputFields) {
            if (!checkValidation(inputField)) {
                isValid = false;
    
                // 유효성 검사를 받지 않은 경우
                if(!inputField.classList.contains("warning-box")) {
                    
                    // 입력란 테두리 빨간색 처리
                    inputField.classList.add("warning-box");
                    
                    // 입력란 아래 유효성 검사 문구 출력
                    inputField.nextElementSibling.classList.remove("hide");
                }
    
                inputField.focus();
                break;
            }
        }
    
        if (isValid) {
            form.submit();
            // 임시
            location.href = "../../index.jsp";
        }
    
    });
    
    /* 
     * 유효성 검사
     */
    const chkIconArr = document.querySelectorAll(".chk-wrapper .chk-group i");
    const chkStrArr = document.querySelectorAll(".chk-wrapper .chk-group span");
    const chkIcon = document.querySelector(".chk-pw-guide i");
    const chkStr = document.querySelector(".chk-pw-guide span");
    function checkValidation(t) {
    
        var str = t.value;
        
        if(t.name == "pw") {            // 비밀번호
    
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
            if(t.value == uid) {
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
    
            // 4번 조건
            if(t.value == prevPw) {
                if(chkIconArr[3].classList.contains("fa-check")) {
                    // 아이콘 교체: ✓ 빼고 x
                    chkIconArr[3].classList.remove("fa-check", "pass");
                    chkIconArr[3].classList.add("fa-xmark", "xmark");
                }
                // 문구 색상 변경: 초록에서 빨강으루
                chkIconArr[3].classList.add("warning");
                chkStrArr[3].classList.remove("pass");
                chkStrArr[3].classList.add("warning");
            } else {
                // 아이콘 교체: x 빼고 ✓
                chkIconArr[3].classList.remove("fa-xmark", "xmark", "warning");
                chkIconArr[3].classList.add("fa-check", "pass");
    
                // 문구 색상 변경: 빨강에서 초록으루
                chkStrArr[3].classList.remove("warning");
                chkStrArr[3].classList.add("pass");
            }
    
            if(checkPasswordCombo(str) && checkRepeatChar(str) && t.value != uid && t.value != prevPw)
                return true;
    
        } else if(t.name == "chk-pw") {         // 비밀번호 확인
    
            if(!str.trim())
                chkStr.innerText = "확인을 위해 위에서 입력한 비밀번호를 다시 입력하세요.";
            else if (t.value != pw.value)
                chkStr.innerText = "비밀번호가 일치하지 않습니다.";
            
            if(chkIcon.classList.contains("fa-check")) {
                chkIcon.classList.remove("fa-check");
                chkIcon.classList.add("fa-xmark", "xmark");
            }
            chkIcon.classList.add("warning");
            chkStr.classList.add("warning");
    
            if(!!t.value && t.value == pw.value)
                return true;
        }
    
        return false;
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

}