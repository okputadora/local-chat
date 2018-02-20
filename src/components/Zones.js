import React, { Component } from 'react'
import Zone from '../components/Zone'
class Zones extends Component {
  constructor(){
    super()
    this.state = {
      list: [
        {name: 'Zone1', zipCode: '10011', numComments: 10},
        {name: 'Zone2', zipCode: '10012', numComments: 10},
        {name: 'Zone3', zipCode: '10013', numComments: 10}
      ]
    }
  }
  render(){
    const listItems = this.state.list.map((element, i) => {
      return (
        <li><Zone zone={element} /></li>
      )
    })

    return (
      <div>
        <ol>
          {listItems}
        </ol>
      </div>
    )
  }
}

export default Zones
