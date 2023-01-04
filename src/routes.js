import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const PropertiesManagement = React.lazy(() =>
  import('./views/propertiesManagement/PropertiesManagement'),
)
const clientsManagement = React.lazy(() => import('./views/userManagement/ClientManagement'))
const staffManagement = React.lazy(() => import('./views/staffManagement/StaffManagement'))
const PropertiesRequst = React.lazy(() => import('./views/propertiesRequest/PropertiesRequest'))
const Reports = React.lazy(() => import('./views/reports/Reports'))
const Logs = React.lazy(() => import('./views/logs/Logs'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const SystemConfig = React.lazy(() => import('./views/systemConfig/SystemConfig'))
const UserProfile = React.lazy(() => import('./views/userSettings/userSettings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/client', name: 'Clients Management', element: clientsManagement },
  { path: '/staff', name: 'Staff Management', element: staffManagement },
]

export default routes
