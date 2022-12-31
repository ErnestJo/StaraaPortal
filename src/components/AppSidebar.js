import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { connect } from 'react-redux'
import softnet from '../assets/images/softnet.png'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = ({ changeState }) => {
  const dispatch = useDispatch(changeState)
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex logoPlace" to="/">
        {/* <CIcon className="sidebar-brand-full" src={softnet} height={35} /> */}
        <img src={softnet} className="logoSize" />
        <CIcon className="sidebar-brand-narrow" height={35} />
      </CSidebarBrand>

      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

const MapStateToProps = (state) => ({
  changeState: state.changeState,
})
export default connect(MapStateToProps)(AppSidebar)
