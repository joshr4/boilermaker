import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Thermostat, Schedule, Settings} from './components'
import {me, getThermostat, setSetpoints, setConfig, setSchedule} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} /> */}
        <Route path="/home" component={Thermostat} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/settings" component={Settings} />

        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Thermostat} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  let schedule = {
    1: [{start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 }}],
    2: [{start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 }}],
    3: [{start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 }}],
    4: [{start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 }}],
    5: [{start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 }}],
    6: [{start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 }}],
    0: [{start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 }}],
  }
  return {
    loadInitialData () {
      dispatch(getThermostat())
      dispatch(setSchedule(schedule))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
