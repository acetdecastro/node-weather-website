const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=77c3b32247bfb02e2a06e6ba1dccdac5&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather services.', undefined)
    } else if (response.body.error) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, {
        weather_description: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        feels_like: response.body.current.feelslike 
      })
    }
  })
}

module.exports = forecast