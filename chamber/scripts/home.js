// ====== HOME.JS ======

document.addEventListener("DOMContentLoaded", () => {
  const weatherContainer = document.getElementById("weather-container");

  // ---- Fix: Stop script if container is missing ----
  if (!weatherContainer) {
    console.error("ERROR: #weather-container not found in HTML.");
    return; // prevents ALL errors
  }

  const city = "Port Harcourt,NG";
  const apiKey = "197cbafa8393ce5d77f247fd0fe743ce";

  async function fetchWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.list || data.list.length === 0) {
        throw new Error("No weather data available");
      }

      const current = data.list[0];

      let html = `
        <p><strong>Temperature:</strong> ${current.main.temp}°C</p>
        <p><strong>Conditions:</strong> ${current.weather[0].description}</p>
        <h3>3-Day Forecast</h3>
        <ul class="forecast-list">
      `;

      for (let i = 8; i <= 24; i += 8) {
        const day = data.list[i];
        if (!day) continue;

        const date = new Date(day.dt_txt).toLocaleDateString(undefined, {
          weekday: "long",
        });

        html += `<li><strong>${date}:</strong> ${day.main.temp}°C, ${day.weather[0].description}</li>`;
      }

      html += "</ul>";

      weatherContainer.innerHTML = html;

    } catch (error) {
      console.error("Weather fetch error:", error);

      // Safe fallback
      weatherContainer.innerHTML = `
        <h3>Weather Unavailable</h3>
        <p>Unable to load live data. Showing placeholder:</p>
        <ul class="forecast-list">
          <li><strong>Monday:</strong> 30°C, Clear sky</li>
          <li><strong>Tuesday:</strong> 29°C, Partly cloudy</li>
          <li><strong>Wednesday:</strong> 28°C, Light rain</li>
        </ul>
      `;
    }
  }

  fetchWeather();
});
