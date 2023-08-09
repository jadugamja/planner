var haveClicked = false;

window.onload = function() {

    // 현재 페이지 쿼리 스트링 추출
    var urlStr = window.location.href;
    var url = new URL(urlStr);
    const pid = url.searchParams.get("pid");
    
    /* 
     * 삭제 버튼 클릭 이벤트
     */
    const okBtn = document.querySelector(".ok-btn");
    okBtn.addEventListener("click", function(){
        haveClicked = true;
        
        // 부모창 dim 화면 끄기
        parent.document.querySelector(".modal").remove();

        // action: delete
        opener.location.href = "/planner/action/deletePlan.jsp?pid=" + pid;

        // 자식창 닫기
        window.self.close();
    });

    /* 
     * 취소 버튼 클릭 이벤트
     */
    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", function(){
        haveClicked = true;
        
        // 부모창 dim 화면 끄기
        parent.document.querySelector(".modal").remove();

        // 자식창 닫기
        window.self.close();
    });

}

// 브라우저 창 unload되기 전 이벤트
window.addEventListener("beforeunload", (e) => {
    // 기본 동작 방지
    e.preventDefault();
    
    // 다른 버튼을 클릭한 적 없는 경우
    if(!haveClicked) {
        // 부모창 dim 화면 끄기
        window.opener.document.querySelector(".modal").remove();
    }
});