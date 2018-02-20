import React, { Component } from 'react'
import Zones from '../containers/Zones'
import Comments from '../containers/Comments'

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
