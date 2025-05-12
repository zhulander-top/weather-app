/* eslint-disable no-use-before-define */
document.getElementById('weatherForm').addEventListener('submit', async (event) => {
  event.preventDefault(); 
  const location = document.getElementById('location').value;
  const apiKey = 'LVB9K2BDGRSC57599Z65ZTK7K';
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=${apiKey}`;

  try {
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    const processed = processWeatherData(weatherData);
    document.getElementById('output').textContent = JSON.stringify(processed, null, 2);
  } catch (error) {
    document.getElementById('output').textContent = `Error fetching weather data: ${  error.message}`;
  }
});
function processWeatherData(data) {
  if (!data || !data.days || data.days.length === 0) return null;

  const today = data.days[0];

  return {
    location: data.resolvedAddress || "Unknown location",
    date: today.datetime,
    temperature: {
      min: today.tempmin,
      max: today.tempmax,
      current: today.temp
    },
    conditions: today.conditions,
    description: today.description,
    icon: today.icon
  };
}
