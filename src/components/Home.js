import React, { Component } from 'react'
import Zones from './Zones'
import Comments from './Comments'

class Home extends Component{
  render(){
    return (
      <div>
        <div><Zones /></div>
        <div><Comments /></div>
      </div>
    )
  }
}

export default Home
