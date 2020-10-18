const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=43bdbb20f210e16ffadc9fdff1e64fb1&query=${latitude},${longitude}&units=f`
  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const { current } = body
      callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.
        The humidity is ${current.humidity}%.`)
    }
  } )
}

module.exports = forecast