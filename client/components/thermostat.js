import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getThermostat} from './index'

/**
 * COMPONENT
 */

export const Thermostat = (props) => {
  const { temp, updateClick } = props;
  console.log('props',props)
  return (
    <div>
      <h2>{temp}70°</h2><button onClick={() => updateClick()} className="ui button">Update</button>
      <p>Setpoint is 74°</p>
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
    //email: state.user.email
    temp: 70
  };
};

const mapDispatch = dispatch => {
  return {
    updateClick() {
      dispatch(getThermostat());
    },
  };
};

export default connect(mapState, mapDispatch)(Thermostat);

/**
 * PROP TYPES
 */
Thermostat.propTypes = {
  //email: PropTypes.string
  temp: PropTypes.number,
};
