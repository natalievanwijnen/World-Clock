document.addEventListener("DOMContentLoaded", function () {
  let citySelector = document.getElementById("citySelector");
  let clocksContainer = document.getElementById("clocks");

  citySelector.addEventListener("change", handleCitySelection);

  let initialCities = [
    { timezone: "Australia/Perth", cityName: "Perth" },
    { timezone: "Europe/London", cityName: "Brighton" },
    { timezone: "America/Toronto", cityName: "Toronto" },
  ];

  initialCities.forEach(({ timezone, cityName }) =>
    setClock(timezone, cityName)
  );

  updateClocks();
  setInterval(updateClocks, 1000);

  function handleCitySelection() {
    let selectedCity = citySelector.value;
    let cityName =
      selectedCity === "auto"
        ? "certainly not Tattooine"
        : getTimezoneCityName(selectedCity);
    if (selectedCity) {
      removeAllClocks();
      setClock(selectedCity, cityName);
    }
  }

  function setClock(timezone, cityName) {
    let cityElement = createClockElement(cityName);
    clocksContainer.appendChild(cityElement);
    let intervalId = setInterval(
      () => updateCityClock(cityElement, timezone),
      1000
    );
    updateCityClock(cityElement, timezone);
    return intervalId;
  }

  function createClockElement(cityName) {
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

    return cityElement;
  }

  function removeAllClocks() {
    while (clocksContainer.firstChild) {
      clocksContainer.removeChild(clocksContainer.firstChild);
    }
  }

  function updateClocks() {
    document.querySelectorAll(".city").forEach((city) => {
      let timezone = getTimezone(city.querySelector("h2").textContent);
      updateCityClock(city, timezone);
    });
  }
});

function updateCityClock(cityElement, timezone) {
  let now = moment().tz(timezone);
  let timeElement = cityElement.querySelector(".time");
  let dateElement = cityElement.querySelector(".date");

  timeElement.textContent = now.format("h:mm:ss A");
  dateElement.textContent = now.format("MMMM Do YYYY");
}

function getTimezoneCityName(timezone) {
  return timezone.split("/")[1].replace(/_/g, " ");
}
