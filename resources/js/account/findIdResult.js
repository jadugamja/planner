var haveClicked = false;

window.addEventListener("load", function(){

    const succ = document.querySelector(".success-window");
    const fail = document.querySelector(".failure-window");
    var parent = window.opener;
    var uid = document.querySelector(".result-txt").innerHTML;

    if(uid == "")          // 실패
        fail.classList.remove("hide");
    else                   // 성공
        succ.classList.remove("hide");

    /* 
     * 로그인 버튼 클릭 이벤트
     */
    const loginBtn = document.querySelector(".login-btn");
    loginBtn.addEventListener("click", function(e){
        haveClicked = true;

        // 부모창 dim 화면 끄기
        parent.document.querySelector(".modal").remove();
        // 로그인
        opener.location.href = "../../index.jsp";
        // 자식창 닫기
        window.self.close();
    });

    /* 
     * 비밀번호 찾기 버튼 클릭 이벤트
     */
    const goPwBtn = document.querySelector(".go-pw-btn");
    goPwBtn.addEventListener("click", function(e){
        haveClicked = true;

        // 부모창 dim 화면 끄기
        parent.document.querySelector(".modal").remove();
        // 비밀번호 찾기
        opener.location.href = "findPw.jsp";
        // 자식창 닫기
        window.self.close();
    });

    /* 
     * 취소 버튼 클릭 이벤트
     */
    const parentUname = parent.document.querySelector("#uname");
    const parentTel = parent.document.querySelector("#tel");
    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", function(e){
        haveClicked = true;

        // 유효성 검사 결과 문구 있으면 제거
        if(parentUname.nextElementSibling != null)
            parentUname.nextElementSibling.remove();

        if(parentTel.nextElementSibling != null)
            parentTel.nextElementSibling.remove();

        // 입력란 초기화
        parentUname.value = "";
        parentTel.value = "";
        parentUname.focus();
        
        // 부모창 dim 화면 끄기
        parent.document.querySelector(".modal").remove();
        // 자식창 닫기
        window.self.close();
    });


});

// 브라우저 창 unload되기 전 이벤트
window.addEventListener("beforeunload", (e) => {
    // 기본 동작 방지
    e.preventDefault();
    
    // 다른 버튼을 클릭한 적 없는 경우
    if(!haveClicked) {
        var parentUname = window.opener.document.querySelector("#uname");
        var parentTel = window.opener.document.querySelector("#tel");

        // 유효성 검사 결과 문구 있으면 제거
        if(parentUname.nextElementSibling != null)
            parentUname.nextElementSibling.remove();

        if(parentTel.nextElementSibling != null)
            parentTel.nextElementSibling.remove();

        // 입력란 초기화
        parentUname.value = "";
        parentTel.value = "";
        parentUname.focus();
    
        // 부모창 dim 화면 끄기
        window.opener.document.querySelector(".modal").remove();
    }
});