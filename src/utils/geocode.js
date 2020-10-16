const request = require('postman-request')
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3Y4MCIsImEiOiJja2Z6aW50c2kxMGdkMnVvN2o4NjdudWJsIn0.VxqkSFEw-SKZkPS75yyLWw&limit=1`
  request({url, json: true}, (error, {body} ) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.')
    } else {
      const {center, place_name} =  body.features[0]
      const [ longitude, latitude ] = center
      callback(undefined, {
        latitude,
        longitude,
        location: place_name
      })
    }
  })
}

module.exports = geocode