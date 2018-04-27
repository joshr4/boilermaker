import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

export const Thermostat = (props) => {
  const {temp} = props
  return (
    <div>
      <h2>72°</h2>
      <p>Setpoint is 74</p> <button class="ui primary button">Save</button>
      <p>Heat On</p>
      <p>Occupied</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    //email: state.user.email
    temp: 70
  }
}

export default connect(mapState)(Thermostat)

/**
 * PROP TYPES
 */
Thermostat.propTypes = {
  //email: PropTypes.string
  temp: PropTypes.number
}
