import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'
const style = styles.comment
class Comments extends Component {
  constructor(){
    super()
    this.state = {
      comment: {
        username: '',
        body: '',
        timestamp: '',
      },
      list: []
    }
  }
  updateUsername(event){
    console.log('update ' + event.target.value)
    // this.state.comment['username'] = event.target.value !!!NOOO never mutate the state
    // copy it and then update the state
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['username'] = event.target.value
    // think of this like Saving
    this.setState({
      comment: updatedComment
    })
  }
  updateBody(event){
    console.log('comment ' + event.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['body'] = event.target.value
    this.setState({
      comment: updatedComment
    })
  }
  updateTimestamp(event){
    console.log(event.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['timestamp'] = event.target.value
    this.setState({
      comment: updatedComment
    })
  }
  submitComment(){
    console.log("submitCOmment " + JSON.stringify(this.state.comment))
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.comment)
    this.setState({
      list: updatedList
    })
  }
  render(){
    const listItems = this.state.list.map((currentComment, i) => {
      return (
        <div key={i}><Comment comment={currentComment}/></div>
      )
    })
    return (
      <div style={style.commentBox}>
        <h2>Comments for Zone 1</h2>
        <div>{listItems}</div>
        <input onChange={this.updateUsername.bind(this)} className="form-control"type="text" placeholder="username" />
        <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="comment" />
        <input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="timestamp"></input>
        <button onClick={this.submitComment.bind(this)} className="btn">Submit Comment</button>
      </div>
    )
  }
}

export default Comments
