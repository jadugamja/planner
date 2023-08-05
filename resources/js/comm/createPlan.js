var data = ["임의루 서버에서 받은 결과"];

const planArticle = document.createElement("article");
planArticle.classList.add("plan-list");

const planLeftSide = document.createElement("div");
const planLeftSideDiv = document.createElement("div");
const planLeftSideDayNum = document.createElement("span");
const planLeftSideDayKor = document.createElement("span");
const planLeftSideYoil = document.createElement("span");

planLeftSide.classList.add("plan-left-side");
planLeftSideDayNum.classList.add("date", "date-num");
planLeftSideDayKor.classList.add("date", "date-kor-txt");

planLeftSide.appendChild
planLeftSideYoil.classList.add("day", "day-txt", "weekday");

planLeftSideDayNum.innerHTML = data.day;
planLeftSideDayKor.innerHTML = "일";
planLeftSideYoil.innerHTML = data.yoil;

