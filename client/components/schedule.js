import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Schedule = (props) => {
  const {} = props
  console.log('Tstat')
  return (
    <div>
      <h3>Schedule</h3>
      <p>Show schedules here</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    //email: state.user.email
  }
}

export default connect(mapState)(Schedule)

/**
 * PROP TYPES
 */
Schedule.propTypes = {
  //email: PropTypes.string
}
