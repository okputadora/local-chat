var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var bcrypt = require('bcrypt')

// router to see who is logged into a session
router.get('/:action', function(req, res, next){
  var action = req.params.action
  console.log("Action: " + action)
  if (action == 'currentuser'){ // check if user is logged in
    console.log("Current user")
    // if the user has never logged in
    if (req.session == null){
      res.json({
        confirmation: 'fail',
        message: 'user not logged in'
      })
      return
    }
    // if there is a session but no user key associated with the session
    if (req.session.user == null){
      res.json({
        confirmation: 'fail',
        message: 'user not logged in'
      })
      return
    }
    // if the user is logged in to a session
    var userId = req.session.user
    res.json({
      confirmation: 'success',
      user: userId
    })
  }
})


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
      if (passwordCorrect == false){
        res.json({
          confirmation:'fail',
          message:'Incorrect Password'
        })
        return;
      }

      // start a session if the user successfully logs in
      req.session.user = profile._id

      res.json({
        confirmation: 'success',
        profile: profile.summary()
      })
    })
    .catch(function(err){
      res.json({
        confirmation: 'fail',
        message: err
      })
      return
    })
  }
})

module.exports = router