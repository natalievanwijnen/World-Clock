document.addEventListener("DOMContentLoaded", function () {
  let citySelect = document.querySelector("#citySelector");
  let perthClockContainer = document.querySelector("#perth-clock-container");
  let brightonClockContainer = document.querySelector(
    "#brighton-clock-container"
  );

  function initializeClock(city, timezone, clockContainer) {
    updateClock(city, timezone, clockContainer);
    startClockInterval(city, timezone, clockContainer);
  }

  function updateClock(city, timezone, clockContainer) {
    let currentTime = moment().tz(timezone);

    updateElement(clockContainer, ".am-pm", currentTime.format("A"));
    updateElement(clockContainer, ".date", currentTime.format("MMMM Do YYYY"));

    let cityElement = clockContainer.querySelector(".city");
    cityElement.innerHTML = city;

    ["hours", "minutes", "seconds"].forEach((unit) => {
      updateDigit(
        clockContainer,
        `#${city.toLowerCase()}-${unit}-tens`,
        `#${city.toLowerCase()}-${unit}-units`,
        currentTime.format(
          unit === "hours" ? "h" : unit === "minutes" ? "mm" : "ss"
        )
      );
    });
  }

  function updateElement(clockContainer, selector, value) {
    clockContainer.querySelector(selector).innerHTML = value;
  }

  function updateDigit(clockContainer, tensSelector, unitsSelector, value) {
    let [tens, units] = value.toString().padStart(2, "0").split("");

    updateElement(clockContainer, tensSelector, tens);
    updateElement(clockContainer, unitsSelector, units);
  }

  function startClockInterval(city, timezone, clockContainer) {
    setInterval(() => updateClock(city, timezone, clockContainer), 1000);
  }

  function updateCity() {
    let selectedOption = citySelect.options[citySelect.selectedIndex];
    if (selectedOption === "current") {
      cityTimezone = moment.tz.guess();
    }

    if (selectedOption && !selectedOption.disabled) {
      let cityTimezone = selectedOption.getAttribute("data-timezone");
      let selectedCity = selectedOption.text;

      let clockContainer;
      if (selectedCity === "Perth") {
        clockContainer = perthClockContainer;
      } else if (selectedCity === "Brighton") {
        clockContainer = brightonClockContainer;
      }

      clearInterval(clockContainer.clockInterval);
      initializeClock(selectedCity, cityTimezone, clockContainer);
    }
  }

  citySelect.addEventListener("change", updateCity);

  // Perth
  let defaultCityTimezone = "Australia/Perth";
  let defaultCity = "Perth";

  perthClockContainer.querySelector(".city").innerHTML = defaultCity;
  initializeClock(defaultCity, defaultCityTimezone, perthClockContainer);

  // Brighton
  let brightonDefaultCityTimezone = "Europe/London";
  let brightonDefaultCity = "Brighton";

  brightonClockContainer.querySelector(".city").innerHTML = brightonDefaultCity;
  initializeClock(
    brightonDefaultCity,
    brightonDefaultCityTimezone,
    brightonClockContainer
  );
});
