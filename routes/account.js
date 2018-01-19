var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')

// logins are typically handled with post requests
// parameter name is action rather than resource because this is not a rest api
// actions will be stuff like login logout edit etc
router.post('/:action', function(res, req, next){
  var action = req.params.action
  if(action == 'login'){
    // form always sends information through the body
    var email = req.body.email
    //
    ProfileController.get({emali:email})
    var password = req.body.password
  }
})

module.exports = router
