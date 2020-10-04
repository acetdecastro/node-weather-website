const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const locationElement = document.querySelector('#locationElement');
const forecastElement = document.querySelector('#forecastElement');
const errorMessageElement = document.querySelector('#errorMessageElement');
const loader = document.querySelector('#loader')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  loader.style.display = 'block';
  locationElement.style.display = 'none';
  forecastElement.style.display = 'none';
  errorMessageElement.style.display = 'none';

  const address = searchElement.value;

  fetch(`/weather?address=${encodeURIComponent(address)}`)
    .then(response => response.json())
    .then(data => {

      loader.style.display = 'none';

      if (data.error) {
        errorMessageElement.style.display = 'block';
        return errorMessageElement.textContent = data.error
      }

      const { location } = data;
      const { temperature,
        feels_like: feelsLike,
        weather_description: weatherDescription 
      } = data.forecastData;

      locationElement.style.display = 'block';
      forecastElement.style.display = 'block';

      locationElement.textContent = location;
      forecastElement.textContent = `${weatherDescription}. It is ${temperature} degrees out, but it feels like ${feelsLike} degrees.`;
    })
    .catch(error => console.log('Error: ', error));
});