import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Button, Card, Modal, Form, Row, Col, Badge } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ExcelJS from 'exceljs'
import { exportDataGrid } from 'devextreme/excel_exporter'
import saveAs from 'file-saver'
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
import Notify from '../../Helper/Notify'

const GetPropertiesStatus_URL = 'api/get_properties_status'
const GetAddres_URL = '/api/get_address'
const AddProperties_URL = '/api/add_properties'
const GetProperties_URL = '/api/get_properties'
const UpdateProperties_URL = '/api/update_properties'
const UpdatePropertiesStatus_URL = '/api/update_properties_status'

const schema = yup.object().shape({
  properties_name: yup.string().required(),
  serial_number: yup.string().required(),
  model: yup.string().required(),
  properties_status: yup.number().required(),
  imei: yup.number().required(),
})
function CustomModal(props) {
  const [propStatusOption, setPropStatusOption] = useState([])

  const userRef = useRef()

  React.useEffect(() => {}, [])
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const submitPropertiesData = (data) => {
    try {
      var body = {
        properties_name: data.properties_name,
        serial_number: data.serial_number,
        imei: data.imei,
        model: data.model,
        properties_status: parseInt(data.properties_status),
      }
      console.log(body)
      axios
        .post(AddProperties_URL, body, {
          headers: { 'content-Type': 'application/json' },
        })
        .then((data) => {
          reset()
          console.log(data.data[0].data[0])
          if ((data.data[0].data[0].code = 111)) {
            props.reloadPage()
            props.onHide()
            Notify.notifySuccess('Properties was added Succefully')
          } else {
            Notify.notifyError('failed to add new Properties')
          }
        })
      setSuccess(true)
    } catch (e) {}
  }

  const Getproperties = () => {
    axios({
      method: 'GET',
      url: GetProperties_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setPropStatusOption(data.data[0].data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    Getproperties()
    axios({
      method: 'GET',
      url: GetPropertiesStatus_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setPropStatusOption(data.data[0].data)
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
        <Form onSubmit={handleSubmit(submitPropertiesData)}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Propertiy Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Propertiy Name"
                  name="properties_name"
                  {...register('properties_name')}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              {' '}
              <Form.Label>Property Status</Form.Label>
              <Form.Select aria-label="Default select" {...register('properties_status')} required>
                <option value="">Choose Status </option>
                {propStatusOption.length > 0 &&
                  propStatusOption.map((properties_status) => (
                    <option
                      key={properties_status.properties_status_id}
                      value={properties_status.properties_status_id}
                    >
                      {properties_status.properties_status_name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Imei</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Imei"
                  name="imei"
                  {...register('imei')}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>model</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="model"
                  name="model"
                  {...register('model')}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Serial Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Serial Number"
                  name="serial_number"
                  {...register('serial_number')}
                  required
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

const PropertiesManagement = () => {
  const [modalShow, setModalShow] = React.useState(false)
  const [data, setData] = useState([])
  const [dataProperties, setDataProperties] = useState([])

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
      url: GetProperties_URL,
    })
      .then((data) => {
        console.log(data.data[0].data)
        setDataProperties(data.data[0].data)
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
            Add Properties
          </Button>
        </Card.Header>
        <Card.Body>
          <DataGrid
            ref={(ref) => (dataGrid = ref)}
            dataSource={dataProperties}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            columnResizingMode="nextColumn"
            columnAutoWidth={true}
          >
            <Column dataField="properties_name" caption="Item Name" />
            <Column dataField="model" caption="Model" />
            <Column dataField="imei" caption="Imei" />
            <Column dataField="serial_number" caption="Serial Number" />
            <Column
              dataField="properties_status_name"
              caption="Properties "
              allowFiltering={false}
              cellRender={(e) => {
                if (e.data.properties_status_name == 'Good Condition') {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge bg="success">{e.data.properties_status_name}</Badge>
                      {console.log(e.data)}
                    </div>
                  )
                } else {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge bg="secondary">{e.data.properties_status_name}</Badge>
                    </div>
                  )
                }
              }}
            />
            <Column
              dataField="properties_id"
              caption="Actions"
              allowFiltering={false}
              cellRender={(e) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* <Button variant="success" className="mx-1">
                    <Icon.Check2 />
                  </Button> */}
                  {/* <Button variant="warning" className="mx-1">
                    <Icon.Pencil />
                  </Button> */}
                  <Button
                    variant="danger"
                    onClick={() => {
                      console.log(e.data.properties_status_name)
                      if (e.data.properties_status_name == 'bad condition') {
                        var body = {
                          properties_id: e.data.properties_id,
                          properties_status: 1,
                        }
                        console.log(body)
                        axios
                          .post(UpdatePropertiesStatus_URL, body, {
                            headers: { 'content-Type': 'application/json' },
                          })
                          .then((data) => {
                            console.log(data.data[0].data[0])
                            if ((data.data[0].data[0].code = 111)) {
                              fetchData()
                              Notify.notifySuccess('Properties Status was added changed')
                            } else {
                              Notify.notifyError('Properties Status was not Changed')
                            }
                          })
                      } else if (e.data.properties_status_name == 'Good Condition') {
                        var body = {
                          properties_id: e.data.properties_id,
                          properties_status: 2,
                        }
                        console.log(body)
                        axios
                          .post(UpdatePropertiesStatus_URL, body, {
                            headers: { 'content-Type': 'application/json' },
                          })
                          .then((data) => {
                            console.log(data.data[0].data[0])
                            if ((data.data[0].data[0].code = 111)) {
                              fetchData()
                              Notify.notifySuccess('Properties Status was  Changed')
                            } else {
                              Notify.notifyError('Properties Status was not Changed')
                            }
                          })
                      }
                    }}
                    className="mx-1"
                  >
                    <Icon.ArrowClockwise />
                  </Button>
                </div>
              )}
            />
            <ColumnChooser enabled={true} />
            <Selection mode="multiple" />
            <Export enabled={true} fileName="Properties" allowExportSelectedData={true} />
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
      <CustomModal
        show={modalShow}
        reloadPage={fetchData}
        onHide={() => setModalShow(false)}
      ></CustomModal>
    </div>
  )
}

CustomModal.defaultProps = {
  title: 'Add Properties',
}
CustomModal.propTypes = {
  onHide: PropTypes.func,
}

export default PropertiesManagement
