const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views/partials locations
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Sample'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ace'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg: 'Wow',
    name: 'Ace'
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: 'Please provide an address.'
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      
      res.send({
        address,
        location,
        forecastData
      })
    })
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help article not found.',
    title: '404',
    name: 'Ace'
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('*', (reg, res) => {
  res.render('404', {
    message: 'Page not found.',
    title: '404',
    name: 'Ace'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});