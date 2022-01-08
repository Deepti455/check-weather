const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const PORT = process.env.PORT || 3000

//Define path
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//setup handlebars engine to views loaction
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        author: 'deepti verma'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Us",
        author: 'deepti verma'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Need Help",
        author: "deepti verma",
        msg: 'I am here to help You'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Please provide address or location to see the weather'
        })
    }

    geocode(address,(error,{latitude, longitude,  location}={})=>{
        if(error){
            return res.send({ error })
         }
        forecast(latitude, longitude, (error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                address,
                location,
                forecast : forecastData,
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        author: 'deepti verma'
    })
})




app.listen(PORT,()=>{
    console.log("server listening on Port ",PORT)
})