import Axios from 'axios'
import { CLEAR_STORAGE, SET_USER_DATA, SET_LOADING, REMOVE_LOADING } from '../constants/shared'

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

export const getWithNoLoader = (url, scf, ecf) => {
  Axios.get(url)
    .then((data) => {
      scf(data)
    })
    .catch((error) => {
      ecf(error)
    })
}
export const getWithNoLoaderAuthorized = (url, scf, ecf) => {
  Axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('tk')}`,
    },
  })
    .then((data) => {
      scf(data)
    })
    .catch((error) => {
      ecf(error)
    })
}
export const posttWithLoader = (url, body, scf, ecf) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
    })
    Axios.post(url, body)
      .then((data) => {
        scf(data)
      })
      .catch((error) => {
        ecf(error)
      })
      .finally(() => {
        dispatch({
          type: REMOVE_LOADING,
        })
      })
  }
}

export const posttWithLoaderAuthorized = (url, body, scf, ecf) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
    })
    Axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tk')}`,
      },
    })
      .then((data) => {
        scf(data)
      })
      .catch((error) => {
        ecf(error)
      })
      .finally(() => {
        dispatch({
          type: REMOVE_LOADING,
        })
      })
  }
}

export const posttWithNoLoader = (url, body, scf, ecf) => {
  Axios.post(url, body)

    .then((data) => {
      scf(data)
    })
    .catch((error) => {
      ecf(error)
    })
}

export const posttWithNoLoaderAuthorized = (url, body, scf, ecf) => {
  Axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('tk')}`,
    },
  })

    .then((data) => {
      scf(data)
    })
    .catch((error) => {
      ecf(error)
    })
}

export const getWithLoader = (url, scf, ecf) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
    })
    Axios.get(url)
      .then((data) => {
        scf(data)
      })
      .catch((error) => {
        ecf(error)
      })
      .finally(() => {
        dispatch({
          type: REMOVE_LOADING,
        })
      })
  }
}
