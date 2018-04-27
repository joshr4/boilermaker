import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TSTAT = 'GET_TSTAT'

/**
 * INITIAL STATE
 */
const defaultStat = {}

/**
 * ACTION CREATORS
 */
const getTstat = stat => ({type: GET_TSTAT, stat})

/**
 * THUNK CREATORS
 */
export const getThermostat = () =>
  dispatch =>
    axios.get('/api/thermostat/')
      .then(res =>
        dispatch(getTstat(res.data || defaultStat)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultStat, action) {
  switch (action.type) {
    case GET_TSTAT:
      return action.stat
    default:
      return state
  }
}
