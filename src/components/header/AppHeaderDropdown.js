import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { clearStore } from '../../actions/request'
import { connect } from 'react-redux'
import Notify from '../../Helper/Notify'

const AppHeaderDropdown = ({ clearStore, ...prop }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/profile')
  }

  const signOut = (e) => {
    e.preventDefault()
    clearStore()
    navigate('/login')
    Notify.notifySuccess('Succesfull logout')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilUser} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem onClick={handleClick}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={(e) => signOut(e)}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

const MapStateToProps = (state) => ({
  sharedState: state.sharedState,
})

export default connect(MapStateToProps, { clearStore })(AppHeaderDropdown)
