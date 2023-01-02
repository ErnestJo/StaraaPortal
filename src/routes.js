import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const PropertiesManagement = React.lazy(() =>
  import('./views/propertiesManagement/PropertiesManagement'),
)
const EmployesManagement = React.lazy(() => import('./views/userManagement/UserManagement'))
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
  { path: '/staffss', name: 'Staff Management', element: PropertiesManagement },
  { path: '/employee-management', name: 'Employes Management', element: EmployesManagement },
  { path: '/staff', name: 'Staff Management', element: staffManagement },
  { path: '/properties-request', name: 'Properties Requst', element: PropertiesRequst },
  { path: '/reports', name: 'Reports', element: Reports },
  { path: '/logs', name: 'Logs', element: Logs },
  { path: '/system-configuration', name: 'System', element: SystemConfig },
  { path: '/profile', name: 'User Profile', element: UserProfile },
]

export default routes
