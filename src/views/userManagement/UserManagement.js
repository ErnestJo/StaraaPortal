import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Button, Card, Modal, Form, Row, Col } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ExcelJS from 'exceljs'
import { exportDataGrid } from 'devextreme/excel_exporter'
import saveAs from 'file-saver'
import Notify from '../../Helper/Notify'
import * as Icon from 'react-bootstrap-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Summary,
  TotalItem,
  ColumnChooser,
  Export,
  Selection,
  Lookup,
  Paging,
} from 'devextreme-react/data-grid'

const GetGender_URL = '/api/get_gender'
const GetAddres_URL = '/api/get_address'
const AddStaff_URL = '/api/add_staff'
const GteUser_URL = '/api/get_staff'
const UpdateStaff_URL = '/api/update_staff'

const schema = yup.object().shape({
  first_name: yup.string().required(),
  middle_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  gender: yup.number().required(),
  addres: yup.number().required(),
})

function CustomModal(props) {
  const [addressOption, setAddressOptions] = useState([])
  const [genderOption, setGenderOptions] = useState([])

  const userRef = useRef()

  React.useEffect(() => {}, [])
  const { register, errors, handleSubmit, watch, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const submituserData = (data) => {
    try {
      var body = {
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        email: data.email,
        addres: parseInt(data.addres),
        gender: parseInt(data.gender),
      }
      console.log(body)
      axios
        .post(AddStaff_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            props.reloadPage()
            props.onHide()
            Notify.notifySuccess('User was added Succefully')
          } else {
            Notify.notifyError('failed to add new User')
          }
        })

      setSuccess(true)
    } catch (e) {}
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: GetGender_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setGenderOptions(data.data[0].data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios({
      method: 'GET',
      url: GetAddres_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setAddressOptions(data.data[0].data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submituserData)}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="first_name"
                  {...register('first_name')}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Middle Name"
                  name="middle_name"
                  {...register('middle_name')}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="last_name"
                  {...register('last_name')}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Staff Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  {...register('email')}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Label>Gender</Form.Label>
              <Form.Select aria-label="Default select" {...register('gender')} required>
                <option value="">Choose Gender </option>
                {genderOption.length > 0 &&
                  genderOption.map((gender) => (
                    <option key={gender.gender_id} value={gender.gender_id}>
                      {gender.gender_name}
                    </option>
                  ))}
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Label>Address</Form.Label>
              <Form.Select aria-label="Default select example" {...register('addres')} required>
                <option value="">select Address</option>
                {addressOption.length > 0 &&
                  addressOption.map((addres) => (
                    <option key={addres.address_id} value={addres.address_id}>
                      {addres.address_name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>

          <Col md={12} className="mt-2">
            <Button onClick={props.onHide}>Close</Button>
            <Button className="float-end" type="submit">
              {props.title}
            </Button>
          </Col>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
const UserManagement = () => {
  const [modalShow, setModalShow] = React.useState(false)
  const [dataStaff, setDataStaff] = useState([])

  const applyFilterTypes = [
    {
      key: 'auto',
      name: 'Immediately',
    },
    {
      key: 'onClick',
      name: 'On Button Click',
    },
  ]

  const onExporting = (e) => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('User sheet')

    exportDataGrid({
      component: e.component,
      worksheet: worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'UserList.xlsx')
      })
    })
    e.cancel = true
  }

  const [state, setState] = useState({
    data: [],
    showFilterRow: true,
    showHeaderFilter: true,
    currentFilter: applyFilterTypes[0].key,
    startDate: new Date(),
    endDate: new Date(),
  })
  var dataGrid = null

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios({
      method: 'GET',
      url: GteUser_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setDataStaff(data.data[0].data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Card>
        <Card.Header>
          <Button className="primary" onClick={() => setModalShow(true)}>
            Add Staff
          </Button>
        </Card.Header>
        <Card.Body>
          <DataGrid
            ref={(ref) => (dataGrid = ref)}
            dataSource={dataStaff}
            // defaultColumns={columns}
            showRowLines={true}
            showBorders={true}
          >
            {/* <Column dataField="staff_id" caption="Staff Id" /> */}
            <Column dataField="email" caption="Email" />
            <Column dataField="staff" caption="Full Name" />
            <Column dataField="addres_name" caption="Address" />
            <Column dataField="gender_name" caption="Gender" />
            <Column dataField="role" caption="Role" />
            {/* <Column
              dataField="staff_id"
              caption="Actions"
              allowFiltering={false}
              cellRender={(e) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="success" className="mx-1">
                    <Icon.Check2 />
                  </Button>
                  <Button variant="warning" className="mx-1">
                    <Icon.Pencil />
                  </Button>
                  <Button variant="danger" className="mx-1">
                    <Icon.Trash />
                  </Button>
                </div>
              )}
            /> */}
            <ColumnChooser enabled={true} />
            <Selection mode="multiple" />
            <Export enabled={true} fileName="User" allowExportSelectedData={true} />
            <Paging defaultPageSize={5} />
            <FilterRow visible={state.showFilterRow} applyFilter={state.currentFilter} />
            <HeaderFilter visible={state.showHeaderFilter} />
            <Selection mode="single" />
            <SearchPanel visible={true} width={240} placeholder="Search..." />
            <Summary>
              <TotalItem column="id_no" summaryType="count" />
            </Summary>
          </DataGrid>
        </Card.Body>
      </Card>
      <CustomModal
        show={modalShow}
        reloadPage={fetchData}
        onHide={() => setModalShow(false)}
      ></CustomModal>
    </div>
  )
}

CustomModal.defaultProps = {
  title: 'Add Staff',
}
CustomModal.propTypes = {
  onHide: PropTypes.func,
}
export default UserManagement
