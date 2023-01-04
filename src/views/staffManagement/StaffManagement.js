import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Modal, Form, Row, Col, Badge } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { CButton, CBadge } from '@coreui/react'
import ExcelJS from 'exceljs'
import { exportDataGrid } from 'devextreme/excel_exporter'
import saveAs from 'file-saver'
import Notify from '../../Helper/Notify'
import * as Icon from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import LoadingSpinner from '../../components/Spinner/Spinner'
import { getWithLoader, posttWithLoader } from '../../actions/request'
import AddUser from 'src/components/userManagement/AddUser'

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
  Paging,
} from 'devextreme-react/data-grid'

const GetStaff_URL = '/api/StaffManagement/GetAllStaff'
const AddStaff_URL = '/api/StaffManagement/AddStaff'
const GetSingle_URL = '/api/StaffManagement/GetSingleStaff'
const Disable_URL = '/api/StaffManagement/DisableStaff'
const Active_URL = '/api/StaffManagement/ActivateStaff'
const ChangePassword_URL = '/api/StaffManagement/ChangeStaffPassword'

const StaffManagement = (posttWithLoader, getWithLoader) => {
  const [modalShow, setModalShow] = React.useState(false)
  const [dataProject, setDataProject] = useState([])
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
    if (dataProject === 0) {
      GetDataTable()
    }
  }, [dataProject])

  const GetDataTable = () => {
    setIsLoading(true)
    axios({
      method: 'GET',
      url: GetStaff_URL,
    })
      .then((data) => {
        console.log(data.data.data)
        setDataProject(data.data.data)
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
            Add New Staff
          </Button>
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

      <Modal
        show={modalShow}
        className={'modal-success'}
        size="lg"
        aria-labelledby="contained-modal"
        centered
      >
        <AddUser onHide={() => setModalShow(false)} reloadPage={GetDataTable} />
      </Modal>
    </div>
  )
}

const MapStateToProps = (state) => ({
  sharedState: state.sharedState,
})
export default connect(MapStateToProps, {
  getWithLoader,
  posttWithLoader,
})(StaffManagement)
