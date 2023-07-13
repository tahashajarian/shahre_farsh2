//
const inputPhone = document.querySelector("#numberonly");
if (inputPhone) {
  inputPhone.addEventListener("keypress", function (evt) {
    console.log(evt.which);
    const isPresion = evt.which > 1776 && evt.which < 1786;
    if (evt.which < 48 || (evt.which > 57 && !isPresion)) {
      evt.preventDefault();
    }
  });
  var phone = document.getElementById("numberonly"),
    cleanPhoneNumber;

  cleanPhoneNumber = function (e) {
    e.preventDefault();
    var pastedText = "";
    if (window.clipboardData && window.clipboardData.getData) {
      // IE
      pastedText = window.clipboardData.getData("Text");
    } else if (e.clipboardData && e.clipboardData.getData) {
      pastedText = e.clipboardData.getData("text/plain");
    }
    this.value = pastedText.replace(/\D/g, "");
  };
  phone.onpaste = cleanPhoneNumber;
}

let horizenScroll = document.querySelector(".horizenScroll");
let isDown = false;
let startX;
let scrollLeft;

const links = document.querySelectorAll(".card");
links.forEach((element) => {
  element.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });
});
horizenScroll.addEventListener("mousedown", (e) => {
  isDown = true;
  horizenScroll.classList.add("active");
  startX = e.pageX - horizenScroll.offsetLeft;
  scrollLeft = horizenScroll.scrollLeft;
});
horizenScroll.addEventListener("mouseleave", () => {
  isDown = false;
  horizenScroll.classList.remove("active");
});
horizenScroll.addEventListener("mouseup", () => {
  isDown = false;
  horizenScroll.classList.remove("active");
});

horizenScroll.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - horizenScroll.offsetLeft;
  const walk = (x - startX) * 1; //scroll-fast
  horizenScroll.scrollLeft = scrollLeft - walk;
});


let slider2 = document.querySelector(".products_scroll");
let isDown2 = false;
let startX2;
let scrollLeft2;

const links2 = document.querySelectorAll(".product");
links2.forEach((element) => {
  element.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });
});
slider2.addEventListener("mousedown", (e) => {
  isDown2 = true;
  slider2.classList.add("active");
  startX2 = e.pageX - slider2.offsetLeft;
  scrollLeft2 = slider2.scrollLeft;
});
slider2.addEventListener("mouseleave", () => {
  isDown2 = false;
  slider2.classList.remove("active");
});
slider2.addEventListener("mouseup", () => {
  isDown2 = false;
  slider2.classList.remove("active");
});

slider2.addEventListener("mousemove", (e) => {
  if (!isDown2) return;
  e.preventDefault();
  const x = e.pageX - slider2.offsetLeft;
  const walk = (x - startX2) * 1; //scroll-fast
  slider2.scrollLeft = scrollLeft2 - walk;
});