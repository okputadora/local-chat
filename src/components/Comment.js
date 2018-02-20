import React, { Component } from 'react'
import styles from './style'

const style = styles.comment
class Comment extends Component{
  render(){
    return (
      <div>
        <div>{this.props.comment.body}</div>
        <div>{this.props.comment.user}</div>
      </div>
    )
  }
}

export default Comment
