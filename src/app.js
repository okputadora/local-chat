import React, { Component } from 'react'
import reactDOM from 'react-dom'
import Home from './components/layout/Home'

class App extends Component {
  render(){
    console.log("hello")
    return (
      <div><Home /></div>
    )
  }
}

reactDOM.render(<App />, document.getElementById('root'))
