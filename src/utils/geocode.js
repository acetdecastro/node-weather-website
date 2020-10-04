const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWNldGRlY2FzdHJvIiwiYSI6ImNrZnRzdzd3aTBtaTgyd202MmEyeHZ3cXYifQ.JswUF-Z_IhJka_XAfVkpaQ&limit=1`

  request({ url, json: true}, (error, response) => {  
    if (error) {
      callback('Unable to connect to location services.', undefined)
    } else if (response.body.features.length === 0) {
      callback('No matches found. Try a different search term.', undefined)
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1]
      })
    }
  })
}

module.exports = geocode