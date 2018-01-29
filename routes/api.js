// completely modular file ready for reuse in other projects

var express = require('express')
var router = express.Router()
// when no file is specified index is default
// this is the only line that needs to be changed from project to project
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next){
	var resource = req.params.resource;
	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	// the false parameter here indicated that we dont want the raw response
	//  we want the password to be hidden. req.query gets paramaters for a GET Request
	// req.body is for POST request
	console.log("looking for places");
	console.log(req.query)
	controller.get(req.query, false)
	.then(function(results){
		res.json({
	    confirmation: 'success',
	    results: results
	  })
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})
router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id
	var controller  = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	controller.getById(id)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})
router.post('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	// req.body is the form data...input names from form must match names in the database schemas
	controller.post(req.body)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})
// put = update
router.put('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id
	controller.put(id, req.body)
	.then(function(redsult){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
	// if (resource == 'profile'){
	// 	Profile.findByIdandUpdate(id, req.body, function(err, result){
	// 		if (err){
	// 			res.json({
	// 				confirmation: 'error',
	// 				message: err
	// 			})
	// 			return
	// 		}
	// 		res.json({
	// 			confirmation: 'success',
	// 			result: result
	// 		})
	// 		return
	// 	})
	// }
})
module.exports = router
