var Profile = require('../models/Profile')
// npm i -S bluebird for ----- for handling promises
var Promise = require('bluebird')
// npm i -S bcrypt for password encryption
var bcrypt = require('bcrypt')

module.exports = {

  get: function(params){
    return new Promise(function(resolve, reject){
      Profile.find(params, function(err, profiles){
        if (err){
          reject(err)
          return
        }

        // create a list to loop through so we can apply the summary method which
        // we defined in the model
        var list = [];
        for (var i=0; i<profiles.length; i++){
          var profile = profiles[i]
          list.push(profile.summary())
        }
        resolve(list)
      })
    })
  },
  getById: function(id){
    return new Promise(function(resolve, reject){
      Profile.findById(id, function(err, profile){
        if (err){
          reject(err)
          return
        }
        // .summary method defined in the model
        resolve(profile.summary())
      })
    })
  },
  post: function(params){
    return new Promise(function(resolve, reject){
      //here params is the form input values--req.body from api.js
      // encrypt password before create command
      var password = params.password
      params['password'] = bcrypt.hashSync(password, 10)
      Profile.create(params, function(err, profile){
        if (err){
          reject(err)
          return
        }
        resolve(profile.summary)
        return
      })
    })
  },
  put: function(id, params){
    return new Promise(function(resolve, reject){
      Profile.findByIdAndUpdate(id, params, function(err, profile){
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