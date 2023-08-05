var haveClicked = false;

window.addEventListener("load", function(){

    const succ = document.querySelector(".success-window");
    const fail = document.querySelector(".failure-window");
    var parent = window.opener;
    var pw = document.querySelector(".result").value;

    if(pw == "")                // 실패
        fail.classList.remove("hide");
    else                        // 성공
        succ.classList.remove("hide");

    /* 
     * 비밀번호 재설정하기 버튼 클릭 이벤트
     */
    const resetPwBtn = document.querySelector(".reset-pw-btn");
    resetPwBtn.addEventListener("click", function(e){
        haveClicked = true;

        // 현재 페이지 쿼리 스트링 추출
        var urlStr = window.location.href;
        var url = new URL(urlStr);
        var uid = url.searchParams.get("uid");

        // 부모창 dim 화면 끄기
        parent.document.querySelector(".modal").remove();
        // 비밀번호 재설정 화면으로 ㄱㄱㄱㄱ!
        opener.location.href = "resetPw.jsp?uid=" + uid;
        // 자식창 닫기
        window.self.close();
    });

    /* 
     * 취소 버튼 클릭 이벤트
     */
    const parentUid = parent.document.querySelector("#uid");
    const cancelBtns = document.querySelectorAll(".cancel-btn");
    cancelBtns.forEach((cancelBtn) => {

        cancelBtn.addEventListener("click", function(e){
            haveClicked = true;
    
            // 유효성 검사 결과 문구 있으면 제거
            if(parentUid.nextElementSibling != null)
                parentUid.nextElementSibling.remove();
    
            // 입력란 초기화
            parentUid.value = "";
            parentUid.focus();
            
            // 부모창 dim 화면 끄기
            parent.document.querySelector(".modal").remove();
            // 자식창 닫기
            window.self.close();
        });
    });

});

// 브라우저 창 unload되기 전 이벤트
window.addEventListener("beforeunload", (e) => {
    // 기본 동작 방지
    e.preventDefault();
    
    // 다른 버튼을 클릭한 적 없는 경우
    if(!haveClicked) {
        var parentUid = window.opener.document.querySelector("#uid");
        
        // 유효성 검사 결과 문구 있으면 제거
        if(parentUid.nextElementSibling != null)
            parentUid.nextElementSibling.remove();

        // 입력란 초기화
        parentUid.value = "";
        parentUid.focus();
    
        // 부모창 dim 화면 끄기
        window.opener.document.querySelector(".modal").remove();
    }
});