var express = require('express')
var router = express.Router()
// using the SDK instead of the REST API
var GoogleMapsAPI = require('googlemaps')
router.get('', function(req, res, next){
  var publicConfig = {
    key: process.env.GOOGLE_MAP_API,
    stagger_time:       1000, // for elevationPath
    encode_polylines:   false,
    secure:             true, // use https
  }

  var gmAPI = new GoogleMapsAPI(publicConfig)
  var geocodeParams = {
    "address":    "1200 Walnut Street, Philadelphia, PA",
    "language":   "en"
  }

  gmAPI.geocode(geocodeParams, function(err, result){
    console.log('Maps API requiest ' + result);
    res.json({
      confirmation: 'success',
      // these results are identical to the REST API
      results: result,
    })
  })
})

module.exports = router;
