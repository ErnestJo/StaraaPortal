import React from 'react'
import { Button, Card, Modal, Form, Row, Col, Badge, FormGroup, Label } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Notify } from 'src/Helper'
import moment from 'moment'

const AddService_URL = '/api/BusinessManagement/AddService'
const GetStaff_URL = '/api/StaffManagement/GetAllStaff'
const GetClient_URL = '/api/UserManagement/GetAllStaff'
const GetProduct_URL = '/api/BusinessManagement/GetAllProduct'

const AddService = ({ ...props }) => {
  React.useEffect(() => {}, [])
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [productOption, setProductOptions] = useState([])
  const [staffOption, setStaffOptions] = useState([])
  const [clientOption, setClientOptions] = useState([])

  const { register, errors, handleSubmit, watch, reset } = useForm({
    mode: 'onChange',
  })

  const submitUserData = (data) => {
    try {
      var body = {
        serviceName: data.serviceName,
        staffid: parseInt(data.staffid),
        userId: parseInt(data.userId),
        servicePrice: parseFloat(data.servicePrice),
        servicePayment: 0,
        serviceDoneDate: data.serviceNextDate,
        serviceNextDate: data.serviceNextDate,
      }
      console.log(body)
      axios
        .post(AddService_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data)
          if ((data.data.data.code = 200)) {
            props.reloadPage()
            props.onHide()
            Notify.notifySuccessTopCenter('Service was added Service')
          } else {
            Notify.notifyErrorTopCenter('Failed to add new Service')
          }
        })
      setSuccess(true)
    } catch (e) {}
  }

  useEffect(() => {
    axios
      .get(GetStaff_URL, {
        headers: { 'content-Type': 'application/json' },
      })
      .then((data) => {
        console.log(data.data.data)
        setStaffOptions(data.data.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(GetClient_URL, {
        headers: { 'content-Type': 'application/json' },
      })
      .then((data) => {
        console.log(data.data.data)
        setClientOptions(data.data.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(GetProduct_URL, {
        headers: { 'content-Type': 'application/json' },
      })
      .then((data) => {
        console.log(data.data.data)
        setProductOptions(data.data.data)
      })
  }, [])

  return (
    <form onSubmit={handleSubmit(submitUserData)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">Add New Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Service Name
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="text"
                placeholder="Service Name"
                name="serviceName"
                className="form-control"
                {...register('serviceName')}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Staff Incharge
                <span className="red-color">*</span>
              </Form.Label>
              <Form.Select aria-label="Default select example" {...register('staffid')}>
                <option>Choose client</option>
                {staffOption.length > 0 &&
                  staffOption.map((staffid) => (
                    <option key={staffid.staffId} value={staffid.staffId}>
                      {staffid.firstName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Client
                <span className="red-color">*</span>
              </Form.Label>
              <Form.Select aria-label="Default select example" {...register('userId')}>
                <option>Choose client</option>
                {clientOption.length > 0 &&
                  clientOption.map((userId) => (
                    <option key={userId.userId} value={userId.userId}>
                      {userId.firstName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Service Price
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="number"
                placeholder="servicePrice"
                name="Service Price"
                className="form-control"
                {...register('servicePrice')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Next Appointment Date
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="date"
                placeholder="service Next Date"
                name="serviceNextDate"
                className="form-control"
                {...register('serviceNextDate')}
                required
              />
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

export default AddService
