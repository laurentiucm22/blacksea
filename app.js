// prettier-ignore
import {HEADER_BTNS_TEXT as headerBtnsText, CARD_DATA as cardData, FOOTER_DATA as footerData} from "./utils/constants.js";

("use strict");
const circle = document.querySelectorAll(".circle");
const timerValue = document.querySelectorAll(".timer_value");
const headerImageContainer = document.querySelector(".header-img_container");
const headerBtns = document.querySelector(".header-btns");
const cardContainer = document.querySelector(".card_container");
const burgerMenu = document.querySelector(".burger-menu_btn");
const overLay = document.querySelector(".overlay");
const navBar = document.querySelector(".nav_bar");
const viewBtns = document.querySelectorAll(".view_btns");

navBar.classList.add("hidden");
overLay.classList.add("hidden");

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

function showHeaderImage() {
  const desktopHeaderImage = "./assets/headerImg.png";
  const mobileHeaderImage = "./assets/headerImgMobile.png";

  if (window.innerWidth < 500) {
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
        <a href="#" class="btn-primary header-buttons_button ff-pt_sans">${item}</a>
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
  card.classList.add("card", "card-cube_view");
  card.innerHTML = `
    <div class="card-img_container flex_center">
      <img src="${cardPhotoSrc}" alt="card photo" width="100%" />
    </div>
    <div class="card_description">
      <h2 class="card_title ff-sans_pro">${cardTitle}</h2>
      <div class="card_check card-border_top">
        <span class="check_img">
          <img src="./assets/cardCheck.png" alt="check" />
        </span>
        <p class="card_para width_full ff-pt_sans">${cardParaOne}</p>
      </div>
      <div class="card_check card-border_top card-border_bottom">
        <span class="check_img"><img src="./assets/cardCheck.png" alt="check" /></span>
        <p class="card-para width_full ff-pt_sans">${cardParaTwo}</p>
      </div>
      <div class="card-btn_container">
        <button class="btn-secondary card_btn" type="button">${cardBtnText}</button>
      </div>
    </div>
  `;
  cardContainer.appendChild(card);
});
  const removeCard = document.querySelectorAll(".card");
  const removeCardDesc = document.querySelectorAll(".card_description");
  const cardImgContainer = document.querySelectorAll(".card-img_container");

  if (window.innerWidth < 500) {
    removeCard[4].style.display = "block";
    cardImgContainer[4].style.height = "100%";
    removeCardDesc[4].style.display = "none";
  } else {
    removeCard[4].style.display = "none";
  }
}
displayCardData();
window.addEventListener("resize", displayCardData);

function displayBurgerMenu() {
  headerBtnsText.map((item) => {
    const headerBtnsContainer = document.createElement("div");
    navBar.classList.add("hidden");
    headerBtnsContainer.innerHTML = `
        <button type="button" class="btn-primary nav_button ff-pt_sans">${item}</button>
      `;
    navBar.appendChild(headerBtnsContainer);
  });

  const navBtns = document.querySelectorAll(".nav_button");
  navBtns[0].style.background = "var(--bg-secondary-clr)";
  navBtns[4].style.outline = "3px solid var(--bg-secondary-clr)";

  const navCloseBtnContainer = document.createElement("div");
  navCloseBtnContainer.classList.add("navbar-closebtn_container", "flex");
  navCloseBtnContainer.innerHTML = `<button class="nav-close_btn ff-pt_sans bg_white" >INCHIDE</button>`;
  navBar.appendChild(navCloseBtnContainer);

  burgerMenu.addEventListener("click", () => {
    overLay.classList.remove("hidden");
    navBar.classList.remove("hidden");
    navBar.style.width = "70vw";
    navBar.style.padding = "3rem 2rem 0 2rem";
  });

  const closeBtn = document.querySelector(".nav-close_btn");
  closeBtn.addEventListener("click", () => {
    navBar.classList.add("hidden");
    overLay.classList.add("hidden");
  });
}
displayBurgerMenu();

function displayFooter() {
  const footerLinksOne = document.querySelector(".footer-links_one");
  const footerLinksTwo = document.querySelector(".footer-links_two");

  [...footerData].slice(0, 6).map((item) => {
    const footerDataOne = document.createElement("div");
    footerDataOne.innerHTML = `
        <p class="footer-links_one">${item}</p>
      `;
    footerLinksOne.appendChild(footerDataOne);
  });
  [...footerData].slice(6, footerData.length).map((item) => {
    const footerDataTwo = document.createElement("div");
    footerDataTwo.innerHTML = `
        <p class="footer-links_two">${item}</p>
      `;
    footerLinksTwo.appendChild(footerDataTwo);
  });
}
displayFooter();

let switchView = 0;

function viewBtnsHandler() {
  switchView = switchView === 0 ? 1 : 0;

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // prettier-ignore
      if (btn.classList.contains("active") && btn.classList.contains("view-btn_burger")) {
        btn.classList.remove("active");

        // prettier-ignore
      } else if (btn.classList.contains("active") && btn.classList.contains("view-btn_cube")) {
        btn.classList.remove("active");

        // prettier-ignore
      } else if (btn.classList.contains("active") && btn.classList.contains("view-btn_rubic")) {
        btn.classList.remove("active");
      } else {
        btn.classList.add("active");
      }
    });
  });
}
viewBtnsHandler();
