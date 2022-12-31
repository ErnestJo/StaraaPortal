import { toast } from 'react-toastify'
class Notify {
  notifyError = (ms) => {
    toast.error(ms, { toastId: '' })
  }
  notifyErrorTopCenter = (ms) => {
    toast.error(ms, {
      toastId: '',
      position: toast.POSITION.TOP_CENTER,
    })
  }
  notifyInfo = (ms) => {
    toast.info(ms, { toastId: '' })
  }
  notifyInfoTopCenter = (ms) => {
    toast.info(ms, {
      toastId: '',
      position: toast.POSITION.TOP_CENTER,
    })
  }
  notifySuccess = (ms) => {
    toast.success(ms, { toastId: '' })
  }

  notifySuccessTopCenter = (ms) => {
    toast.success(ms, {
      toastId: '',
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

export default new Notify()
