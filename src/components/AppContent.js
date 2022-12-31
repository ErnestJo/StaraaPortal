import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// routes config
import routes from '../routes'

const AppContent = ({ sharedState, ...prop }) => {
  const navigate = useNavigate()

  useEffect(() => {
    let user = sharedState.userData
    if (user == '') {
      console.log('jaksa')
      return navigate('/login')
    }
  }, [])
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {sharedState.userData == ''
            ? navigate('/login')
            : routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                )
              })}

          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

const MapStateToProps = (state) => ({
  sharedState: state.SharedState,
})

export default connect(MapStateToProps)(AppContent)
