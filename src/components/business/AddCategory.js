import React from 'react'
import { Button, Card, Modal, Form, Row, Col, Badge, FormGroup, Label } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Notify } from 'src/Helper'

const AddCategory_URL = '/api/BusinessManagement/AddCategory'

const AddCategory = ({ ...props }) => {
  React.useEffect(() => {}, [])
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const { register, errors, handleSubmit, watch, reset } = useForm({
    mode: 'onChange',
  })

  const submitUserData = (data) => {
    try {
      var body = {
        categoryName: data.categoryName,
      }
      console.log(body)
      axios
        .post(AddCategory_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data)
          if ((data.data.data.code = 200)) {
            props.reloadPage()
            props.onHide()
            Notify.notifySuccessTopCenter('New Category was added')
          } else {
            Notify.notifyErrorTopCenter('Failed to add new Category')
          }
        })
      setSuccess(true)
    } catch (e) {}
  }

  return (
    <form onSubmit={handleSubmit(submitUserData)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Category Name
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="text"
                placeholder="Category Name"
                name="categoryName"
                className="form-control"
                {...register('categoryName')}
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

export default AddCategory
