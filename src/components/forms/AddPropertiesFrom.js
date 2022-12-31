import React from 'react'

import { Form, Row, Col, Button } from 'react-bootstrap'
function AddPropertiesForm() {
  return (
    <div>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Propertiy Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Propertiy Name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            {' '}
            <Form.Label>Property Status</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">Active</option>
              <option value="2">Female</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Enter Quantity" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Quantity" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddPropertiesForm
