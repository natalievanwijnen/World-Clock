document.addEventListener("DOMContentLoaded", function () {
  let citySelect = document.querySelector("#citySelector");
  let cityElement = document.querySelector("#clock-container .city");
  let dateElement = document.querySelector(".date");
  let clockInterval;

  function initializeClock(city, timezone) {
    updateClock(city, timezone);
    startClockInterval(city, timezone);
  }

  function updateClock(city, timezone) {
    let currentTime = moment().tz(timezone);

    updateElement("#clock-container .am-pm", currentTime.format("A"));
    updateElement(".date", currentTime.format("MMMM Do YYYY"));

    cityElement.innerHTML = city;

    ["hours", "minutes", "seconds"].forEach((unit) => {
      updateDigit(
        `#city-${unit}-tens`,
        `#city-${unit}-units`,
        currentTime.format(
          unit === "hours" ? "h" : unit === "minutes" ? "mm" : "ss"
        )
      );
    });
  }

  function updateElement(selector, value) {
    document.querySelector(selector).innerHTML = value;
  }

  function updateDigit(tensSelector, unitsSelector, value) {
    let [tens, units] = value.toString().padStart(2, "0").split("");

    updateElement(tensSelector, tens);
    updateElement(unitsSelector, units);
  }

  function startClockInterval(city, timezone) {
    clockInterval = setInterval(() => updateClock(city, timezone), 1000);
  }

  function updateCity() {
    let selectedOption = citySelect.options[citySelect.selectedIndex];

    if (selectedOption && !selectedOption.disabled) {
      let cityTimezone = selectedOption.getAttribute("data-timezone");
      let selectedCity = selectedOption.text;

      cityElement.innerHTML = selectedCity;
      clearInterval(clockInterval);
      initializeClock(selectedCity, cityTimezone);
    }
  }

  citySelect.addEventListener("change", updateCity);

  let defaultCityTimezone = "Australia/Perth";
  let defaultCity = "Perth";

  cityElement.innerHTML = defaultCity;
  initializeClock(defaultCity, defaultCityTimezone);
});
