import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const dateTimePicker = document.querySelector("#datetime-picker");
const start = document.querySelector("[data-start]");
start.disabled = true;

const timer = document.querySelector(".timer");
timer.style.display = "flex";
timer.style.gap = "16px";

const fields = document.querySelectorAll(".field");
fields.forEach(field => {
  field.style.display = "flex";
  field.style.flexDirection = "column";
});

const values = document.querySelectorAll(".value");
values.forEach(value => {
  value.style.textAlign = "center";
  value.style.fontSize = "36px";
});

const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

const labels = document.querySelectorAll(".label");
labels.forEach(label => {
  label.style.textAlign = "center";
  label.style.textTransform = "uppercase";
  label.style.fontWeight = "500"
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notify.failure("Please choose a date in the future");
      start.disabled = true;
    } else {
      start.disabled = false;
    };
  },
};

flatpickr("#datetime-picker", options);

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  return value.toString().padStart(2, "0");
};

start.addEventListener("click", () => {
  const selectedDate = new Date(dateTimePicker.value);
  const currentDate = new Date();

  let timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    Notify.failure("Please choose a date in the future");
    return;
  };

  const timerInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);

    timeDifference -= 1000;

    dateTimePicker.disabled = true;
    start.disabled = true;

    if (timeDifference < 0) {
      clearInterval(timerInterval);
      dateTimePicker.disabled = false;
    };
  }, 1000)
});
