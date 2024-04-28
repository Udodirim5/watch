let inputs = document.querySelectorAll('input[name="slider"]');
let btnWheel = document.querySelectorAll(".number");
let standby = document.getElementById("standby");
let content = document.querySelector(".content");
let wheel = document.getElementById("wheel");
let blank = document.querySelector(".blank");
let time = document.querySelector(".time");
let on = document.querySelector(".on");
let isOn = false;

let s1 = document.getElementById("s1");
let s2 = document.getElementById("s2");
let s3 = document.getElementById("s3");
let s4 = document.getElementById("s4");
let s5 = document.getElementById("s1");

standby.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isOn) {
    setTimeout(() => {
      blank.style.zIndex = "-100";
      on.classList.add("is-on");
      isOn = true;
    }, 1000);
  } else {
    blank.style.zIndex = "0";
    on.classList.remove("is-on");
    isOn = false;
    window.location.reload();
  }

  setTimeout(() => {
    document.querySelector(".welcome").style.display = "none";
    document.querySelector("main").style.display = "block";
  }, 6000);
});

btnWheel.forEach((number, index) => {
  number.addEventListener("click", () => {
    number.classList.add("glow");

    btnWheel.forEach((otherNumber) => {
      if (otherNumber !== number) {
        otherNumber.classList.remove("glow");
      }
    });

    let clickedIndex = Array.from(btnWheel).indexOf(number);
    let totalNumbers = btnWheel.length;
    let rotationAngle = (360 / totalNumbers) * clickedIndex;

    wheel.style.transform = `rotate(-${rotationAngle}deg)`;

    inputs[index].checked = true;
    let event = new Event("change");
    inputs[index].dispatchEvent(event);
  });
});

inputs.forEach(function (input, index) {
  input.addEventListener("change", function () {
    btnWheel[index].click();
  });
});

/*
let interval;

function showCurrentTime() {
  setInterval(() => {
    const currentTime = new Date();
    time.style.display = "flex";
    time.textContent = currentTime.toLocaleTimeString();
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  time.style.display = "none";
  interval = setInterval(showCurrentTime, 3000);
}

content.addEventListener("mouseover", resetTimer);

resetTimer();
*/
