var ProfileController = require('../controllers/ProfileController')
var PlaceController = require('../controllers/PlaceController')

// make the controller modular
module.exports = {
	profile: ProfileController,
	place: PlaceController,
}
