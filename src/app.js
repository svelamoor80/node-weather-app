const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'xyz'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'xyz'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'xyz',
    msg: 'This is some helpful txt.'
  })
})

// app.get('', (req, res) => {
//   res.send('Hello express')
// })

// app.get('/help', (req, res) => {
//   res.send('Help page')
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>About page</h1')
// })

app.get('/weather', (req, res) => {
  const { address } = req.query
  if (!address) {
    return res.send({
      error: 'Please provide an address'
    })
  }
  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address
        
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Product not found'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  // res.send('Help article not found')
  res.render('pageError', {
    title: '404 Page',
    msg: 'Help article not found',
    name: 'xyz'
  })
})

app.get('*', (req, res) => {
  // res.send('My 404 page')
  res.render('pageError', {
    title: '404 Page',
    msg: 'Page not found',
    name: 'xyz'
  })
})

app.listen(port, () => {
  console.log('Server is up on port 3000')
})