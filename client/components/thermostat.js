import React from 'react';
import { connect } from 'react-redux';
import { getThermostat, setSetpoints } from '../store/';

/**
 * COMPONENT
 */

export const Thermostat = props => {
  console.log('tstat ', props);
  const { tstat, updateClick } = props;
  return (
    <div>
      <h2>{tstat.temp}°</h2>
      <button className="ui button" onClick={() => updateClick()}>
        Update
      </button>
      <p>Setpoint is {tstat.dial}°</p>
      <div className="ui action input">
        <input type="text" placeholder="Enter new setpoint" />
        <button className="ui button"  onClick={(target) => changeSet(target)}>Save</button>
      </div>
      <p>Heat On</p>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    tstat: state.thermostat,
  };
};

const mapDispatch = dispatch => {
  return {
    updateClick() {
      dispatch(getThermostat());
    },
    changeSet(set) {
      let newSet = {
        activeSetpoint: set,
        occSetpoint: 70,
        unoccSetpoint: 50,
        occupied: true,
        tempOcc: Date.now(),
        tempOccTime: 10000, //1 hour = 3600000 temporary occupancy
        dialLastAdjust: Date.now() - 10000,
      }
      dispatch(setSetpoints(newSet));
    },
  };
};

export default connect(mapState, mapDispatch)(Thermostat);
