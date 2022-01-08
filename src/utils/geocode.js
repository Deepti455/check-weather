const axios = require('axios')

const geocode = (address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGVlcHRpdmVybWEiLCJhIjoiY2t5MzZyZGd3MG5sNDJwbnl1dmtqYXNvaiJ9.hDapGuhuNd5Qo9Uo46zFmg'
    axios.get(url)
            .then((res)=>{
                callback(undefined, {
                    latitude: res.data.features[0].center[1],
                    longitude: res.data.features[0].center[0],
                    location: res.data.features[0].place_name,
                })
            }).catch((e)=>{
                if(e.response && e.response.status){
                    callback("Unable to find Location. try another one",undefined)
                }else{
                    callback("Unable to connect to location service")
                }
            })
}

module.exports = geocode