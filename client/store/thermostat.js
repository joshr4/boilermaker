import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_TSTAT = 'GET_TSTAT';
const SET_SETPOINT = 'SET_SETPOINT';
const SET_CONFIG = 'SET_CONFIG';
const SET_SCHEDULE = 'SET_SCHEDULE';

/**
 * INITIAL STATE
 */
const defaultStat = {};

/**
 * ACTION CREATORS
 */
const getTstat = stat => ({ type: GET_TSTAT, stat });
const setSet = setpoints => ({ type: SET_SETPOINT, setpoints });
const setCon = config => ({ type: SET_CONFIG, config });
const setSch = schedule => ({ type: SET_SCHEDULE, schedule });

/**
 * THUNK CREATORS
 */
export const getThermostat = () => dispatch =>
  axios
    .get('/api/thermostat/')
    .then(res => dispatch(getTstat(res.data || defaultStat)))
    .catch(err => console.log(err));

export const setSetpoints = setpoints => dispatch =>
  axios
    .put('/api/thermostat/setpoints', setpoints)
    .then(res => dispatch(setSet(res.data || defaultStat)))
    .catch(err => console.log(err));

export const setConfig = config => dispatch =>
  axios
    .put('/api/thermostat/config', config)
    .then(res => dispatch(setCon(res.data || defaultStat)))
    .catch(err => console.log(err));

export const setSchedule = schedule => dispatch =>
  axios
    .put('/api/thermostat/schedule', schedule)
    .then(res => dispatch(setSch(res.data || defaultStat)))
    .catch(err => console.log(err));
/**
 * REDUCER
 */
export default function(state = defaultStat, action) {
  switch (action.type) {
    case GET_TSTAT:
      return action.stat;
    case SET_SETPOINT:
      // const tempState = {...state}
      // tempState.setpoints = action.setpoints
      return Object.assign({}, state, { setpoints: action.setpoints });
    case SET_CONFIG:
      return Object.assign({}, state, { config: action.config });
    case SET_SCHEDULE:
      return Object.assign({}, state, { schedule: action.schedule });
    default:
      return state;
  }
}
