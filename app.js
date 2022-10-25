import {
  HEADER_BTNS_TEXT as headerBtnsText,
  CARD_DATA as cardData,
} from "./utils/constants.js";

("use strict");
const circle = document.querySelectorAll(".circle");
const timerValue = document.querySelectorAll(".timer_value");
const headerImageContainer = document.querySelector(".header-img_container");
const headerBtns = document.querySelector(".header-btns");
const cardContainer = document.querySelector(".card_container");

// Timer
let textSec, textMin, textHour, textDay;

function displayTimer() {
  const countDate = new Date("November 24, 2022 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;

  textDay = Math.floor(gap / day);
  textHour = Math.floor((gap % day) / hour);
  textMin = Math.floor((gap % hour) / min);
  textSec = Math.floor((gap % min) / sec);

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

  return [textSec, textMin, textHour, textDay];
}

function timerHandler() {
  // prettier-ignore
  const circleColors = ["--circle-one","--circle-two","--circle-three","--circle-four"];

  displayTimer().forEach((el) => {
    if (el !== 0) {
      setInterval(() => {
        displayTimer();
      }, 1000);
    } else {
      clearInterval();
      timerValue.forEach((item) => {
        item.textContent = 0;
      });
      circle.forEach((item, index) => {
        // prettier-ignore
        item.style.background = `conic-gradient(var(${circleColors[index]}) 3deg,var(--circle-default) 0deg)`;
      });
    }
  });
}
timerHandler();

// const view = window.matchMedia("(max-width: 450px)");

function showHeaderImage() {
  const desktopHeaderImage = "./assets/headerImg.png";
  const mobileHeaderImage = "./assets/headerImgMobile.png";

  if (window.innerWidth < 450) {
    headerImageContainer.innerHTML = `<img class="header_img width_full" src="${mobileHeaderImage}" alt="header image" />`;
  } else {
    headerImageContainer.innerHTML = `<img class="header_img width_full" src="${desktopHeaderImage}" alt="header image" />`;
  }
}
showHeaderImage();
window.addEventListener("resize", showHeaderImage);

function displayHeaderLinks() {
  headerBtnsText.map((item) => {
    const headerBtnsContainer = document.createElement("div");
    headerBtnsContainer.classList.add("header-btns_container");
    headerBtnsContainer.innerHTML = `
        <a href="#" class="btn-primary header-buttons_button">${item}</a>
      `;
    headerBtns.appendChild(headerBtnsContainer);
  });
}
displayHeaderLinks();

function headerBtnsCustomStyle() {
  const headerBtnsButton = document.querySelectorAll(".header-buttons_button");

  headerBtnsButton[0].style.background = "var(--bg-secondary-clr)";
  headerBtnsButton[4].style.outline = "3px solid var(--bg-secondary-clr)";
}
headerBtnsCustomStyle();

function displayCardData() {
  // prettier-ignore
  cardData.map(({cardPhotoSrc, cardTitle, cardParaOne, cardParaTwo, cardBtnText}) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-img_container flex_center">
      <img src="${cardPhotoSrc}" alt="card photo" width="100%" />
    </div>
    <div class="card_description">
      <h2 class="card_title">${cardTitle}</h2>
      <div class="card_check card-border_top">
        <span class="check_img"><img src="./assets/cardCheck.png" alt="check" /></span>
        <p class="card-para width_full">${cardParaOne}</p>
      </div>
      <div class="card_check card-border_top card-border_bottom">
        <span class="check_img"><img src="./assets/cardCheck.png" alt="check" /></span>
        <p class="card-para width_full">${cardParaTwo}</p>
      </div>
      <div class="card-btn_container">
        <button class="btn-secondary card_btn" type="button">${cardBtnText}</button>
      </div>
    </div>
  `;
  cardContainer.appendChild(card);
});
}
displayCardData();
