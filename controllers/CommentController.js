var Place = require('../models/Comment')
var Promise = require('bluebird')

module.exports = {
  get: function(params, isRaw){
    return new Promise(function(resolve, reject){
      var sortOrder = (params.sort == 'asc') ? 1 : -1
      delete params.sort
      Place.find(params, null, {sort:{timestamp: sortOrder}}, function(err, comments){
        if (err){
          reject(err)
          return
        }
        if (isRaw == true){
          resolve(comments)
          return
        }
        // create a list to loop through so we can apply the summary method which
        // we defined in the Profilw model
        var list = [];
        for (var i=0; i<comments.length; i++){
          var comment = comments[i]
          list.push(comment.summary())
        }
        resolve(list)
      })
    })
  },

  getById: function(id){
    return new Promise(function(resolve, reject){
      Place.findById(id, function(err, comment){
        if (err){
          reject(err)
          return
        }
        resolve(comment.summary())
      })
    })
  },

  post: function(params){
    return new Promise(function(resolve, reject){
      Comment.create(params, function(err, comment){
        if (err){
          reject(err)
          return
        }
        resolve(comment.summary());
      })
    })
  },

  put: function(id, params){
    return new Promise(function(resolve, reject){
      Comment.findByIdAndUpdate(id, params, function(err, comment){
        if (err){
          reject(err)
          return
        }
        resolve(comment.summary())
      })
    })
  }
}
