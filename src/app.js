const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const reservations = require('./utils/reservations')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
      title:"Make A Reservation"
    })
})

app.get('/reservations', (req, res) => {
  reservations.getReservations((parsedJSON)=>{
    const allReservations = parsedJSON
    res.render('reservations',{
      title:"Active Reservations",
      reservations:allReservations
    })
  })
})

app.post('/addReservation',(req,res)=>{
  console.log("addReservation called")
  let requestBody = '';
    req.on('data', chunk => {
        requestBody += chunk.toString(); // convert Buffer to string
    }).on('end', () => {
        console.log(JSON.parse(requestBody));
        reservations.addReservation(JSON.parse(requestBody))
        res.end('ok');
    });
})

app.listen(3100, () => {
    console.log('Server is up on port 3100.')
})
