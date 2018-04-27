import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_TSTAT = 'GET_TSTAT';
const SET_SETPOINT = 'SET_SETPOINT';

/**
 * INITIAL STATE
 */
const defaultStat = {};

/**
 * ACTION CREATORS
 */
const getTstat = stat => ({ type: GET_TSTAT, stat });
const occSetpoint = setpoint => ({ type: SET_SETPOINT, setpoint });

/**
 * THUNK CREATORS
 */
export const getThermostat = () => dispatch =>
  axios
    .get('/api/thermostat/')
    .then(res => dispatch(getTstat(res.data || defaultStat)))
    .catch(err => console.log(err));

export const setOccSet = setpoint => dispatch =>
  axios
    .get('/api/thermostat/setpoints/occupied', setpoint)
    .then(res => dispatch(getTstat(res.data || defaultStat)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultStat, action) {
  switch (action.type) {
    case GET_TSTAT:
      return action.stat;
    case SET_SETPOINT:
      return {
        ...state,
        setpoints: { ...state.setpoints, occSetpoint: action.setpoint },
      };
    default:
      return state;
  }
}
