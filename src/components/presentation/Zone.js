import React, { Component } from 'react'
import styles from '../containers/styles'

const style = styles.zone
class Zone extends Component {
  render(){
    return (
    <div style={style.container}>
      <h2><a style={style.header} href="#">{this.props.zone.name}</a></h2>
      <span>{this.props.zone.zipCode}</span><br />
      <span>{this.props.zone.numComments}</span>
    </div>
    )
  }
}

export default Zone
