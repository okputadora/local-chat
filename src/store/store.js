import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
//this line is unique to the project
import zoneReducer from '../reducers/zoneReducer'

var store;

export default {
  configureStore: () => {
    const reducers = combineReducers({
      // this line is unique to the project
      zone: zoneReducer
    })

    store = createStore(
      reducers,
      applyMiddleware(thunk)
    )
    return store
  },

  currentStore: () =>{
    return store
  }
}
