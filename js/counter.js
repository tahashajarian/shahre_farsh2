function secondsToDhms(timeleft) {
  timeleft = Number(timeleft);
  const day = Math.floor(timeleft / (3600 * 24));
  const hour = Math.floor((timeleft % (3600 * 24)) / 3600);
  const minute = Math.floor((timeleft % 3600) / 60);
  const seconds = Math.floor(timeleft % 60);
  return { day, hour, minute, seconds };
}

function convertToNumberIcon(number) {
  if (number < 10) {
    return `<span class="flipAnimate number number0"></span><span class="flipAnimate number number${number}"></span>`;
  } else {
    return `<span class="flipAnimate number number${Math.floor(
      number / 10
    )}"></span><span class="flipAnimate number number${Math.floor(
      number % 10
    )}"></span>`;
  }
}

const assignClass = (firstElement, secondElement, number) => {
  firstElement.classList.remove("flipAnimate");
  secondElement.classList.remove("flipAnimate");

  const firstNumber = Math.floor(number / 10);
  const secondNumber = Math.floor(number % 10);

  const firstElementInnerText = firstElement.innerText;
  const secondElementInnerText = secondElement.innerText;

  const firstElementClassAfter = `number number${firstNumber}`;
  const secondElementClassAfter = `number number${secondNumber}`;

  if (firstElementClassAfter.includes(firstElementInnerText)) {
    firstElement.className = firstElementClassAfter;
  } else {
    firstElement.className = firstElementClassAfter + " flipAnimate";
  }

  if (secondElementClassAfter.includes(secondElementInnerText)) {
    secondElement.className = secondElementClassAfter;
  } else {
    secondElement.className = secondElementClassAfter + " flipAnimate";
  }
  firstElement.innerText = Math.floor(number / 10);
  secondElement.innerText = Math.floor(number % 10);
};

const startCounter = async () => {
  // let timeLeft = await getTimeLeft(); // secondsSSS
  const countDownDate = new Date("Aug 8, 2023 02:00:00").getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;
  let timeLeft = distance / 1000;
  // let timeLeft = 1342514; // seconds

  const counterDiv = document.querySelector("#counter");
  const dayFirst = document.querySelector("#dayFirst");
  const daySecond = document.querySelector("#daySecond");
  const hourFirst = document.querySelector("#hourFirst");
  const hourSecond = document.querySelector("#hourSecond");
  const minuteFirst = document.querySelector("#minuteFirst");
  const minutSecond = document.querySelector("#minutSecond");
  const secondFirst = document.querySelector("#secondFirst");
  const secondSecond = document.querySelector("#secondSecond");
  if (counterDiv) {
    setInterval(() => {
      const { day, hour, minute, seconds } = secondsToDhms(timeLeft);
      assignClass(dayFirst, daySecond, day);
      assignClass(hourFirst, hourSecond, hour);
      assignClass(minuteFirst, minutSecond, minute);
      assignClass(secondFirst, secondSecond, seconds);
      timeLeft = timeLeft - 1;
    }, 1000);
  }
};

window.onload = () => {
  startCounter();
  getUserData();
};

// user data
const getUserInfoAPI =
  "http://5.160.190.58:65501/Contacts/ContactInformations?";
const addUserTolotteryAPI = "http://5.160.190.58:65501/Contacts/ChangeToWarm?";
const urlObj = new URL(window.location);
const cell = urlObj.searchParams.get("cell");
let firstName = "";
const elementNameHolder = document.querySelector("#userInfoName");
const getUserData = () => {
  const personCategoryId = "ab5b0845-595d-4fef-bd6d-ff11829c611d";
  const token = "Absdf6913435640fc3472413600rb18d4sd1";
  fetch(
    getUserInfoAPI +
      new URLSearchParams({
        cell,
        token,
        personCategoryId,
      }),
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "text/plain; charset=utf-8",
      },
      // mode: "no-cors",
    }
  )
    .then((response) => response.text())
    .then((response) => {
      console.log(response);
      const result = response.data || response.body || response;
      const resultArr = result.split(",");
      const nameProperty = resultArr[0];
      firstName = nameProperty.split(":")[1];
      elementNameHolder.innerText = firstName;
    })

    .catch((error) => {
      console.log(error);
      const templateResult = "firstName:مصطفی,lastName:خالی,cell:09356081903";
      const resultArr = templateResult.split(",");
      const nameProperty = resultArr[0];
      firstName = nameProperty.split(":")[1];
      elementNameHolder.innerText = firstName;
    });
};

async function getTimeLeft() {
  // TODO: put address server to get time left here
  // time shuold be in seconds

  const response = await fetch("put server address here");
  const timeLeft = await response.json();
  return timeLeft;
}

const addTolotteryButton = document.querySelector("#addTolotteryButton");
if (addTolotteryButton) {
  addTolotteryButton.onclick = () => {
    const successMessage = document.querySelector("#successMessage");
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "inline-block";
    addTolotteryButton.disabled = true;
    const personCategoryId = "ab5b0845-595d-4fef-bd6d-ff11829c611d";
    const token = "Absdf6913435640fc3472413600rb18d4sd1";
    fetch(
      addUserTolotteryAPI +
        new URLSearchParams({
          cell,
          token,
          personCategoryId,
        }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "text/plain; charset=utf-8",
        },
        mode: "no-cors",
      }
    )
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        successMessage.style.display = "flex";
        spinner.style.display = "none";
      })

      .catch((error) => {
        console.log(error);
        spinner.style.display = "none";
      });
  };
}
