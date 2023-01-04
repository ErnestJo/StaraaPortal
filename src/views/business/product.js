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

const GetCategory_URL = '/api/BusinessManagement/GetAllCategory'

const Product = () => {
  return <div>product</div>
}

export default Product
