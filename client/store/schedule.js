import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_SCHEDULE = 'SET_SCHEDULE'

/**
 * INITIAL STATE
 */
const defaultSchedule = {}

/**
 * ACTION CREATORS
 */
const setSch = day => ({type: SET_SCHEDULE, day})

/**
 * THUNK CREATORS
 */
export const setSchedule = (slot) => //slot is expected to be an object {day: 1, times: [4:30,5:40]}
  dispatch =>
    axios.put(`/api/thermostat/schedule/${slot.day}`,slot.times)
      .then(res =>
        dispatch(setSch(res.data || defaultSchedule)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultSchedule, action) {
  switch (action.type) {
    case SET_SCHEDULE:
      return {...state}//, action:.day}
    default:
      return state
  }
}
