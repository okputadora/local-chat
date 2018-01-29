var mongoose = require('mongoose')

var PlaceSchema = new mongoose.Schema({
  name: {type:String, default:''},
	description: {type:String, default:''},
  type: {type:String, default:''},
	address: {type:String, default:''},
	city: {type:String, default:''},
  state: {type:String, default:''},
  zip: {type:String, default:''},
  // latitude and longitude data needed from google
  geo: {
    type: [Number],
    index: '2d'
  },
	timestamp: {type:Date, default:Date.now}
})

// because mongoose adds the id its not formatted like the rest of the keys;
// it has a an _before it, so we're just going to get rid of that
PlaceSchema.methods.summary = function(){
  var summary ={
    name: this.name,
    description: this.description,
    type: this.type,
    address: this.address,
    city: this.city,
    state: this.state,
    zip: this.zip,
    geo: this.geo,
    timestamp: this.timestamp,
    id: this._id
  }
  return summary;
}
module.exports = mongoose.model('PlaceSchema', PlaceSchema)
