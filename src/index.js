function worldClock(city, timezone) {
  let cityElement = document.querySelector("#clock-container .city");
  let amPmElement = document.querySelector("#clock-container .am-pm");
  let dateElement = document.querySelector(".date");

  cityElement.innerHTML = city;

  let currentTime = moment().tz(timezone);

  updateClock(currentTime.format("HH"), "city-hours");
  updateClock(currentTime.format("mm"), "city-minutes");
  updateClock(currentTime.format("ss"), "city-seconds");

  updateAmPm(currentTime.format("A"));

  dateElement.innerHTML = currentTime.format("MMMM Do YYYY");
}

function updateClock(value, flipId) {
  let tens = document.querySelector(`#${flipId}-tens`);
  let units = document.querySelector(`#${flipId}-units`);

  tens.innerHTML = value[0];
  units.innerHTML = value[1];
}

function updateAmPm(amPmValue) {
  let amPmElement = document.querySelector("#clock-container .am-pm");
  amPmElement.innerHTML = amPmValue;
}

worldClock("Perth", "Australia/Perth");

setInterval(function () {
  worldClock("Perth", "Australia/Perth");
}, 1000);
