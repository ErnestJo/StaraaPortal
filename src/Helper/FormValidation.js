import React from 'react'

export const requiredNumber = (value) => {
  if (value <= 0) {
    return <span className="errormsg">Required</span>
  }
}

export const requiredString = (value) => {
  if (!value.toString().trim().length) {
    return <span className="errormsg">Required</span>
  }
}

export const requiredEmail = (value) => {
  if (value) {
    return <span className="errormsg">{value} Is not ValidEmail</span>
  }
}
export const notRequiredEmail = (value) => {
  if (!value == '') {
    return <span className="errormsg">{value} Is not ValidEmail</span>
  }
}

export const isNull = (value) => {
  if (value === null) {
    return <span className="errormsg">{value} cant be empty</span>
  } else {
    return ''
  }
}

export const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
