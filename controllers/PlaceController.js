var Place = require('../models/Place')
// npm i -S bluebird for ----- for handling promises
var Promise = require('bluebird')
var Request = require('../utils/Request')
module.exports = {

  get: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Place.find(params, function(err, places){
        if (err){
          reject(err)
          return
        }
        var list = [];
        if (isRaw){
          resolve(places)
          return
        }
        for (var i=0; i< places.length; i++){
          var place = places[i]
          list.push(place.summary())
        }
        resolve(list)
      })
    })
  },
  getById: function(id){
    return new Promise(function(resolve, reject){
      Place.findById(id, function(err, place){
        if (err){
          reject(err)
          return
        }
        resolve(place.summary)
      })
    })
  },
  post: function(params){

    return new Promise(function(resolve, reject){
      // parse address from user input
      var address = params.address+','+params.city+','+params.state
      var address = address.replace(' ', '+')
      // when we're creating a new place we want to get the long and lat from
      // the googlemaps api to add it to the db
      // Sample url: https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyChJw4DPIgdTEupvH25AIoUHn5dzMGwuoY
      // superagent uses a promise structure. the promise chain looks like...
      var url = 'https://maps.googleapis.com/maps/api/geocode/json'
      var geoParams = {
        key: process.env.GOOGLE_MAP_API,
        address: address
      }

      Request.get(url, geoParams, function(err, response){
        if (err){
          reject(err)
          return
        }
        // response parameter is response.body from utils/Request.js
        var results = response.results
        var locationInfo = results[0].geometry
        var latlng= locationInfo.location

        //prepare it for entry into the place model
        params['geo'] = [latlng.lat, latlng.lng]
        Place.create(params, function(err, place){
         if (err){
           // not sure where this reject comes from...where is the promise?
           // is super agent a promise?
           reject(err)
           return
         }
         console.log(place)
         resolve(place.summary())
        })
      })
    })
  },

  put: function(id, params){
    return new Promise(function(resolve, reject){
      Place.findByIdAndUpdate(id, function(err, profile){
        if (err){
          reject(err)
          return
        }
        resolve(profile)
        return
      })
    })
  }
}
