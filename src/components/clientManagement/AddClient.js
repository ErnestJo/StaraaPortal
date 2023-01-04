import React from 'react'
import { Button, Card, Modal, Form, Row, Col, Badge, FormGroup, Label } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Notify } from 'src/Helper'

const AddClient_URL = '/api/UserManagement/AddUser'
const Lookup_URL = '/api/BusinessManagement/getlookup'
const gender = 'gender'
const usertype = 'usertype'
const AddClient = () => {
  React.useEffect(() => {}, [])
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [genderOption, setGenderOptions] = useState([])
  const [userTypeOption, setUserTypeOptions] = useState([])

  const { register, errors, handleSubmit, watch, reset } = useForm({
    mode: 'onChange',
  })

  const email = useRef({})
  email.current = watch('email', '')
  const submitUserData = (data) => {
    try {
      var body = {
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        gender: parseInt(data.gender),
        user_type: parseInt(data.user_type),
        dob: data.dob,
      }
      console.log(body)
      axios
        .post(AddClient_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data)
          if ((data.data.data.code = 200)) {
            props.reloadPage()
            props.onHide()
            Notify.notifySuccessTopCenter('User was added Succefully And Email was sent')
          } else {
            Notify.notifyErrorTopCenter('Failed to add new User')
          }
        })
      setSuccess(true)
    } catch (e) {}
  }

  useEffect(() => {
    var body = {
      table: gender,
    }
    axios
      .post(Lookup_URL, body, {
        headers: { 'content-Type': 'application/json' },
      })
      .then((data) => {
        console.log(data.data.data)
        setGenderOptions(data.data.data)
      })
  }, [])

  useEffect(() => {
    var body = {
      table: usertype,
    }
    axios
      .post(Lookup_URL, body, {
        headers: { 'content-Type': 'application/json' },
      })
      .then((data) => {
        console.log(data.data.data)
        setUserTypeOptions(data.data.data)
      })
  }, [])

  return (
    <form onSubmit={handleSubmit(submitUserData)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">Add New Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                FirstName
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                className="form-control"
                {...register('first_name')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Middle Name
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="text"
                placeholder="Middle Name"
                name="middle_name"
                className="form-control"
                {...register('middle_name')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Last Name
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                className="form-control"
                {...register('last_name')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Gender
                <span className="red-color">*</span>
              </Form.Label>
              <Form.Select aria-label="Default select example" {...register('gender')}>
                <option>Choose Gender</option>
                {genderOption.length > 0 &&
                  genderOption.map((gender) => (
                    <option key={gender.optionId} value={gender.optionId}>
                      {gender.optionName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Email
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="form-control"
                {...register('email')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Phone
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                className="form-control"
                {...register('phone')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Date of Birth
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="date"
                placeholder="Date of Birth"
                name="dob"
                className="form-control"
                {...register('dob')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                User Role
                <span className="red-color">*</span>
              </Form.Label>
              <Form.Select aria-label="Default select example" {...register('user_type')}>
                <option>Choose Role</option>
                {userTypeOption.length > 0 &&
                  userTypeOption.map((user_type) => (
                    <option key={user_type.optionId} value={user_type.optionId}>
                      {user_type.optionName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
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

export default AddClient
