import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TSTAT = 'GET_TSTAT'
const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE'

/**
 * INITIAL STATE
 */
const defaultStat = {}

/**
 * ACTION CREATORS
 */
const getTstat = stat => ({type: GET_TSTAT, stat})
const putSched = () => ({type: UPDATE_SCHEDULE})

/**
 * THUNK CREATORS
 */
export const getThermostat = () =>
  dispatch =>
    axios.get('/api/')
      .then(res =>
        dispatch(getTstat(res.data || defaultStat)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultStat, action) {
  switch (action.type) {
    case GET_TSTAT:
      return action.stat
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
