import React, { Component } from 'react'
import styles from '../containers/styles'

const style = styles.comment
class Comment extends Component{
  render(){
    return (
      <div style={style.commentBox}>
        <div style={style.body}>{this.props.comment.body}</div>
        <div style={style.body}>{this.props.comment.username} | <span>{this.props.comment.timestamp}</span></div>
      </div>
    )
  }
}

export default Comment
