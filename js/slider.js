HTMLElement.prototype.hasElement = function (element) {
  const el = document.querySelector(element);
  if (this.contains(el)) {
    return true;
  }
  return false;
};
HTMLElement.prototype.getPositionXY = function () {
  return [this.getBoundingClientRect().x, this.getBoundingClientRect().y];
};
HTMLElement.prototype.iterateHTMLElement = function () {
  let myArr = [];
  this.childNodes.forEach((element) => {
    myArr.push(element);
  });
  return myArr;
};
Array.prototype.iterateArray = function () {
  let myArr = [];
  this.forEach((element) => {
    myArr.push(element);
  });
  return myArr;
};
Object.prototype.iterateObjectKey = function () {
  let myArr = [];
  Object.entries(this).forEach(([key, value]) => {
    myArr.push(key);
  });
  return myArr;
};
Object.prototype.iterateObjectValue = function () {
  let myArr = [];
  Object.entries(this).forEach(([key, value]) => {
    myArr.push(value);
  });
  return myArr;
};

const content = document.querySelector(".content");
const indicatorContainer = document.querySelector("#indicator-container");
const slider = document.querySelector(".slider");
const sliderImage = Array.from(document.querySelectorAll(".slider-image"));
// const btnChevron = document.querySelectorAll(".btn-chevron");
let i = 0;

let reset = (container, clase) => {
  container.forEach((item) => item.classList.remove(clase));
};

let createIndicators = () => {
  const container = document.createElement("div");
  container.className = "indicator";
  indicatorContainer.appendChild(container);
  sliderImage.forEach((image) => {
    let indicator = document.createElement("p");
    indicator.onclick = () => {
      i = sliderImage.indexOf(image);
      setPosition(sliderImage.indexOf(image));
    };
    indicator.textContent = "";
    container.appendChild(indicator);
  });
};

let Image = (index) => {
  const indicators = document.querySelectorAll(".indicator p");
  const sliderInfo = document.querySelector(".slider-info");
  sliderImage[index].classList.add("slider-image-active");
  reset(indicators, "indicator-active");

  indicators[i].classList.add("indicator-active");

  if (content.hasElement(".slider-info"))
    return (sliderInfo.textContent = sliderImage[index].dataset.info);
};

let setPosition = (index) => {
  reset(sliderImage, "slider-image-active");
  let width = sliderImage[index].getBoundingClientRect().width;
  slider.style.transform = `translateX(-${width * index}px)`;
  Image(index);
};

let moveImage = () => {
  if (i === sliderImage.length) {
    i = 0; // Si el contador ya llego al ultimo item, lo manda al primer item.
  } else if (i == -1) {
    i = sliderImage.length - 1; // Si llego al primero lo manda hasta el ultimo.
  }
  setPosition(i);
};

// btnChevron.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     if (btn.dataset.action == "right") {
//       i++;
//       return moveImage();
//     }
//     i--;
//     return moveImage();
//   });
// });

setInterval(() => {
  i++;
  moveImage();
}, 5000);

createIndicators();
Image(i);
