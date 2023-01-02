import React from 'react'
import { Button, Card, Modal, Form, Row, Col, Badge } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const AddUser = ({ ...props }) => {
  return (
    <form>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">Add New Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button className="btn-sm btn-danger btn-sm" onClick={props.onHide}>
          Cancel
        </Button>
        <Button type="submit" className="btn btn-success btn-sm">
          Submit
        </Button>
      </Modal.Footer>
    </form>
  )
}

export default AddUser
