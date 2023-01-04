import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const PropertiesManagement = React.lazy(() =>
  import('./views/propertiesManagement/PropertiesManagement'),
)
const clientsManagement = React.lazy(() => import('./views/userManagement/ClientManagement'))
const staffManagement = React.lazy(() => import('./views/staffManagement/StaffManagement'))
const category = React.lazy(() => import('./views/business/category'))
const product = React.lazy(() => import('./views/business/product'))
const service = React.lazy(() => import('./views/business/product'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/client', name: 'Clients Management', element: clientsManagement },
  { path: '/staff', name: 'Staff Management', element: staffManagement },
  { path: '/category', name: 'Category', element: category },
  { path: '/product', name: 'product', element: product },
  { path: '/service', name: 'service', element: service },
]

export default routes
