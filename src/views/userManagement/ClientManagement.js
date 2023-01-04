import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { CButton, CBadge } from '@coreui/react'
import { Button, Card, Modal, Form, Row, Col } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import ExcelJS from 'exceljs'
import { exportDataGrid } from 'devextreme/excel_exporter'
import saveAs from 'file-saver'
import Notify from '../../Helper/Notify'
import * as Icon from 'react-bootstrap-icons'
import LoadingSpinner from '../../components/Spinner/Spinner'
import AddClient from 'src/components/clientManagement/AddClient'
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

const GetClient_URL = '/api/UserManagement/GetAllStaff'
// const GetSingle_URL = '/api/StaffManagement/GetSingleStaff'
// const Disable_URL = '/api/StaffManagement/DisableStaff'
// const Active_URL = '/api/StaffManagement/ActivateStaff'

const ClientManagement = () => {
  const [modalShow, setModalShow] = React.useState(false)
  const [dataClient, setDataClient] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
    toggleAddNewUser: false,
    endDate: new Date(),
  })
  var dataGrid = null

  useEffect(() => {
    if (dataClient == 0) {
      GetDataTable()
    }
  }, [dataClient])

  const GetDataTable = () => {
    setIsLoading(true)
    axios({
      method: 'GET',
      url: GetClient_URL,
    })
      .then((data) => {
        console.log(data.data.data)
        setDataClient(data.data.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <Card>
        <Card.Header>
          <Button className="btn btn-success btn-sm float-right" onClick={() => setModalShow(true)}>
            <Icon.PersonCheck />
            Add New client
          </Button>
        </Card.Header>
        <Card.Body>
          <DataGrid
            ref={(ref) => (dataGrid = ref)}
            dataSource={dataClient}
            showRowLines={true}
            showBorders={true}
          >
            <Column dataField="staffId" alignment="center" caption="Staff Id" />
            <Column dataField="firstName" alignment="center" caption="First Name" />
            <Column dataField="middleName" alignment="center" caption="Middle Name" />
            <Column dataField="lastName" alignment="center" caption="Last Name" />
            <Column dataField="gender" alignment="center" caption="Gender" />
            <Column dataField="email" alignment="center" caption="Email" />
            {/* <Column
              dataField="isActive"
              alignment="center"
              caption="Is Acive"
              allowFiltering={false}
              cellRender={(e) => {
                if (e.data.isActive === 1) {
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
                if (e.data.isActive === 1) {
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
                              if (data.data.data.code === 200) {
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
                              if (data.data.data.code === 200) {
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
            /> */}
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

      <Modal
        show={modalShow}
        className={'modal-success'}
        size="lg"
        aria-labelledby="contained-modal"
        centered
      >
        <AddClient onHide={() => setModalShow(false)} reloadPage={GetDataTable} />
      </Modal>
    </div>
  )
}

export default ClientManagement
