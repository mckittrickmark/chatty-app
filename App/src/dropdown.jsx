import React, { Component } from 'react'
import Dropdown from 'react-dropdown'

// This color list matches the color list randomly assigned on the server. If the two lists are different,
// it will not cause an error, but the user may be assigned a color on establishing a connection that they normally would not be able to select from the list.
const colorDropList = [{label: 'Red', value: '#FF0000'}, {label: 'Lime', value: '#00FF00'}, {label: 'Blue', value:'#0000FF'}, {label:'Brownish Yellow', value: '#999900'}]

// This is the class for the dropdown list in the Chatbar component.
class DropdownColor extends Component {
  render() {
    const onChange = (e) => {
      this.props.trx._changeColor(e)
    }
    return (
      <Dropdown className="chatbar-dropdown" menuClassName='myMenuClassName' placeholderClassName='myPlaceholderClassName' placeholder={this.props.currentUser.colorLabel} fluid search selection options={colorDropList} onChange={onChange} />
    )}
}

export default DropdownColor