window.addEventListener("load", function(){

    /* 
     * 로고 클릭 이벤트
     */
    const logo = document.querySelector(".logo");
    logo.addEventListener("click", function(e){
        e.preventDefault();
        
        location.href = "list.jsp";
    });
    
    /* 
     * 메뉴바 클릭 이벤트
     */
    const menu = document.querySelector(".menu");
    const sideBar = document.querySelector(".side-bar");
    menu.addEventListener("click", function(e){
        var t = e.target;
        
        sideBar.classList.toggle("hide")
    }); 
        
    /* 
     * 이전 해 버튼 클릭 이벤트
     */
    const lastYearBtn = document.querySelector(".go-prev-year");
    lastYearBtn.addEventListener("click", function(e){
        year.innerHTML = (parseInt(year.innerHTML) - 1).toString() + "년";
        
        // 흑흑....
        // sendDataToServer()
    });

    /* 
     * 다음 해 버튼 클릭 이벤트
     */
    const nextYearBtn = document.querySelector(".go-next-year");
    nextYearBtn.addEventListener("click", function(e){
        year.innerHTML = (parseInt(year.innerHTML) + 1).toString() + "년";

        // sendDataToServer()
    });

    /* 
     * 수정 버튼 클릭 이벤트
     */
    const updateBtns = document.querySelectorAll(".upt-btn");
    updateBtns.forEach((updateBtn) => {
        
        updateBtn.addEventListener("click", function(e){
            var t = e.target;
            var parent = t.closest(".plan-icon-group")
            const existingValue = parent.previousElementSibling.querySelector(".plan").innerHTML;
            var existingTime = parent.previousElementSibling.querySelector(".time").innerHTML;
            var hh;


            // 조건 주세요!
            // var timeArr = existingTime.split(" ");
            // var hhmm = timeArr[1].split(":");

            // if(timeArr[0] == "오후") {
            //     hh = parseInt(timeArr[1]) + 12;
            //     hhmm[0] = hh;
            //     existingTime = hhmm[0] + ":" + hhmm[1];
            // } else if(timeArr[0] == "오전") {
            //     existingTime = "0" + hhmm[0] + ":" + hhmm[1];
            // }

            if(parent.previousElementSibling.querySelector(".plan").classList.contains("edited-plan")) {
                updateDataOnServer()
            } else {
                // input 생성
                var editTime = document.createElement("input");
                var editInput = document.createElement("input");
        
                editTime.type = "time";
                editInput.type = "text";
                editTime.value = existingTime;
                editInput.value = existingValue;
                editTime.classList.add("time", "edited-time");
                editInput.classList.add("plan", "edited-plan");
        
                // span 삭제, input으로 대체
                parent.previousElementSibling.querySelector(".time").remove();
                parent.previousElementSibling.querySelector(".plan").remove();
                parent.previousElementSibling.classList.remove("cancellation")
                parent.previousElementSibling.append(editTime);
                parent.previousElementSibling.append(editInput);
        
                editInput.focus()
            }
        
        });
    });

    /* 
     * 서버로 데이터 보내기
     */
    function updateDataOnServer() {
        
        const formData = new FormData();
        // var form = document.createElement("form");

        // 수정된 값
        const edited = document.querySelector(".edited-plan").value != "" ? document.querySelector(".edited-plan").value : "임시";
        const editedTime = document.querySelector(".edited-time").value != "" ? document.querySelector(".edited-time").value : "00:00";
        const pid = document.querySelector(".edited-plan").parentElement.nextElementSibling.nextElementSibling.value;

        formData.append("edited", edited);
        formData.append("edited-time", editedTime);
        formData.append("pid", pid);

        var newForm = document.createElement("form");
        newForm.action = "../../action/updatePlan.jsp";
        newForm.method = "POST";
        newForm.body = formData;

        document.append(newForm);
        newForm.submit();
    }

    /* 
     * 일정 추가 클릭 이벤트
     */
    const addBtn = document.querySelector(".add-btn");
    addBtn.addEventListener("click", function(e){
        var popWidth = 700;
        var popHeight = 600;

        var popupX = (window.screen.width / 2) - (popWidth / 2);
        var popupY = (window.screen.height / 2) - (popHeight / 2);

        // 새 창 열기
        var name = "_blank"
        var specs = "width=" + popWidth + ","
                    + "height=" + popHeight + ","
                    + "left=" + popupX + ","
                    + "top=" + popupY + ","
        ;

        window.open("/planner/views/plan/insert.jsp", name, specs, true);

    });
    
    /* 
     * 월 콤보 박스 클릭 이벤트
     */
    const monthBox = document.querySelector("#month");
    const selected = monthBox.querySelector(".selected-value")
    monthBox.addEventListener("click", function(e){
        var t = e.target;
        var isOption = t.classList.contains("option");
        const monList = monthBox.querySelector(".option-wrapper");
       
        // 옵션 선택한 경우
        if(isOption) {
            selected.textContent = t.textContent;
            sendDataToServer();
        }
        
        monList.classList.toggle("hide");
        monthBox.classList.toggle("active");
            
    });

    /* 
     * 셀렉트 박스 바깥 영역 클릭 이벤트
     */
    document.addEventListener("click", function(e){
        var t = e.target
        var isSelect = t.classList.contains("select") || t.closest(".select")
  
        var monList = t.querySelector(".option-wrapper") != null ? t.querySelector(".option-wrapper") : document.querySelector(".option-wrapper");

        if(isSelect)
            return;
        
        monList.classList.add("hide");
        monthBox.classList.remove("active");

    });


    // const planList = document.querySelectorAll('.plan-list'); 
    // [].forEach.call(planList,function(plan){ 
    //     plan.addEventListener("click", planClick, false); 
    // }); 

    // function planClick(e){ 
    //     e.target.classList.add("active")
    // }

    /* 
    * 서버로 값 보냄
    */
    const form = document.querySelector("form");
    function sendDataToServer() {

        // const formData = new FormData();
        var yearMonth;

        if(parseInt(selected.textContent) < 10)
            yearMonth = parseInt(year.innerHTML).toString() + "-0" + parseInt(selected.textContent).toString();
        else
            yearMonth = parseInt(year.innerHTML).toString() + "-" + parseInt(selected.textContent).toString();
        
        // 필요한 데이터를 formData에 추가
        // formData.append("year-month", yearMonth);

        location.href = "/planner/views/plan/list.jsp?yearMonth=" + yearMonth;
        // form 날리는 게 아닌가..?
        // form.action = "/planner/views/plan/list.jsp?yearMonth=" + yearMonth;
        // form.submit();

    }

    /* 
    * 현재 연도 세팅
    */
    const year = document.querySelector(".year");
    function setThisYear() {
           
        var dt = new Date();
        var thisYear = dt.getFullYear();

        year.innerHTML = thisYear + "년"
    }

    /* 
     * 월 콤보 박스 세팅
     */
    function setMonthBox() {

        const monthList = document.createElement("ul");
        monthList.classList.add("option-wrapper", "hide");
        
        for(var i = 1; i <= 12; i++){
            const optMon = document.createElement("li");
            optMon.classList.add("option", "box-padding");
            optMon.setAttribute("value", "m" + i)
            optMon.innerText = i + "월"

            // if(setMonth == i)
            //     selected.textContent = i + "월";
            
            monthList.appendChild(optMon)
        }

        monthBox.appendChild(monthList)
    }

    /* 
     * 요일 색상 변경
     */
    const yoils = document.querySelectorAll(".weekday");
    function convertYoilColor() {
        for(var i in yoils) {

            var yoil = yoils[i].innerHTML;
            
            if(yoil == "土") {                  // 토욜
                yoils[i].classList.add("saturday")
                yoils[i].previousElementSibling.classList.add("saturday")
            } else if(yoil == "日") {           // 일욜
                yoils[i].classList.add("sunday")
                yoils[i].previousElementSibling.classList.add("sunday")
            }

        }

    }

    /* 
     * 지난 날짜 취소선 긋기
     */
    const dates = document.querySelectorAll(".date-num");
    function cancelFromYesterday() {
        var now = new Date().getDate();

        for(var i = 0; i < dates.length; i++) {
            var date = dates[i].innerHTML;

            if (date < now) {
                var plans = dates[i].closest(".plan-left-side").nextElementSibling.querySelectorAll(".plan-content");

                for(var j=0; j < plans.length; j++) {
                    plans[j].classList.add("cancellation")
                }
            }

        }
    }

    // 현재 연도 세팅
    setThisYear()

    // 월 콤보 박스 세팅
    setMonthBox()

    // 영어 -> 한자로 바꿔줌
    convertYoilColor()

    cancelFromYesterday()
});