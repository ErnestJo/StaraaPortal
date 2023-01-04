import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPencil,
  cilFile,
  cilSpeedometer,
  cilPeople,
  cilRoom,
  cilSwapHorizontal,
  cibReadTheDocs,
  cilAppsSettings,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Staff Management',
    to: '/staff',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Client Management',
    to: '/client',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Service',
    to: '/service',
    icon: <CIcon icon={cibReadTheDocs} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Product',
    to: '/product',
    icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Category',
    to: '/category',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
  },
]

export default _nav
