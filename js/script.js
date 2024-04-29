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
let camDiv = document.querySelector(".cam-div-inner");

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

document.getElementById("cam-btn").addEventListener("click", () => {
  camDiv.classList.add("is-visible");
});
document.getElementById("closeBtn").addEventListener("click", () => {
  camDiv.classList.remove("is-visible");
});

let capDisplay = document.getElementById("cam-display");
let capInput = document.getElementById("file-upload");
capInput.addEventListener("change", function () {
  capDisplay.style.visibility = "visible";
  capDisplay.src = URL.createObjectURL(capInput.files[0]);
});

  function startRealTimeClock() {
    setInterval(function() {
      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      document.getElementById('curr-time').innerHTML = strTime;
    }, 1000);
  }
  
  // Call this function when your page loads or when you want to start the clock
  startRealTimeClock();
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
