import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Button, Card, Modal, Form, Row, Col, Badge } from 'react-bootstrap'
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

const GetProject_URL = '/api/get_project'
const GetStaff_URL = '/api/get_staff'
const GetProperties_URL = '/api/get_properties'
const GetPropertiesReq_URL = '/api/get_properties_request'
const GetReqStatus_URL = '/api/get_request_status'
const Addproperites_URL = '/api/add_properties_req'
const UpdatePropertiesReqStatus_URL = '/api/update_properties_req_status'

function CustomModal(props) {
  const [projectOption, setProjectOptions] = useState([])
  const [staffOption, setStaffOptions] = useState([])
  const [reqStatusOption, setReqStatusOptions] = useState([])
  const [propertiesOption, setPropertiesOptions] = useState([])

  const userRef = useRef()

  React.useEffect(() => {}, [])
  const { register, errors, handleSubmit, watch, reset } = useForm({
    mode: 'onChange',
    //  resolver: yupResolver(schema),
  })

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const submitReqData = (data) => {
    try {
      var body = {
        req_name: data.req_name,
        req_date: data.req_date,
        request_status: parseInt(data.request_status),
        staff: parseInt(data.staff),
        propertiy: parseInt(data.propertiy),
        project: parseInt(data.project),
      }
      console.log(body)
      axios
        .post(Addproperites_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            Notify.notifySuccess('Project was added Succefully')
          } else {
            Notify.notifyError('failed to add new project')
          }
        })

      setSuccess(true)
    } catch (e) {}
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: GetProject_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setProjectOptions(data.data[0].data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios({
      method: 'GET',
      url: GetStaff_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setStaffOptions(data.data[0].data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios({
      method: 'GET',
      url: GetProperties_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setPropertiesOptions(data.data[0].data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios({
      method: 'GET',
      url: GetReqStatus_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setReqStatusOptions(data.data[0].data)
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
        <Form onSubmit={handleSubmit(submitReqData)}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Request Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Request Name"
                  name="req_name"
                  {...register('req_name')}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Label>Property/Item</Form.Label>
              <Form.Select aria-label="Default select" {...register('propertiy')}>
                <option>Choose Item</option>
                {propertiesOption.length > 0 &&
                  propertiesOption.map((propertiy) => (
                    <option key={propertiy.properties_id} value={propertiy.properties_id}>
                      {propertiy.properties_name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>For Project</Form.Label>
              <Form.Select aria-label="Default select example" {...register('project')}>
                <option>Choose Project</option>
                {projectOption.length > 0 &&
                  projectOption.map((project) => (
                    <option key={project.project_id} value={project.project_id}>
                      {project.project}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Staff</Form.Label>
              <Form.Select aria-label="Default select example" {...register('staff')}>
                <option>Choose staff</option>
                {staffOption.length > 0 &&
                  staffOption.map((staff) => (
                    <option key={staff.staff_id} value={staff.staff_id}>
                      {staff.staff}
                    </option>
                  ))}
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Label>Request Status</Form.Label>
              <Form.Select aria-label="Default select example" {...register('request_status')}>
                <option>Request status options</option>
                {reqStatusOption.length > 0 &&
                  reqStatusOption.map((request_status) => (
                    <option
                      key={request_status.request_status_id}
                      value={request_status.request_status_id}
                    >
                      {request_status.request_status_name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Req date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Request date"
                  {...register('req_date')}
                />
              </Form.Group>
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

const Reports = () => {
  const [modalShow, setModalShow] = React.useState(false)
  const [dataPropertiesReqs, setDataPropertiesReq] = useState([])

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
    const worksheet = workbook.addWorksheet('request properties sheet')

    exportDataGrid({
      component: e.component,
      worksheet: worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'requestList.xlsx')
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
    axios({
      method: 'GET',
      url: GetPropertiesReq_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setDataPropertiesReq(data.data[0].data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Card>
        <Card.Header>
          <h3>Reports</h3>
        </Card.Header>
        <Card.Body>
          <DataGrid
            ref={(ref) => (dataGrid = ref)}
            dataSource={dataPropertiesReqs}
            // defaultColumns={columns}
            showRowLines={true}
            showBorders={true}
          >
            <Column dataField="project_name" caption="Project Name" />
            <Column dataField="req_name" caption="request Name" />
            <Column dataField="staff" caption="Staff Name" />
            <Column dataField="po" caption="product Owner" />
            <Column dataField="properties_name" caption="Item Name" />
            <Column dataField="req_date" caption="Request Date" />
            <Column
              dataField="request_status"
              caption="Request status"
              allowFiltering={false}
              cellRender={(e) => {
                if (e.data.request_status == 'Approved') {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge pill bg="success">
                        {e.data.request_status}
                      </Badge>
                    </div>
                  )
                } else if (e.data.request_status == 'Pending') {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge pill bg="secondary">
                        {e.data.request_status}
                      </Badge>
                    </div>
                  )
                } else if (e.data.request_status == 'Rejected') {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge pill bg="danger">
                        {e.data.request_status}
                      </Badge>
                    </div>
                  )
                } else if (e.data.request_status == 'Not Redurned') {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge pill bg="danger">
                        {e.data.request_status}
                      </Badge>
                    </div>
                  )
                } else if (e.data.request_status == 'Returned') {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge pill bg="success">
                        {e.data.request_status}
                      </Badge>
                    </div>
                  )
                }
              }}
            />

            <ColumnChooser enabled={true} />
            <Selection mode="multiple" />
            <Export enabled={true} fileName="Request" allowExportSelectedData={true} />
            <Paging defaultPageSize={10} />
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
      <CustomModal show={modalShow} onHide={() => setModalShow(false)}></CustomModal>
    </div>
  )
}

CustomModal.defaultProps = {
  title: 'Add Properties Request',
}
CustomModal.propTypes = {
  onHide: PropTypes.func,
}
export default Reports
