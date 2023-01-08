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
import AddService from '../../components/business/AddService'
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

const GetService_URL = '/api/BusinessManagement/GetAllService'

const Service = () => {
  const [modalShow, setModalShow] = React.useState(false)
  const [dataService, setDataService] = useState([])
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
    if (dataService == 0) {
      GetDataTable()
    }
  }, [dataService])

  const GetDataTable = () => {
    setIsLoading(true)
    axios({
      method: 'GET',
      url: GetService_URL,
    })
      .then((data) => {
        console.log(data.data.data)
        setDataService(data.data.data)
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
            Add New Service
          </Button>
        </Card.Header>
        <Card.Body>
          <DataGrid
            ref={(ref) => (dataGrid = ref)}
            dataSource={dataService}
            showRowLines={true}
            showBorders={true}
          >
            <Column dataField="serviceId" alignment="center" caption="Service Id" />
            <Column dataField="serviceName" alignment="center" caption="Service Name" />
            <Column dataField="servicePrice" alignment="center" format="currency" caption="Cost" />
            <Column
              dataField="serviceDoneDate"
              alignment="center"
              caption="Done on"
              dataType="date"
              format="dd/MM/yyyy"
            />
            <Column
              dataField="serviceNextDate"
              alignment="center"
              dataType="date"
              format="dd/MM/yyyy"
            />
            <Column dataField="client" alignment="center" caption="Client Name" />
            <Column dataField="staff" alignment="center" caption="Staff Incharge Name" />
            <Column
              dataField="servicePayment"
              alignment="center"
              caption="Payment"
              cellRender={(e) => {
                if (e.data.servicePayment === 1) {
                  console.log(e.data.isActive)
                  return (
                    <CBadge color="success" shape="rounded-pill">
                      {' '}
                      Paid{' '}
                    </CBadge>
                  )
                } else {
                  return (
                    <CBadge color="danger" shape="rounded-pill">
                      {' '}
                      Not Paid{' '}
                    </CBadge>
                  )
                }
              }}
            />
            <Column
              dataField="serviceId"
              alignment="center"
              caption="Action"
              allowFiltering={false}
              cellRender={(e) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CButton>
                      <Icon.Eye />
                    </CButton>

                    <CButton className="mx-1">
                      <Icon.Trash />
                    </CButton>
                  </div>
                )
              }}
            />
            <ColumnChooser enabled={true} />
            <Selection mode="multiple" />
            <Export enabled={true} fileName="Service Name" allowExportSelectedData={true} />
            <Paging defaultPageSize={5} />
            <FilterRow visible={state.showFilterRow} applyFilter={state.currentFilter} />
            <HeaderFilter visible={state.showHeaderFilter} />
            <Selection mode="single" />
            <SearchPanel visible={true} width={240} placeholder="Search..." />
            <Summary>
              <TotalItem column="serviceId" summaryType="count" />
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
        <AddService onHide={() => setModalShow(false)} reloadPage={GetDataTable} />
      </Modal>
    </div>
  )
}

export default Service
