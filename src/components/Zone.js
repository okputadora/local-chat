import React, { Component } from 'react'

class Zone extends Component {
  render(){
    return (
    <div>
      <h2><a href="#">{this.props.zone.name}</a></h2>
      <span>{this.props.zone.zipCode}</span><br />
      <span>{this.props.zone.numComments}</span>
    </div>
    )
  }
}

export default Zone
