import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
function AddPropertyReqForm() {
  return (
    <div>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Request Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Request Name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            {' '}
            <Form.Label>Property/Item</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            {' '}
            <Form.Label>For Project</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            {' '}
            <Form.Label>Staff</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </Form.Select>
          </Col>

          <Col md={6}>
            {' '}
            <Form.Label>Request Status</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>End date</Form.Label>
              <Form.Control type="date" placeholder="Enter email" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddPropertyReqForm
