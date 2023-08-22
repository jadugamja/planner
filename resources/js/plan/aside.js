window.onload = function() {
    const myType = document.querySelector("#my-type");
    const myName = document.querySelector("#my-name");
    const myEmail = document.querySelector("#my-email");
    const myTel = document.querySelector("#my-tel");
    const myBday = document.querySelector("#my-b-day");
    const loginId = document.querySelector(".login-id");

    function setMyInfo() {
        myType.innerHTML = myInfo[0];
        myName.innerHTML = myInfo[1];
        myEmail.innerHTML = loginId.value;
        myTel.innerHTML = myInfo[2];
        myBday.innerHTML = myInfo[3];
    }

    /* 
     * 로그아웃 클릭 이벤트
     */
    const logoutBtns = document.querySelectorAll("#logout span");
    logoutBtns.forEach((span) => {
        
        span.addEventListener("click", function(){
            window.location.href = "/planner/action/logout.jsp";
        });

    });

    /* 
     * 직원 목록 생성
     */
    const empList = document.querySelector(".emp-list");
    const rsList = document.querySelector(".rsList").value;
    function setUserList() {
        
        // 더블 쿼테이션 제거
        var listAll = rsList.slice(1, -1).split("],");
        
        // 동적 태그 생성
        for(var i=0; i < listAll.length; i++) {
            
            var listEach = listAll[i].split(",");

            // 유저 li 생성
            var listWrapper = document.createElement("li");
            listWrapper.classList.add("list-wrapper");

            // 유형
            var divEmpType = document.createElement("div");
            divEmpType.classList.add("center-aligned", "rounded", "small-rounded");
            var spanEmpType = document.createElement("span");
            spanEmpType.classList.add("emp-type");

            // #1
            // 유형
            var divEmpType = document.createElement("div");
            divEmpType.classList.add("center-aligned", "rounded", "small-rounded");
            var spanEmpType = document.createElement("span");
            spanEmpType.classList.add("emp-type");

            // #2
            // 이름, 이메일 부모
            var divEmpMain = document.createElement("div");
            divEmpMain.classList.add("info-main-txt");
            var divEmpName = document.createElement("div");
            divEmpName.classList.add("bold-txt", "fontsize-19");
            // 이름
            var spanEmpName = document.createElement("span");
            spanEmpName.classList.add("emp-name");
            // 이메일
            var spanEmpEmail = document.createElement("span");
            spanEmpEmail.classList.add("emp-email");
   
            for(var j=0; j < listEach.length; j++) {
                if(j == 0)
                    spanEmpType.innerHTML = listEach[j].replace("[", "").trim();
                else if(j == 1)
                    spanEmpName.innerHTML = listEach[j].trim();
                else if(j == 2)
                    spanEmpEmail.innerHTML = listEach[j].replace("]", "").trim();
            }

            divEmpMain.appendChild(divEmpName);
            divEmpName.appendChild(spanEmpName);
            divEmpMain.appendChild(spanEmpEmail);
            
            divEmpType.appendChild(spanEmpType);
    
            listWrapper.appendChild(divEmpType);
            listWrapper.appendChild(divEmpMain);
            
            empList.appendChild(listWrapper);
        }
    }

    /* 
     * 직원 선택 시 해당 직원의 일정 확인
     */
    var emps = document.querySelectorAll("ul.emp-list li");
    emps.forEach((emp) => {
        // emp.onclick = showEmpPlanList;
        emp.addEventListener("click", function(){
            alert("클릭 먹어랏랏")
        });
    });


    //////////////// 초기 설정 ////////////////
    setMyInfo();

    if(rsList.length > 2) {
        setUserList();
        if(empList.closest(".info-box").classList.contains("hide"))
            empList.closest(".info-box").classList.remove("hide");
    }
    //////////////////////////////////////////
}

/* 
 * 직원 선택 시 해당 직원의 일정 확인
 */
document.addEventListener("click", function(e) {

    var t = e.target;
    
    if(t.classList.contains("emp-name")){
        // 이름 아래 이메일 값 전달
        showEmpPlanList(t.parentElement.nextElementSibling.innerHTML);
    } else if(t.classList.contains("emp-email")) {
        // 이메일 값 전달
        showEmpPlanList(t.innerHTML);
    }

    // 내 이름/이메일 클릭 시
    if(t.id == "my-name" || t.id == "my-email") {
        location.href = "/planner/views/plan/list.jsp?empId=0";
    }
});

function showEmpPlanList(empId) {
    
    // 해당 직원의 일정 목록 조회 페이지 이동
    location.href = "/planner/views/plan/list.jsp?empId=" + empId;
    
}