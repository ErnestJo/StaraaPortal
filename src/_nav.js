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
    name: 'Project Management',
    to: '/project-management',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Employee Management',
    to: '/employee-management',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Properties Management',
    to: '/properties-management',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Properties Request',
    to: '/properties-request',
    icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cibReadTheDocs} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Logs',
  //   to: '/logs',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'System Configuration',
    to: '/system-configuration',
    icon: <CIcon icon={cilAppsSettings} customClassName="nav-icon" />,
  },
]

export default _nav
