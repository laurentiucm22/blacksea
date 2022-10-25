import { headerBtnsText } from "./utils/constants.js";

("use strict");
const circle = document.querySelectorAll(".circle");
const timerValue = document.querySelectorAll(".timer_value");
const headerImageContainer = document.querySelector(".header-img_container");
const headerBtns = document.querySelector(".header-btns");

// Timer
let progressBarSec, progressBarMin, progressBarHour, progressBarDay;

function displayTimer() {
  const countDate = new Date("November 24, 2022 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMin = Math.floor((gap % hour) / min);
  const textSec = Math.floor((gap % min) / sec);

  timerValue[0].textContent = textDay;
  timerValue[1].textContent = textHour;
  timerValue[2].textContent = textMin;
  timerValue[3].textContent = textSec;

  // prettier-ignore
  circle[0].style.background = `conic-gradient(var(--circle-one) ${textDay * 12}deg,var(--circle-default) 0deg)`;
  // prettier-ignore
  circle[1].style.background = `conic-gradient(var(--circle-two) ${textHour * 15}deg,var(--circle-default) 0deg)`;
  // prettier-ignore
  circle[2].style.background = `conic-gradient(var(--circle-three) ${textMin * 6}deg,var(--circle-default) 0deg)`;
  // prettier-ignore
  circle[3].style.background = `conic-gradient(var(--circle-four) ${textSec * 6}deg,var(--circle-default) 0deg)`;
}

function timerHandler() {
  // prettier-ignore
  const circleColors = ["--circle-one","--circle-two","--circle-three","--circle-four"];
  // prettier-ignore
  if (!progressBarDay && !progressBarHour && !progressBarMin && !progressBarSec) {
    setInterval(() => {
      displayTimer();
    }, 1000);
  } else {
    clearInterval();
    timerValue.forEach((item) => {
      item.textContent = 0;
    });
    circle.forEach((item, index) => {
      item.style.background = `conic-gradient(var(${circleColors[index]}) 3deg,var(--circle-default) 0deg)`;
    });
  }
}
timerHandler();

function showHeaderImage(view) {
  const desktopHeaderImage = "./assets/headerImg.png";
  const mobileHeaderImage = "./assets/headerImgMobile.png";

  if (view.matches) {
    headerImageContainer.innerHTML = `<img class="header_img width_full" src="${mobileHeaderImage}" alt="header image" />`;
  } else {
    headerImageContainer.innerHTML = `<img class="header_img width_full" src="${desktopHeaderImage}" alt="header image" />`;
  }
}
const view = window.matchMedia("(max-width: 450px)");
showHeaderImage(view);
view.addListener(showHeaderImage);

headerBtnsText.map((item) => {
  const headerBtnsContainer = document.createElement("div");
  headerBtnsContainer.classList.add("header-btns_container");
  headerBtnsContainer.innerHTML = `
    <a href="#" class="btn-primary header-buttons_button">${item}</a>
  `;
  headerBtns.appendChild(headerBtnsContainer);
});

function headerBtnsCustomStyle() {
  const headerBtnsButton = document.querySelectorAll(".header-buttons_button");

  headerBtnsButton[0].style.background = "var(--bg-secondary-clr)";
  headerBtnsButton[4].style.outline = "3px solid var(--bg-secondary-clr)";
}
headerBtnsCustomStyle();
