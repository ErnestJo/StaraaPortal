import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Modal, Form, Row, Col, Badge } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import AddProjectForm from '../../components/forms/AddProjectForm'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { CButton, CBadge } from '@coreui/react'
import ExcelJS from 'exceljs'
import { exportDataGrid } from 'devextreme/excel_exporter'
import saveAs from 'file-saver'
import Notify from '../../Helper/Notify'
import * as Icon from 'react-bootstrap-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CIcon from '@coreui/icons-react'
import { cilFingerprint } from '@coreui/icons'

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

const GetStaff_URL = '/api/StaffManagement/GetAllStaff'
const AddStaff_URL = '/api/StaffManagement/AddStaff'
const GetSingle_URL = '/api/StaffManagement/GetSingleStaff'
const Disable_URL = '/api/StaffManagement/DisableStaff'
const Active_URL = '/api/StaffManagement/ActivateStaff'
const ChangePassword_URL = '/api/StaffManagement/ChangeStaffPassword'

const schema = yup.object().shape({
  project_name: yup.string().required(),
  project_status: yup.number().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  client: yup.number().required(),
})
function CustomModal(props) {
  const [projectStatusOption, setProjectStatusOptions] = useState([])
  const [clientsOption, setClientsOptions] = useState([])
  const [staffOption, setStaffOptions] = useState([])

  const userRef = useRef()

  React.useEffect(() => {}, [])
  const { register, errors, handleSubmit, watch, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const submitProjectData = (data) => {
    // try {
    //   var body = {
    //     project_name: data.project_name,
    //     project_status: parseInt(data.project_status),
    //     start_date: data.start_date,
    //     end_date: data.end_date,
    //     end_date: data.end_date,
    //     client: parseInt(data.client),
    //     product_owner: parseInt(data.product_owner),
    //   }
    //   console.log(body)
    //   axios
    //     .post(AddProject_URL, body, {
    //       headers: { 'content-Type': 'application/json' },
    //     })
    //     .then((data) => {
    //       reset()
    //       console.log(data.data[0].data[0])
    //       if ((data.data[0].data[0].code = 111)) {
    //         props.reloadPage()
    //         props.onHide()
    //         Notify.notifySuccess('Project was added Succefully')
    //       } else {
    //         Notify.notifyError('failed to add new project')
    //       }
    //     })
    //   setSuccess(true)
    // } catch (e) {}
  }

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: GetClients_URL,
  //   })
  //     .then((data) => {
  //       console.log(data.data[0].data)
  //       setClientsOptions(data.data[0].data)
  //       console.log(setClientsOptions)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: GetProjectStatus_URL,
  //   })
  //     .then((data) => {
  //       console.log(data.data[0].data)
  //       setProjectStatusOptions(data.data[0].data)
  //       console.log(setClientsOptions)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: GetStaff_URL,
  //   })
  //     .then((data) => {
  //       console.log(data.data[0].data)
  //       setStaffOptions(data.data[0].data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitProjectData)}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="project_name"
                  {...register('project_name')}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Label>Project Client</Form.Label>
              <Form.Select aria-label="Default select example" {...register('client')}>
                <option value="">Project Client</option>
                {clientsOption.length > 0 &&
                  clientsOption.map((client) => (
                    <option key={client.client_id} value={client.client_id}>
                      {client.client_name}{' '}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Start Date"
                  name="start_date"
                  {...register('start_date')}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>End date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter End Date"
                  autoComplete="off"
                  name="end_date"
                  {...register('end_date')}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Label>Project Status</Form.Label>
              <Form.Select
                id="disabledSelect"
                aria-label="Default select status"
                {...register('project_status')}
                required
              >
                <option value=""> Project status</option>
                {projectStatusOption.length > 0 &&
                  projectStatusOption.map((project_status) => (
                    <option key={project_status.projectId} value={project_status.projectId}>
                      {project_status.projectStatus}{' '}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Product owner</Form.Label>
              <Form.Select aria-label="Default select example" {...register('product_owner')}>
                <option>Choose PO</option>
                {staffOption.length > 0 &&
                  staffOption.map((product_owner) => (
                    <option key={product_owner.staff_id} value={product_owner.staff_id}>
                      {product_owner.staff}
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

const StaffManagement = () => {
  const [modalShow, setModalShow] = React.useState(false)
  const [dataProject, setDataProject] = useState([])

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
    GetDataTable()
  }, [])

  const GetDataTable = () => {
    axios({
      method: 'GET',
      url: GetStaff_URL,
    })
      .then((data) => {
        console.log(data.data.data)
        setDataProject(data.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Card>
        <Card.Header>
          <CButton color="primary" onClick={() => setModalShow(true)}>
            Add New Staff
          </CButton>
        </Card.Header>
        <Card.Body>
          <DataGrid
            ref={(ref) => (dataGrid = ref)}
            dataSource={dataProject}
            showRowLines={true}
            showBorders={true}
          >
            <Column dataField="staffId" alignment="center" caption="Staff Id" />
            <Column dataField="firstName" alignment="center" caption="First Name" />
            <Column dataField="middleName" alignment="center" caption="Middle Name" />
            <Column dataField="lastName" alignment="center" caption="Last Name" />
            <Column dataField="gender" alignment="center" caption="Gender" />
            <Column dataField="email" alignment="center" caption="Email" />
            <Column dataField="usertype" alignment="center" caption="User Role" />
            <Column
              dataField="isActive"
              alignment="center"
              caption="Is Acive"
              allowFiltering={false}
              cellRender={(e) => {
                if (e.data.isActive == 1) {
                  console.log(e.data.isActive)
                  return (
                    <CBadge color="success" shape="rounded-pill">
                      {' '}
                      Active{' '}
                    </CBadge>
                  )
                } else {
                  return (
                    <CBadge color="danger" shape="rounded-pill">
                      {' '}
                      Deactivate{' '}
                    </CBadge>
                  )
                }
              }}
            />

            <Column
              dataField="staff_id"
              alignment="center"
              caption="Action"
              allowFiltering={false}
              cellRender={(e) => {
                if (e.data.isActive == 1) {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <CButton>
                        <Icon.Eye />
                      </CButton>

                      <CButton
                        className="mx-1"
                        onClick={() => {
                          console.log(e.data)
                          var body = {
                            staff_id: e.data.staffId,
                          }
                          axios
                            .post(Disable_URL, body, {
                              headers: { 'content-Type': 'application/json' },
                            })
                            .then((data) => {
                              console.log(data.data.data.code)
                              if (data.data.data.code == 200) {
                                GetDataTable()
                                Notify.notifySuccessTopCenter(data.data.data.message)
                              } else {
                                Notify.notifyErrorTopCenter('Error occured')
                              }
                            })
                        }}
                      >
                        <Icon.Trash />
                      </CButton>
                    </div>
                  )
                } else {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <CButton>
                        <Icon.Eye />
                      </CButton>

                      <CButton
                        className="mx-1"
                        onClick={() => {
                          console.log(e.data)
                          var body = {
                            staff_id: e.data.staffId,
                          }
                          axios
                            .post(Active_URL, body, {
                              headers: { 'content-Type': 'application/json' },
                            })
                            .then((data) => {
                              console.log(data.data.data.code)
                              if (data.data.data.code == 200) {
                                GetDataTable()
                                Notify.notifySuccessTopCenter(data.data.data.message)
                              } else {
                                Notify.notifyErrorTopCenter('Error occured')
                              }
                            })
                        }}
                      >
                        <Icon.Unlock />
                      </CButton>
                    </div>
                  )
                }
              }}
            />
            <ColumnChooser enabled={true} />
            <Selection mode="multiple" />
            <Export enabled={true} fileName="Staff" allowExportSelectedData={true} />
            <Paging defaultPageSize={5} />
            <FilterRow visible={state.showFilterRow} applyFilter={state.currentFilter} />
            <HeaderFilter visible={state.showHeaderFilter} />
            <Selection mode="single" />
            <SearchPanel visible={true} width={240} placeholder="Search..." />
            <Summary>
              <TotalItem column="staffId" summaryType="count" />
            </Summary>
          </DataGrid>
        </Card.Body>
      </Card>
      <CustomModal show={modalShow} reloadpage={GetDataTable} onHide={() => setModalShow(false)}>
        <AddProjectForm />
      </CustomModal>
    </div>
  )
}

CustomModal.defaultProps = {
  title: 'Add Staff',
}
CustomModal.propTypes = {
  onHide: PropTypes.func,
}
export default StaffManagement
