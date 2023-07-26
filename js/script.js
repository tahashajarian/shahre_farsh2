// form codes

// this is for convert persian number to english number
const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

// validate phone number
const inputPhone = document.querySelector("#phoneInput");
if (inputPhone) {
  inputPhone.addEventListener("keypress", function (evt) {
    const isPresion = evt.which >= 1776 && evt.which < 1786;
    if (evt.which < 48 || (evt.which > 57 && !isPresion)) {
      evt.preventDefault();
    } else {
    }
  });
  var phone = document.getElementById("phoneInput"),
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

// submitForm index.htnl

const nameInput = document.querySelector("#nameInput");
const phoneInput = document.querySelector("#phoneInput");
const nameValidateError = document.querySelector("#nameValidateError");
const phoneValidateError = document.querySelector("#phoneValidateError");
const removeError = (element) => {
  if (element) element.style.visibility = "hidden";
};
if (nameInput) {
  nameInput.onkeydown = () => {
    removeError(nameValidateError);
  };
  nameInput.onchange = () => {
    removeError(nameValidateError);
  };
  nameInput.oninput = () => {
    removeError(nameValidateError);
  };
  nameInput.onpaste = () => {
    removeError(nameValidateError);
  };
}
if (phoneInput) {
  phoneInput.onkeydown = () => {
    removeError(phoneValidateError);
  };
  phoneInput.onchange = () => {
    removeError(phoneValidateError);
  };
  phoneInput.oninput = () => {
    removeError(phoneValidateError);
  };
  phoneInput.onpaste = () => {
    removeError(phoneValidateError);
  };
}

const submitForm = (e) => {
  e.preventDefault();
  inputPhone.value = p2e(inputPhone.value); // this line convert persian number to english number
  const submitButton = document.querySelector("#submitButton");
  const nameValue = nameInput.value;
  const phoneValue = phoneInput.value;
  if (!/^[آ-ی ]+$/.test(nameValue)) {
    nameValidateError.innerHTML = "نام خود را به فارسی بنویسید";
    return (nameValidateError.style.visibility = "visible");
  }
  if (nameValue.length < 4 || nameValue.length > 50) {
    nameValidateError.innerHTML = "نام حداقل سه کاراکتر باید باشد";
    return (nameValidateError.style.visibility = "visible");
  }
  const phoneNumber = phoneInput.value;

  if (phoneNumber.substring(0, 2) != "09" || phoneNumber.length != 11) {
    return (phoneValidateError.style.visibility = "visible");
  }
  if (nameValue && phoneValue) {
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "inline-block";
    submitButton.disabled = true;
    // TODO:
    postData("put server address here", {
      name: nameValue,
      phone: phoneValue,
    }).then((data) => {
      if (true) {
        const successMessage = document.querySelector("#successMessage");
        successMessage.style.visibility = "visible";
        spinner.style.display = "none";
      }
    });
  }
};

// addUserTolottery

const addTolotteryButton = document.querySelector("#addTolotteryButton");
if (addTolotteryButton) {
  addTolotteryButton.onclick = () => {
    const successMessage = document.querySelector("#successMessage");
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "inline-block";
    addTolotteryButton.disabled = true;
    postData("put server address here", {}).then((data) => {
      if (true) {
        console.log("hey clicked successfuly", successMessage);
        successMessage.style.display = "flex";
        spinner.style.display = "none";
      }
    });
  };
}

// post function
// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
// sliders codes
let horizenScroll = document.querySelector(".horizenScroll");
let isDown = false;
let startX;
let scrollLeft;

const arrow1 = document.querySelector("#horizenScrollArrow");
arrow1.onclick = function () {
  // const left = document.querySelector(".scroll-images");
  horizenScroll.scrollBy(-200, 0);
};

const arrowRight1 = document.querySelector("#horizenScrollArrowRight");
arrowRight1.onclick = function () {
  // const left = document.querySelector(".scroll-images");
  horizenScroll.scrollBy(200, 0);
};

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

const arrow2 = document.querySelector("#horizenScrollArrow2");
arrow2.onclick = function () {
  // const left = document.querySelector(".scroll-images");
  slider2.scrollBy(-200, 0);
};

const arrowRight2 = document.querySelector("#horizenScrollArrow2Right");
arrowRight2.onclick = function () {
  // const left = document.querySelector(".scroll-images");
  slider2.scrollBy(200, 0);
};

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

const verticalScrollAble = document.querySelector(".verticalScrollable");
const vertivalArrowUp = document.querySelector("#scrollArrowUp");
vertivalArrowUp.onclick = function () {
  verticalScrollAble.scrollBy(0, -200);
};
const vertivalArrowDown = document.querySelector("#scrollArrowDown");
vertivalArrowDown.onclick = function () {
  verticalScrollAble.scrollBy(0, 200);
};

verticalScrollAble.onscroll = (e) => {
  const scrolltop = verticalScrollAble.scrollTop;
  if (scrolltop === 0) {
    vertivalArrowUp.style.opacity = 0.2;
  } else {
    vertivalArrowUp.style.opacity = 1;
  }

  if (
    scrolltop + 40 + verticalScrollAble.clientHeight >=
    verticalScrollAble.scrollHeight
  ) {
    vertivalArrowDown.style.opacity = 0.2;
  } else {
    vertivalArrowDown.style.opacity = 1;
  }
};

horizenScroll.onscroll = (e) => {
  if (
    horizenScroll.clientWidth - horizenScroll.scrollWidth ===
    horizenScroll.scrollLeft
  ) {
    arrow1.style.opacity = 0.2;
  } else {
    arrow1.style.opacity = 1;
  }
  if (horizenScroll.scrollLeft === 0) {
    arrowRight1.style.opacity = 0.2;
  } else {
    arrowRight1.style.opacity = 1;
  }
};

slider2.onscroll = (e) => {
  if (slider2.clientWidth - slider2.scrollWidth === slider2.scrollLeft) {
    arrow2.style.opacity = 0.2;
  } else {
    arrow2.style.opacity = 1;
  }
  if (slider2.scrollLeft === 0) {
    arrowRight2.style.opacity = 0.2;
  } else {
    arrowRight2.style.opacity = 1;
  }
};
