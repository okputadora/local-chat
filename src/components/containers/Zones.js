import React, { Component } from 'react'
import Zone from '../presentation/Zone'
class Zones extends Component {
  constructor(){
    super()
    this.state = {
      zone: {
        name: '',
        zip: '',
      },
      list: []
    }
  }
  // different way from doing the comments one - putting it all in one function
  updateZone(event){
    console.log('updateZOneL ' + event.target.id + "-" + event.target.value)
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone[event.target.id] = event.target.value
    this.setState({
      zone: updatedZone
    })
  }
  submitZone(){
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.zone)
    this.setState({
      list: updatedList
    })
  }
  render(){
    const listItems = this.state.list.map((element, i) => {
      return (
        <li key={i} style={{listStyleType: "none"}}><Zone zone={element}/></li>
      )
    })

    return (
      <div>
        <ol>
          {listItems}
        </ol>

        <div>
          <input id="name"type="text" onChange={this.updateZone.bind(this)} className="form-control" placeholder="name" />
          <input id="zipCode"type="text" onChange={this.updateZone.bind(this)} className="form-control" placeholder="zipCode" />
          <button onClick={this.submitZone.bind(this)}>Submit Place</button>
        </div>
      </div>
    )
  }
}

export default Zones
