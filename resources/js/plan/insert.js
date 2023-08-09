window.addEventListener("load", function(){

    /* 
     * 카테고리 콤보 박스 클릭 이벤트
     */
    const categoryBox = document.querySelector(".select");
    const selected = categoryBox.querySelector(".selected-value")
    const category = document.querySelector(".category-value");
    categoryBox.addEventListener("click", function(e){
        var t = e.target;
            var isOption = t.classList.contains("option");
        const cateList = categoryBox.querySelector(".option-wrapper");
        
             // 옵션 선택한 경우
        if(isOption) {
            selected.textContent = t.textContent;
            category.value = t.value;
        }
         
        cateList.classList.toggle("hide")
        categoryBox.classList.toggle("active")
    });

    
    /* 
     * 제목 입력 이벤트: 길이 제한
     */
    const title = document.querySelector("#title");
    const length = document.querySelector("#text-length");
    title.addEventListener("input", function(e){

        var v = e.target.value;
        const limitedLength = v.slice(0, 140);

        e.target.value = limitedLength;
        length.innerHTML = e.target.value.length;

    });
 
    /*
     * 저장 버튼 클릭 이벤트
     */
    const date = document.querySelector("#date");
    const time = document.querySelector("#time");
    const saveBtn = document.querySelector(".plan-save-btn");
    saveBtn.addEventListener("click", function(e){

        e.preventDefault();
        
        // 유효성 검사 통과 여부
        let isValid = true;

        if(!title.value.trim() || title.value.length > 140 || !date.value.trim() || !time.value.trim()) {

            isValid = false;
            alert("빈 값이 존재합니다")
            return
        }

        if(isValid)
            sendDataToServer();
    });
    
    /* 
     * 서버로 값 보내기
     */
    const form = document.querySelector("form");
    function sendDataToServer() {
        
        var formData = new FormData();

        form.action = "../../action/insertPlan.jsp";
        form.method = "POST";
        form.body = formData;
        form.submit();

    }

    /* 
     * 취소 버튼 클릭 이벤트 -> 창 닫기
     */
    const cancelBtn = document.querySelector(".plan-cancel-btn");
    cancelBtn.addEventListener("click", function(){
        window.self.close();
    });

    function checkValidation(t) {
        title
    }

});