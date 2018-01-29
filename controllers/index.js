var ProfileController = require('../controllers/ProfileController')
var PlaceController = require('../controllers/PlaceController')
var CommentController = require('../controllers/CommentController')
// make the controller modular
module.exports = {
	profile: ProfileController,
	place: PlaceController,
	comment: CommentController
}
