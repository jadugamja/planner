var haveClicked = false;

window.addEventListener("load", function(){

    const succ = document.querySelector(".success-window");
    const fail = document.querySelector(".failure-window");
    var parent = window.opener;

    var isExisted = document.querySelector(".result").value;

    if(isExisted == 1)          // 실패
        fail.classList.remove("hide");
    else                        // 성공
        succ.classList.remove("hide");

    /* 
     * 사용하기 버튼 클릭 이벤트
     */
    const parentUid = parent.document.querySelector("#uid");
    const okBtn = document.querySelector(".ok-btn");
    okBtn.addEventListener("click", function(e){
        haveClicked = true;

        parentUid.parentElement.before(createValidIcon());
        parentUid.parentElement.previousElementSibling.lastElementChild.classList.add("right");
        
        // 유효성 검사 결과 문구 있으면 제거
        if(parentUid.parentElement.nextElementSibling != null)
            parentUid.parentElement.nextElementSibling.remove();
        
        // 입력란 읽기 전용으로 전환
        parentUid.readOnly = true;
        
        // 버튼 비활성화
        disabledButton(parentUid);
        
        // 부모창 dim 화면 끄기
        parent.document.querySelector(".modal").remove();
        // 자식창 닫기
        window.self.close();
    });

    /* 
     * 취소 버튼 클릭 이벤트
     */
    const cancelBtns = document.querySelectorAll(".cancel-btn");
    cancelBtns.forEach((cancelBtn) => {
        cancelBtn.addEventListener("click", function(e){
            haveClicked = true;
    
            // 유효성 검사 결과 문구 있으면 제거
            if(parentUid.parentElement.nextElementSibling != null)
                parentUid.parentElement.nextElementSibling.remove();
            parentUid.value = "";
            parentUid.focus();
    
            // 버튼 비활성화
            disabledButton(parentUid);
            
            // 부모창 dim 화면 끄기
            parent.document.querySelector(".modal").remove();
            // 자식창 닫기
            window.self.close();
        });
    });

    // 유효성 검사 통과 아이콘 생성
    function createValidIcon(){
        const validSpan = parent.document.createElement("span");
        const validIcon = parent.document.createElement("i");

        validSpan.setAttribute("class", "valid-span")
        validIcon.setAttribute("class", "fa-solid fa-check valid")

        validSpan.appendChild(validIcon)
        return validSpan
    }

});

// 브라우저 창 unload되기 전 이벤트
window.addEventListener("beforeunload", (e) => {
    // 기본 동작 방지
    e.preventDefault();
    
    // 다른 버튼을 클릭한 적 없는 경우
    if(!haveClicked) {
        var parentUid = window.opener.document.querySelector("#uid");

        // 유효성 검사 결과 문구 있으면 제거
        if(parentUid.parentElement.nextElementSibling != null)
            parentUid.parentElement.nextElementSibling.remove();

        // 휴대폰 번호 입력란 초기화
        parentUid.value = "";
        parentUid.focus();
    
        disabledButton(parentUid);
    
        // 부모창 dim 화면 끄기
        window.opener.document.querySelector(".modal").remove();
    }
});

// 중복 확인 버튼 비활성화
function disabledButton(t) {
    var doubleBtn = t.nextElementSibling;
    doubleBtn.classList.remove("active");
    doubleBtn.disabled = true;
}
