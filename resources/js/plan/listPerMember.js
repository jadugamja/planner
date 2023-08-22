window.addEventListener("load", function(){

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
    // 현재 페이지 쿼리 스트링 추출
    var urlStr = window.location.href;
    var url = new URL(urlStr);
    const yearMonth = url.searchParams.get("yearMonth");
    const year = yearMonth.split("-")[0];
    const month = yearMonth.split("-")[1];
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
        if(year <= thisYear) {
            // 월 체크
            if(month < thisMon) {
                for(var i = 0; i < dates.length; i++) {
                    var date = dates[i].innerHTML;
                    var plans = dates[i].closest(".plan-left-side").nextElementSibling.querySelectorAll(".plan-content");

                    for(var j=0; j < plans.length; j++) {
                        plans[j].classList.add("cancellation")
                    }
                }
            } else if(month == thisMon) {
                for(var i = 0; i < dates.length; i++) {
                    var date = dates[i].innerHTML;
                    var plans = dates[i].closest(".plan-left-side").nextElementSibling.querySelectorAll(".plan-content");

                    // 오늘 이전 날짜 확인
                    if (date < thisDay) {
        
                        // plan article loop
                        for(var j=0; j < plans.length; j++) {
                            plans[j].classList.add("cancellation")
                        }
                    }

                    // 오늘 확인
                    if(date == thisDay) {
                        var times = dates[i].parentElement.parentElement.nextElementSibling.querySelectorAll(".time");

                        // 오늘 날짜의 time(= plan) article loop
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

    // 주말 색상 변경
    convertYoilColor();

    // 취소선 긋기
    cancelFromPast();

});