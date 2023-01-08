import React from 'react'
import { Button, Card, Modal, Form, Row, Col, Badge, FormGroup, Label } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Notify } from 'src/Helper'
import moment from 'moment'
import Category from './../../views/business/Category'

const AddProduct_URL = '/api/BusinessManagement/AddProduct'
const GetCategory_URL = '/api/BusinessManagement/GetAllCategory'

const Addproduct = ({ ...props }) => {
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [CategoryOption, setCategoryOptions] = useState([])

  const { register, errors, handleSubmit, watch, reset } = useForm({
    mode: 'onChange',
  })

  const submitUserData = (data) => {
    try {
      var body = {
        productname: data.productname,
        productprice: parseInt(data.productprice),
        category: parseInt(data.category),
      }
      console.log(body)
      axios
        .post(AddProduct_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data)
          if ((data.data.data.code = 200)) {
            props.reloadPage()
            props.onHide()
            Notify.notifySuccessTopCenter('Product was added')
          } else {
            Notify.notifyErrorTopCenter('Failed to add new Product')
          }
        })
      setSuccess(true)
    } catch (e) {}
  }

  useEffect(() => {
    axios
      .get(GetCategory_URL, {
        headers: { 'content-Type': 'application/json' },
      })
      .then((data) => {
        console.log(data.data.data)
        setCategoryOptions(data.data.data)
      })
  }, [])
  return (
    <form onSubmit={handleSubmit(submitUserData)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Product Name
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="text"
                placeholder="Product Name"
                name="productname"
                className="form-control"
                {...register('productname')}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <span className="red-color">*</span>
              </Form.Label>
              <Form.Select aria-label="Default select example" {...register('category')}>
                <option>Choose Category</option>
                {CategoryOption.length > 0 &&
                  CategoryOption.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Product Price
                <span className="red-color">*</span>
              </Form.Label>
              <input
                type="number"
                placeholder="Product Price"
                name="productprice"
                className="form-control"
                {...register('productprice')}
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

export default Addproduct
