document.addEventListener("DOMContentLoaded", function () {
  let citySelector = document.getElementById("citySelector");
  let clocksContainer = document.getElementById("clocks");

  citySelector.addEventListener("change", function () {
    let selectedCity = this.value;

    if (selectedCity) {
      removeAllClocks();
      setClock(selectedCity);
    }
  });

  setInitialClocks();
  setInterval(updateClocks, 1000);
});

function setInitialClocks() {
  setClock("Australia/Perth", "Perth");
  setClock("Europe/London", "Brighton");
}

function setClock(timezone, cityName) {
  let cityElement = document.createElement("div");
  cityElement.classList.add("city");

  let cityNameElement = document.createElement("h2");
  cityNameElement.textContent = cityName;

  let cityTimeElement = document.createElement("div");
  cityTimeElement.classList.add("time");

  let cityDateElement = document.createElement("div");
  cityDateElement.classList.add("date");

  cityElement.appendChild(cityNameElement);
  cityElement.appendChild(cityTimeElement);
  cityElement.appendChild(cityDateElement);

  document.getElementById("clocks").appendChild(cityElement);
  updateCityClock(cityElement, timezone); // Update clock immediately after adding
}

function removeAllClocks() {
  let container = document.getElementById("clocks");
  container.innerHTML = ""; // Clear all clock elements
}

function updateClocks() {
  let cities = document.querySelectorAll(".city");
  cities.forEach((city) => {
    let timezone = getTimezone(city.querySelector("h2").textContent);
    updateCityClock(city, timezone);
  });
}

function updateCityClock(cityElement, timezone) {
  let now = moment().tz(timezone);
  let timeElement = cityElement.querySelector(".time");
  let dateElement = cityElement.querySelector(".date");

  timeElement.textContent = now.format("h:mm:ss A");
  dateElement.textContent = now.format("MMMM Do YYYY");
}

function getTimezone(cityName) {
  const timezoneMap = {
    Perth: "Australia/Perth",
    Brighton: "Europe/London",
  };

  return timezoneMap[cityName];
}
