// reducred maintains the data (in this case the data for zone)

import constants from '../constants/constants'

var initialState = {
  // this is the list from our Zone state. It now lives here
  list: []
}

export default (state = initialState, action) => {

  switch (action.type) {
    case constants.ZONES_RECEIVED:
    console.log("the reducer got called")
      console.log('ZONES_RECEIVED '+JSON.stringify(action.zones))
      let updated = Object.assign({}, state)
      // take the zones payload from the db and assigning it to the updated state
      updated['list'] = action.zones
      return updated // this is the equivalent of this.setState
    default:
      return state
  }
}
