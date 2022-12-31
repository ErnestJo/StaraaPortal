import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

function CustomModal(props) {
  const children = props.children
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button>{props.title}</Button>
      </Modal.Footer>
    </Modal>
  )
}
CustomModal.propTypes = {
  title: PropTypes.string,
}

CustomModal.propTypes = {
  onHide: PropTypes.func,
}

CustomModal.propTypes = {
  children: PropTypes.element,
}

export default CustomModal
