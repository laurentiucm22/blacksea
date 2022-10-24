"use strict";
const circle = document.querySelectorAll(".circle");
const timerValue = document.querySelectorAll(".timer_value");

const headerImageContainer = document.querySelector(".header-img_container");

function timer() {
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

  let progressSec = textSec;
  let progressMin = textMin;
  let progressHour = textHour;
  let progressDay = textDay;

  timerValue[0].textContent = progressDay;
  timerValue[1].textContent = progressHour;
  timerValue[2].textContent = progressMin;
  timerValue[3].textContent = progressSec;

  // prettier-ignore
  circle[0].style.background = `conic-gradient(var(--circle-one) ${progressDay * 12}deg,var(--circle-default) 0deg)`;
  // prettier-ignore
  circle[1].style.background = `conic-gradient(var(--circle-two) ${progressHour * 15}deg,var(--circle-default) 0deg)`;
  // prettier-ignore
  circle[2].style.background = `conic-gradient(var(--circle-three) ${progressMin * 6}deg,var(--circle-default) 0deg)`;
  // prettier-ignore
  circle[3].style.background = `conic-gradient(var(--circle-four) ${progressSec * 6}deg,var(--circle-default) 0deg)`;
}

setInterval(() => {
  timer();
}, 1000);

function showHeaderImage(view) {
  const desktopHeaderImage = "./assets/headerImg.png";
  const mobileHeaderImage = "./assets/headerImageMobile.png";

  if (view.matches) {
    headerImageContainer.innerHTML = `<img class="header_img width_full" src="${mobileHeaderImage}" alt="header image" />`;
  } else {
    headerImageContainer.innerHTML = `<img class="header_img width_full" src="${desktopHeaderImage}" alt="header image" />`;
  }
}
const view = window.matchMedia("(max-width: 450px)");
showHeaderImage(view);
view.addListener(showHeaderImage);
