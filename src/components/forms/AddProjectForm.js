import React from 'react'
import { useEffect, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'

const GetClients_URL = '/api/get_client'
function AddProjectForm() {
  const [projectStatusOption, setProjectStatusOptions] = useState([])
  const [clientsOption, setClientsOptions] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: GetClients_URL,
    })
      .then((data) => {
        console.log(data)
        setClientsOptions(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Label>Project Status</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Start date</Form.Label>
              <Form.Control type="date" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>End date</Form.Label>
              <Form.Control type="date" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col md={6}>
            {' '}
            <Form.Label>Project Status</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddProjectForm
