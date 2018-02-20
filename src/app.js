import React, { Component } from 'react'
import reactDOM from 'react-dom'
import Zones from './components/Zones'
class App extends Component {
  render(){
    console.log("hello")
    return (
      <div><Zones /></div>
    )
  }
}

reactDOM.render(<App />, document.getElementById('root'))
