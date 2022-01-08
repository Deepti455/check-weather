const axios = require('axios')

const forecast = (latitude, longitude,  callback)=>{
    const url = 'http://api.weatherstack.com/forecast?access_key=a992dad8af0145f106cada93ed5d4ff8&query='+latitude+','+longitude
    axios.get(url)
    .then(resp=>{
        if(resp.data.current){
            callback(undefined, `temperature is : ${resp.data.current.temperature} and it feels like : ${resp.data.current.feelslike}`)
        }else{
            callback("Unable to find the weather at this loaction. Please try another one")
        }
    }).catch(e=>{
         callback("Unable to connect the weather Api")  
    })
}

module.exports = forecast