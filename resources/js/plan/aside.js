window.addEventListener("load", function(){

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
            spanEmpEmail.classList.add("emp-name");
   
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
    const emps = document.querySelectorAll(".info-main-txt");
    emps.forEach((emp) => {

        emp.addEventListener("click", function(e){
            var t = e.target;
            debugger
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
});