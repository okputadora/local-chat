var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var bcrypt = require('bcrypt')

// logins are typically handled with post requests
// parameter name is action rather than resource because this is not a rest api
// actions will be stuff like login logout edit etc
router.post('/:action', function(req, res, next){
  var action = req.params.action
  if(action == 'login'){
    // form always sends information through the body
    var email = req.body.email
    console.log(email);
    // get profile from db where email from db matches email from form
    // true here signifies we want the raw data (which includes the password)
    ProfileController.get({email:email}, true)
    .then(function(profiles){
      if (profiles.length == 0){
        res.json({
          confirmation:'fail',
          message:'Profile not found. Check Spelling'
        })
        return
      }
      var profile = profiles[0]
      var password = req.body.password
      //check password
      var passwordCorrect = bcrypt.compareSync(password, profile.password)
      res.json({
        confirmation: 'success',
        profile: profile
      })
    })
    .catch()
  }
})

module.exports = router
