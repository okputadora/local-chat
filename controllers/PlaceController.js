var Place = require('../models/Place')
// npm i -S bluebird for ----- for handling promises
var Promise = require('bluebird')
var superagent = require('superagent')

module.exports = {

  get: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Place.find(params, function(err, places){
        if (err){
          reject(err)
          return
        }
        resolve(places)
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
        resolve(place)
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
      superagent
      .get(url)
      .query(geoParams)
      .set('Accept', 'text/json')
      .end(function(err, response){
        if (err){
          reject(err)
          return
        }
        // parse the json response
        var results = response.body.results
        var locationInfo = results[0].geometry
        var latlng= locationInfo.location

        //prepare it for entry into the place model
        params['geo'] = [latlng.lat, latlng.lng]
        Place.create(params, function(err, place){
          if (err){
            reject(err)
            return
          }
          resolve(place)
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
