/* eslint-disable no-use-before-define */
import './styles.css';

document.getElementById('weatherForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = document.getElementById('location').value;
  const apiKey = 'LVB9K2BDGRSC57599Z65ZTK7K';
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=${apiKey}`;

  try {
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    const processed = processWeatherData(weatherData);
    displayWeather(processed, weatherData.resolvedAddress || location);
  } catch (error) {
    document.getElementById('output').innerHTML = `<p class="error">Error fetching weather data: ${error.message}</p>`;
  }
});

function processWeatherData(data) {
  if (!data || !data.days || data.days.length === 0) return [];

  return data.days.slice(0, 7).map(day => ({
    date: day.datetime,
    minTemp: day.tempmin,
    maxTemp: day.tempmax,
    condition: day.conditions,
    description: day.description,
    icon: day.icon
  }));
}

function displayWeather(forecast, locationName) {
  const output = document.getElementById('output');
  output.innerHTML = ''; 
  
  const locationHead = document.createElement('h1');
  locationHead.textContent = `${locationName}`;
  output.appendChild(locationHead);
  const cardGrid = document.createElement('div');
  cardGrid.className = "cardGrid";
  forecast.forEach(day => {
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.innerHTML = `
      <h3>${day.date}</h3>
      <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th Set - Color/${day.icon}.png" alt="${day.condition}" class="icon">
      <p><strong>${day.condition}</strong></p>
      <p>${day.description}</p>
      <p>🌡️ High: ${day.maxTemp}°F</p>
      <p>🌡️ Low: ${day.minTemp}°F</p>
    `;
    cardGrid.appendChild(card);
  });
  output.appendChild(cardGrid);
}
