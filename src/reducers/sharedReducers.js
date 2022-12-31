import {
  SET_LOADING,
  REMOVE_LOADING,
  SET_USER_DATA,
  CLEAR_STORAGE,
  SET_ROLES,
  SET_DISPATCHERS,
} from '../constants/shared'

const initialState = {
  loading: false,
  userData: '',
  userRoles: null,
  dispatchers: null,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }

      break
    case SET_ROLES:
      return {
        ...state,
        userRoles: action.payload,
      }

      break
    case REMOVE_LOADING:
      return {
        ...state,
        loading: false,
      }

      break
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      }

      break
    case SET_DISPATCHERS:
      return {
        ...state,
        dispatchers: action.payload,
      }

      break
    case CLEAR_STORAGE:
      return {
        ...state,
        userData: '',
        loading: false,
      }

      break
    default:
      return state
      break
  }
}
