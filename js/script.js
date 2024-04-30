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
  setInterval(function () {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    document.getElementById("curr-time").innerHTML = strTime;
  }, 1000);
}

// Call this function when your page loads or when you want to start the clock
startRealTimeClock();

// Function to create calendar
function createCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  const currentDate = new Date();
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayIndex = new Date(year, month - 1, 1).getDay();
  const lastDayIndex = new Date(year, month - 1, daysInMonth).getDay();
  const prevMonthDays = new Date(year, month - 1, 0).getDate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[month - 1];
  const prevMonthName = months[month - 2];

  let days = "";

  // Add previous month's days
  for (let i = firstDayIndex; i > 0; i--) {
    days += `<td class="prev-month">${prevMonthDays - i + 1}</td>`;
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    if (i === today && month === currentMonth && year === currentYear) {
      days += `<td class="current-day">${i}</td>`;
    } else {
      days += `<td>${i}</td>`;
    }
    if ((i + firstDayIndex) % 7 === 0) {
      days += `</tr><tr>`;
    }
  }

  // Add next month's days
  const remainingDays = 7 - (lastDayIndex + 1);
  for (let i = 1; i <= remainingDays; i++) {
    days += `<td class="next-month">${i}</td>`;
  }

  const calendarHTML = `
        <h2>${monthName} ${year}</h2>
        <button id="hide-cal">x</button>
        <table>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
          <tr>
            ${days}
          </tr>
        </table>
      `;

  calendar.innerHTML = calendarHTML;
}

// Display current month's calendar on page load
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
createCalendar(currentYear, currentMonth);

// Function to display previous month's calendar
function prevMonth() {
  const currentYear = parseInt(
    document.querySelector("h2").textContent.split(" ")[1]
  );
  const currentMonth = document.querySelector("h2").textContent.split(" ")[0];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const prevMonthIndex = months.indexOf(currentMonth) - 1;
  const prevMonthName = months[prevMonthIndex];
  const prevYear = prevMonthIndex === 11 ? currentYear - 1 : currentYear;
  createCalendar(prevYear, prevMonthIndex + 1);
}

// Function to display next month's calendar
function nextMonth() {
  const currentYear = parseInt(
    document.querySelector("h2").textContent.split(" ")[1]
  );
  const currentMonth = document.querySelector("h2").textContent.split(" ")[0];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const nextMonthIndex = months.indexOf(currentMonth) + 1;
  const nextMonthName = months[nextMonthIndex];
  const nextYear = nextMonthIndex === 0 ? currentYear + 1 : currentYear;
  createCalendar(nextYear, nextMonthIndex + 1);
}

let calendarShow = document.getElementById("show-cal");
calendarShow.addEventListener("click", () => {
  document.querySelector(".calendar-wrapper").classList.add("cal-is-visible");
});

let hideCal = document.getElementById("hide-cal");
hideCal.addEventListener("click", () => {
  document.querySelector(".calendar-wrapper").classList.remove("cal-is-visible");
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
