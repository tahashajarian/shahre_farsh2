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
  let timeLeft = 1342514; // seconds

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

window.onload = startCounter();

async function getTimeLeft() {
  // TODO: put address server to get time left here
  // time shuold be in seconds

  const response = await fetch("put server address here");
  const timeLeft = await response.json();
  return timeLeft;
}
