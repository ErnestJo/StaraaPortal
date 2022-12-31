import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Button, Card, Modal, Form, Row, Col, Badge } from 'react-bootstrap'
import Notify from '../../Helper/Notify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

const schema = yup.object().shape({})

const SystemConfig = () => {
  React.useEffect(() => {}, [])
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const [success, setSuccess] = useState(false)

  const AddAddress_URL = 'api/add_address'
  const AddClient_URL = 'api/add_client'
  const AddGender_URL = 'api/add_gender'
  const AddGlobal_URL = 'api/add_global_role'
  const AddProjectStatus_URL = 'api/add_project_status'
  const AddPropertiesStatus_URL = 'api/add_properties_status'
  const AddRequestStatus_URL = 'api/add_request_status'
  const AddStaffRole_URL = 'api/add_staff_role'

  const address = (data) => {
    try {
      var body = {
        addres_name: data.addres_name,
      }
      console.log(body)
      axios
        .post(AddAddress_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            reset()
            Notify.notifySuccess('Address was added Succefully')
          } else {
            Notify.notifyError('failed to add new Address')
          }
        })
      setSuccess(true)
    } catch (e) {}
  }

  const client = (data) => {
    try {
      var body = {
        client_name: data.client_name,
      }
      console.log(body)
      axios
        .post(AddClient_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            reset()
            Notify.notifySuccess('Client was added Succefully')
          } else {
            Notify.notifyError('failed to add new Client')
          }
        })

      setSuccess(true)
    } catch (e) {}
  }

  const gender = (data) => {
    try {
      var body = {
        gender_name: data.gender_name,
      }
      console.log(body)
      axios
        .post(AddGender_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            reset()
            Notify.notifySuccess('Gender was added Succefully')
          } else {
            Notify.notifyError('failed to add new Gender')
          }
        })

      setSuccess(true)
    } catch (e) {}
  }

  const gRoles = (data) => {
    try {
      var body = {
        role_name: data.role_name,
      }
      console.log(body)
      axios
        .post(AddGlobal_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            reset()
            Notify.notifySuccess('Role was added Succefully')
          } else {
            Notify.notifyError('failed to add new Role')
          }
        })

      setSuccess(true)
    } catch (e) {}
  }

  const pStatus = (data) => {
    try {
      var body = {
        project_status_name: data.project_status_name,
      }
      console.log(body)
      axios
        .post(AddProjectStatus_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            reset()
            Notify.notifySuccess('Project Status was added Succefully')
          } else {
            Notify.notifyError('failed to add new project Status')
          }
        })

      setSuccess(true)
    } catch (e) {}
  }

  const proStatus = (data) => {
    try {
      var body = {
        properties_status_name: data.properties_status_name,
      }
      console.log(body)
      axios
        .post(AddPropertiesStatus_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            reset()
            Notify.notifySuccess('Properties Status was added Succefully')
          } else {
            Notify.notifyError('failed to add new Properties Status')
          }
        })

      setSuccess(true)
    } catch (e) {}
  }

  const rStatus = (data) => {
    try {
      var body = {
        request_status_name: data.request_status_name,
      }
      console.log(body)
      axios
        .post(AddRequestStatus_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            reset()
            Notify.notifySuccess('Role Status was added Succefully')
          } else {
            Notify.notifyError('failed to add new Role Status')
          }
        })

      setSuccess(true)
    } catch (e) {}
  }
  return (
    <div>
      <Card>
        <Card.Header>
          <h3>System Configuration</h3>
        </Card.Header>
        <Card.Body>
          <div>
            <Row>
              <Form onSubmit={handleSubmit(address)}>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Add Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address"
                      name="addres_name"
                      {...register('addres_name')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Button onclassName="float-end" type="submit">
                  Add Address
                </Button>
              </Form>
            </Row>

            <Row>
              <Form onSubmit={handleSubmit(client)}>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Add Client</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Client"
                      name="client_name"
                      {...register('client_name')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Button onclassName="float-end" type="submit">
                  Add Client
                </Button>
              </Form>
            </Row>
            <Row>
              <Form onSubmit={handleSubmit(gender)}>
                {' '}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Add Gender</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Gender"
                      name="gender_name"
                      {...register('gender_name')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Button onclassName="float-end" type="submit">
                  Add Gender
                </Button>
              </Form>
            </Row>
            <Row>
              <Form onSubmit={handleSubmit(gRoles)}>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Add Global Role</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Global Role"
                      name="role_name"
                      {...register('role_name')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Button onclassName="float-end" type="submit">
                  Add Global Role
                </Button>
              </Form>
            </Row>
            <Row>
              <Form onSubmit={handleSubmit(pStatus)}>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project Status</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Project Status"
                      name="project_status_name"
                      {...register('project_status_name')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Button onclassName="float-end" type="submit">
                  Add Project Status
                </Button>
              </Form>
            </Row>
            <Row>
              <Form onSubmit={handleSubmit(proStatus)}>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Properties Status</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Properties"
                      name="properties_status_name"
                      {...register('properties_status_name')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Button onclassName="float-end" type="submit">
                  Add Properties Status
                </Button>
              </Form>
            </Row>
            <Row>
              <Form onSubmit={handleSubmit(rStatus)}>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Request Status</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Request"
                      name="request_status_name"
                      {...register('request_status_name')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Button onclassName="float-end" type="submit">
                  Add Request Status
                </Button>
              </Form>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SystemConfig
