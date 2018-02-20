import constants from '../constants/constants'

export default {

  zonesReceived: (zones) => {
    console.log("action received")
    return {
      type: constants.ZONES_RECEIVED,
      // this is the actual payload from the API request
      zones: zones
    }
  }

}
