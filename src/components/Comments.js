import React, { Component } from 'react'
import Comment from './Comment'

class Comments extends Component {
  constructor(){
    super()
    this.state = {
      list: [
        {body: 'a sample Comment', user: 'fromme'},
        {body: 'another comment', user: 'another user'},
        {body: 'third time comment', user: 'thirdUser'},
      ]
    }
  }

  render(){
    const listItems = this.state.list.map((currentComment, i) => {
      return (
        <div><Comment comment={currentComment}/></div>
      )
    })
    return (
      <div>{listItems}</div>
    )
  }
}

export default Comments
