import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
function AddUserForm() {
  return (
    <div>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Middle Name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Staff Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col md={6}>
            {' '}
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </Form.Select>
          </Col>

          <Col md={6}>
            {' '}
            <Form.Label>Address</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">Kimara</option>
              <option value="2">Kiluvya</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddUserForm
