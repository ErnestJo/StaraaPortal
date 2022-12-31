import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Modal, Form, Row, Col, Badge } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import AddProjectForm from '../../components/forms/AddProjectForm'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
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

const GetClients_URL = '/api/get_client'
const AddProject_URL = '/api/add_project'
const GetProjectStatus_URL = '/api/get_project_status'
const GetProject_URL = '/api/get_project'
const GetStaff_URL = '/api/get_staff'
const UpdateProject_URL = '/api/update_project'
const UpdateStatusProject_URL = '/api/update_project_status'

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
    try {
      var body = {
        project_name: data.project_name,
        project_status: parseInt(data.project_status),
        start_date: data.start_date,
        end_date: data.end_date,
        end_date: data.end_date,
        client: parseInt(data.client),
        product_owner: parseInt(data.product_owner),
      }
      console.log(body)
      axios
        .post(AddProject_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            props.reloadPage()
            props.onHide()
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
      url: GetClients_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setClientsOptions(data.data[0].data)
        console.log(setClientsOptions)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios({
      method: 'GET',
      url: GetProjectStatus_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setProjectStatusOptions(data.data[0].data)
        console.log(setClientsOptions)
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

const ProjectManagement = () => {
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
      url: GetProject_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setDataProject(data.data[0].data)
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
            Add Project
          </Button>
        </Card.Header>
        <Card.Body>
          <DataGrid
            ref={(ref) => (dataGrid = ref)}
            dataSource={dataProject}
            // defaultColumns={columns}
            showRowLines={true}
            showBorders={true}
          >
            <Column dataField="project" caption="Projects" />
            <Column dataField="client" caption="Clients" />
            <Column dataField="po" caption="Product Owner" />
            <Column dataField="startdate" caption="Start Date" />
            <Column dataField="enddate" caption="End Date" />
            <Column
              dataField="projectstatus"
              caption="Project Status"
              allowFiltering={false}
              cellRender={(e) => {
                if (e.data.projectstatus == 'Stopped') {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge bg="danger">{e.data.projectstatus}</Badge>
                    </div>
                  )
                } else if (e.data.projectstatus == 'On Going') {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge bg="primary">{e.data.projectstatus}</Badge>
                    </div>
                  )
                } else if (e.data.projectstatus == 'New') {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge bg="success">{e.data.projectstatus}</Badge>
                    </div>
                  )
                }
              }}
            ></Column>
            <Column
              dataField="project_id"
              caption="Actions"
              allowFiltering={false}
              cellRender={(e) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="success"
                    onClick={() => {
                      console.log(e.data)
                      if (e.data.projectstatus != 'On Going') {
                        var body = {
                          project_id: e.data.project_id,
                          project_status: 1,
                        }
                        console.log(body)
                        axios
                          .post(UpdateStatusProject_URL, body, {
                            headers: { 'content-Type': 'application/json' },
                          })
                          .then((data) => {
                            console.log(data.data[0].data[0])
                            if ((data.data[0].data[0].code = 111)) {
                              GetDataTable()
                              Notify.notifySuccess('Project Started added Succefully')
                            } else {
                              Notify.notifyError('This project failed Stopped')
                            }
                          })
                      } else {
                        Notify.notifyError('This project is on progress, It can not be started')
                      }
                    }}
                    className="mx-1"
                  >
                    <Icon.Check2 />
                  </Button>
                  {/* <Button variant="warning" className="mx-1">
                    <Icon.Pencil />
                  </Button> */}
                  <Button
                    variant="danger"
                    onClick={() => {
                      console.log(e.data)
                      if (e.data.projectstatus != 'Stopped') {
                        var body = {
                          project_id: e.data.project_id,
                          project_status: 2,
                        }
                        console.log(body)
                        axios
                          .post(UpdateStatusProject_URL, body, {
                            headers: { 'content-Type': 'application/json' },
                          })
                          .then((data) => {
                            console.log(data.data[0].data[0])
                            if ((data.data[0].data[0].code = 111)) {
                              GetDataTable()
                              Notify.notifySuccess('Project Stopped')
                            } else {
                              Notify.notifyError('This project failed Stopped')
                            }
                          })
                      } else {
                        Notify.notifyError('This project is Stopped It can not be stopped')
                      }
                    }}
                    className="mx-1"
                  >
                    <Icon.StopBtn />
                  </Button>
                </div>
              )}
            />{' '}
            <ColumnChooser enabled={true} />
            <Selection mode="multiple" />
            <Export enabled={true} fileName="Projects" allowExportSelectedData={true} />
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
      <CustomModal show={modalShow} reloadPage={GetDataTable} onHide={() => setModalShow(false)}>
        <AddProjectForm />
      </CustomModal>
    </div>
  )
}

CustomModal.defaultProps = {
  title: 'Add Project',
}
CustomModal.propTypes = {
  onHide: PropTypes.func,
}
export default ProjectManagement
