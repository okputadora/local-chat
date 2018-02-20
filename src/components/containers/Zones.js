import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import { APIManager } from '../../utils/'
import { connect } from 'react-redux'
import  actions from '../../actions/actions'
// we need the store because it dispatched the actions we've imported in the line above
import store from '../../store/store'

class Zones extends Component {
  constructor(){
    super()
    this.state = {
      zone: {
        name: '',
        zip: '',
      }
    }
  }
  // this is another built in function that we are overriding
  // looks like it means something similar to document.ready but for the component
  componentDidMount(){
    APIManager.get('/api/place', null, (err, response) =>{
      if (err){
        alert('error '+err)
        return
      }
      // this now belongs in the store and instead we will "dispatch the action"
      // this.setState({
      //   list: results
      // })
      console.log('calling the acion from the zone container')
      const zones = response
      store.currentStore().dispatch(actions.zonesReceived(zones))
    })
  }
  // different way from doing the comments one - putting it all in one function
  updateZone(event){
    console.log("CHANGE")
    console.log(event.target.value)
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone[event.target.id] = event.target.value
    this.setState({
      zone: updatedZone
    })
  }
  submitZone(){
    console.log("clicked")
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.zone)
    console.log(this.state.zone)
    APIManager.post('/api/place', this.state.zone, (err, results) =>{
      if (err){
        alert('error '+err)
        return
      }
      console.log("post request made " + err)
      this.setState({
        list: updatedList
      })
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
          <input id="name" type="text" onChange={this.updateZone.bind(this)} className="form-control" placeholder="name" />
          <input id="zip" type="text" onChange={this.updateZone.bind(this)} className="form-control" placeholder="zipCode" />
          <button onClick={this.submitZone.bind(this)}>Submit Place</button>
        </div>
      </div>
    )
  }
}

// connect to redux
const stateToProps = (state) => {
  return {
    // state refers to the store, zone refers to the zoneReducer
    list: state.zone.list
  }
}
export default connect(stateToProps)(Zones)
