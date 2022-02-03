const request = require('postman-request');

const forecast = (latitutde , longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f05a428722dcef7ebab88563ffb3de8b&query='+encodeURIComponent(latitutde)+','+encodeURIComponent(longitude)+'&units=f'
    
    //request({url : url , json : true} , (error , resposne, body) => {
    request({url, json : true} , (error, response, body) => {
        if(error){
            callback('Unable to connect to location service!', undefined);
        }
        else if(body.error){
            callback(body.error.info , undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.'); 
        }
    })
}

module.exports = forecast;