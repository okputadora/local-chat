import React, { Component } from 'react'
import reactDOM from 'react-dom'
import Home from './components/Home'
import Comments from './components/Comments'
class App extends Component {
  render(){
    console.log("hello")
    return (
      <div><Home /></div>
    )
  }
}

reactDOM.render(<App />, document.getElementById('root'))
