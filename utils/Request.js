var superagent = require('superagent')

module.exports = {
  // turn super agent into a utility class (think of a utility class as
  // toolbox that can be used on multiple different projects e.g. converting
  // a timestamp to human readable format, or making an external api request
  // like we're doing below)
  get: function(url, params, callback){
    superagent
    .get(url)
    .query(params)
    .set('Accept', 'text/json')
    .end(function(err, response){
      if (err){
        callback(err, null)
        return
      }
      // response.body = the payload
      callback(null, response.body)
    })
  }
}
