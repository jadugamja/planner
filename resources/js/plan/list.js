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
    menu.addEventListener("click", function(){
        // var t = e.target;
        
        sideBar.classList.toggle("hide")
    }); 
        
    /* 
     * 이전 해 버튼 클릭 이벤트
     */
    const year = document.querySelector(".year");
    const lastYearBtn = document.querySelector(".go-prev-year");
    lastYearBtn.addEventListener("click", function(){
        year.innerHTML = (parseInt(year.innerHTML) - 1).toString() + "년";
        
        sendDataToServer();
    });

    /* 
     * 다음 해 버튼 클릭 이벤트
     */
    const nextYearBtn = document.querySelector(".go-next-year");
    nextYearBtn.addEventListener("click", function(){
        year.innerHTML = (parseInt(year.innerHTML) + 1).toString() + "년";

        sendDataToServer();
    });

    /* 
     * 수정 버튼 클릭 이벤트
     */
    // input 생성
    var editTime = document.createElement("input");
    var editInput = document.createElement("input");
    const updateBtns = document.querySelectorAll(".upt-btn");
    updateBtns.forEach((updateBtn) => {
        
        updateBtn.addEventListener("click", function(e){
            var t = e.target;
            var parent = t.closest(".plan-icon-group")
            const existingValue = parent.previousElementSibling.querySelector(".plan").innerHTML;
            var existingTime = parent.previousElementSibling.querySelector(".time").innerHTML;
            var hh;

            if(existingTime != "") {
                var timeArr = existingTime.split(" ");
                var hhmm = timeArr[1].split(":");
    
                if(timeArr[0] == "오후") {
                    hh = parseInt(timeArr[1]) + 12;
                    hhmm[0] = hh;
                    existingTime = hhmm[0] + ":" + hhmm[1];
                } else if(timeArr[0] == "오전") {
                    existingTime = "0" + hhmm[0] + ":" + hhmm[1];
                }
            }

            // 2번째 클릭
            if(parent.previousElementSibling.querySelector(".plan").classList.contains("edited-plan")) {
                
                // 유효성 검사
                if(checkValidation(t)) {
                    updatePlanContent();
                }
            
            // 1번째 클릭
            } else {
        
                editTime.type = "time";
                editInput.type = "text";
                editTime.name = "edited-time";
                editInput.name = "edited";
                editInput.maxLength = "140";

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
     * 일정 수정
     */
    function updatePlanContent() {
        
        debugger
        // 새 폼 생성
        var newForm = document.createElement("form");

        // 수정된 값
        const editedTime = document.querySelector(".edited-time");
        const edited = document.querySelector(".edited-plan");
        const pid = edited.parentElement.nextElementSibling.nextElementSibling;
        pid.name = "pid";

        // ★ 수정 필요!!! ★ 이 때, 다른 form으로 태그가 이동되면서 페이지 내에서 위치도 바뀜
        // input 3개 form에 넣어주기
        newForm.appendChild(editedTime);
        newForm.appendChild(edited);
        newForm.appendChild(pid);

        newForm.action = "../../action/updatePlan.jsp";
        newForm.method = "POST";

        document.body.appendChild(newForm);
        newForm.submit();
    }

    /* 
     * 삭제 버튼 클릭 이벤트
     */
    const delBtns = document.querySelectorAll(".del-btn");
    delBtns.forEach((delBtn) => {
        delBtn.addEventListener("click", function(e){
            var pid = e.target.closest(".plan-box").lastElementChild.value;
        
            var popWidth = 530;
            var popHeight = 220;
        
            // 팝업창 가운데 정렬
            var popupX = (window.screen.width / 2) - (popWidth / 2);
            var popupY = (window.screen.height / 2) - (popHeight / 2);
        
            // 새 창 열기
            var url = "/planner/views/plan/checkDelete.jsp";
            var name = "_blank"
            var option = "width=" + popWidth + ","
                        + "height=" + popHeight + ","
                        + "left=" + popupX + ","
                        + "top=" + popupY
            ;
        
            var fakeModal = document.createElement("div")
            fakeModal.classList.add("modal")
            document.body.appendChild(fakeModal);
        
            window.open(url + "?pid=" + pid, name, option, true);
    
        });
    });

    /* 
     * 일정 추가 클릭 이벤트
     */
    const addBtn = document.querySelector(".add-btn");
    addBtn.addEventListener("click", function(){
        var popWidth = 700;
        var popHeight = 600;

        var popupX = (window.screen.width / 2) - (popWidth / 2);
        var popupY = (window.screen.height / 2) - (popHeight / 2);

        // 새 창 열기
        var name = "_blank"
        var specs = "width=" + popWidth + ","
                    + "height=" + popHeight + ","
                    + "left=" + popupX + ","
                    + "top=" + popupY
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

    /* 
     * 페이지 새로고침(yearMonth)
     */
    function sendDataToServer() {
        var yearMonth;
        
        if(parseInt(selected.textContent) < 10)
            yearMonth = parseInt(year.innerHTML).toString() + "-0" + parseInt(selected.textContent).toString();
        else
            yearMonth = parseInt(year.innerHTML).toString() + "-" + parseInt(selected.textContent).toString();

        // 페이지 이동 및 데이터는 url 뒤에 덧붙여서 보냄
        location.href = "/planner/views/plan/list.jsp?yearMonth=" + yearMonth;
    }

    /* 
     * 일정 입력란 유효성 검사
     */
    function checkValidation(t) {

        // 시간 유효성 검사
        var updateTime = t.closest(".plan-box").querySelector(".edited-time");
        var updateContent = t.closest(".plan-box").querySelector(".edited-plan");

        if(!updateTime.value.trim())
            return false;
        
        if(!updateContent.value.trim()) {
            alert("일정 내용을 입력하세요")
            return false;
        } else if(updateContent.value.length > 140) {
            alert("최대 길이를 초과했습니다")
            return false;
        } else if(!checkCharacter(updateContent.value)) {
            alert("특수문자를 입력할 수 없습니다")
            return false;
        }

        return true;
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
    function cancelFromPast() {
        var now = new Date();
        
        // 현재 날짜(연도, 월, 일)
        var thisYear = now.getFullYear();
        var thisMon = now.getMonth() + 1;
        var thisDay = now.getDate();

        // 현재 시간(시, 분, 초)
        var thisHour = now.getHours();
        var thisMin = now.getMinutes();

        // 연도 체크
        if(parseInt(year.innerHTML) <= thisYear) {

            // 월 체크
            if(parseInt(document.querySelector("#month .selected-value").innerHTML) <= thisMon) {

                for(var i = 0; i < dates.length; i++) {
                    var date = dates[i].innerHTML;
                    var plans = dates[i].closest(".plan-left-side").nextElementSibling.querySelectorAll(".plan-content");

                    // 일 체크
                    if (date < thisDay) {
        
                        for(var j=0; j < plans.length; j++) {
                            plans[j].classList.add("cancellation")
                        }
                    }

                    // 오늘
                    if(date == thisDay) {
                        var times = dates[i].parentElement.parentElement.nextElementSibling.querySelectorAll(".time");

                        for(var j = 0; j < times.length; j++) {
                            
                            var timeHH = times[j].innerHTML.split(" ")[0] == "오후" && parseInt(times[j].innerHTML.split(" ")[1].split(":")[0]) != 12 ? parseInt(times[j].innerHTML.split(" ")[1].split(":")[0]) + 12 : parseInt(times[j].innerHTML.split(" ")[1].split(":")[0]);
                            var timeMM = parseInt(times[j].innerHTML.split(" ")[1].split(":")[1]);
                            if(timeHH < thisHour) {
                                plans[j].classList.add("cancellation");

                            } else if(timeHH == thisHour) {
                                if(timeMM < thisMin)
                                    plans[j].classList.add("cancellation");
                            }
                        }
                    }
                }
        
            }
        }
    }

    /* 
     * 입력 문자 특수문자 제한
     */
    function checkCharacter(str) {
        const reg_exp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\'\"\\\(\=]/gi;

        return !reg_exp.test(str);
    }

    // 월 콤보 박스 세팅
    setMonthBox();

    // 주말 색상 변경
    convertYoilColor();

    // 취소선 긋기
    cancelFromPast();

});