import { CLEAR_STORAGE, SET_USER_DATA } from '../constants/shared'

export const clearStore = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_STORAGE,
    })
  }
}

export const InsertUserData = (userData) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      payload: userData,
    })
  }
}
