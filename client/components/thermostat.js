import React from 'react';
import { connect } from 'react-redux';
import {getThermostat} from '../store/'

/**
 * COMPONENT
 */

export const Thermostat = props => {
  console.log('tstat ', props)
  const { tstat } = props;
  return (
    <div>
      <h2>{tstat.temp}°</h2><button className="ui button">Update</button>
      <p>Setpoint is {tstat.dial}°</p>
      <div className="ui action input">
        <input type="text" placeholder="Enter new setpoint" />
        <button className="ui button">Save</button>
      </div>
      <p>Heat On</p>
      <p>Occupied</p>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    tstat: state.thermostat
  }
}


const mapDispatch = dispatch => {
  return {
    updateClick() {
      dispatch(getThermostat());
    },
  };
};

export default connect(mapState, mapDispatch)(Thermostat);
