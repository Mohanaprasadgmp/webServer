const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide a address term'
        })
    }
    const address = req.query.address;

    geocode(address, (error, {latitude , longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {   
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast : forecastData,
                location,
                address : address
            })
        })
    })
})

app.get('/product' , (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is up on port.' + PORT)
})