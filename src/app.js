import React, { Component } from 'react'
import reactDOM from 'react-dom'
import Home from './components/layout/Home'
// connect redux environment - provider binds project to redux
import { Provider } from 'react-redux'
import store from './store/store'

class App extends Component {
  render(){
    console.log("hello")
    return (
      // put the application in the Provider and give it a store
      <Provider store={ store.configureStore() }>
        <div><Home /></div>
      </Provider>

    )
  }
}

reactDOM.render(<App />, document.getElementById('root'))
