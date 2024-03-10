let citySelect = document.querySelector("#citySelector");
let perthClockContainer = document.querySelector("#perth-clock-container");
let brightonClockContainer = document.querySelector(
  "#brighton-clock-container"
);
let newClockContainerTemplate = document.querySelector("#new-clock-container");

let clockContainers = [perthClockContainer, brightonClockContainer];

function initializeClock(city, timezone, clockContainer) {
  updateClock(city, timezone, clockContainer);
  startClockInterval(city, timezone, clockContainer);
}

function createNewClock(city, timezone) {
  if (clockContainers.length >= 2) {
    let oldestClock = clockContainers.shift();
    clearInterval(oldestClock.clockInterval);
    oldestClock.parentNode.removeChild(oldestClock);
  }

  let newClockContainer = newClockContainerTemplate.cloneNode(true);
  newClockContainer.removeAttribute("style");

  document.querySelector(".container").appendChild(newClockContainer);
  let addedClockContainer = document.querySelector(
    ".container .clock-container:last-child"
  );
  clockContainers.push(addedClockContainer);

  addedClockContainer.clockInterval = null;

  let newClockCityElement = addedClockContainer.querySelector(".city");
  newClockCityElement.innerHTML = city;

  initializeClock(city, timezone, addedClockContainer);

  return addedClockContainer;
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
      `#${
        city.toLowerCase() === "new" ? "new" : city.toLowerCase()
      }-${unit}-tens`,
      `#${
        city.toLowerCase() === "new" ? "new" : city.toLowerCase()
      }-${unit}-units`,
      currentTime.format(
        unit === "hours" ? "h" : unit === "minutes" ? "mm" : "ss"
      )
    );
  });
}

function updateElement(clockContainer, selector, value) {
  let element = clockContainer.querySelector(selector);
  if (element) {
    element.innerHTML = value;
  }
}

function updateDigit(clockContainer, tensSelector, unitsSelector, value) {
  let [tens, units] = value.toString().padStart(2, "0").split("");

  updateElement(clockContainer, tensSelector, tens);
  updateElement(clockContainer, unitsSelector, units);
}

function startClockInterval(city, timezone, clockContainer) {
  if (clockContainer.clockInterval) {
    clearInterval(clockContainer.clockInterval);
  }

  clockContainer.clockInterval = setInterval(
    () => updateClock(city, timezone, clockContainer),
    1000
  );
}

function updateCity() {
  let selectedOption = citySelect.options[citySelect.selectedIndex];

  let cityTimezone;
  if (selectedOption.value === "current") {
    cityTimezone = moment.tz.guess();
  } else if (selectedOption && !selectedOption.disabled) {
    cityTimezone = selectedOption.getAttribute("data-timezone");
    let selectedCity = selectedOption.text;

    let clockContainer;
    if (selectedCity === "Perth") {
      clockContainer = perthClockContainer;
    } else if (selectedCity === "Brighton") {
      clockContainer = brightonClockContainer;
    } else {
      clockContainer = createNewClock(selectedCity, cityTimezone);
    }

    initializeClock(selectedCity, cityTimezone, clockContainer);
  }
}

citySelect.addEventListener("change", updateCity);

let defaultCityTimezone = "Australia/Perth";
let defaultCity = "Perth";

perthClockContainer.querySelector(".city").innerHTML = defaultCity;
initializeClock(defaultCity, defaultCityTimezone, perthClockContainer);

let brightonDefaultCityTimezone = "Europe/London";
let brightonDefaultCity = "Brighton";

brightonClockContainer.querySelector(".city").innerHTML = brightonDefaultCity;
initializeClock(
  brightonDefaultCity,
  brightonDefaultCityTimezone,
  brightonClockContainer
);
