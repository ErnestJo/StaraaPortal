import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { CHeaderDivider } from '@coreui/react'
import * as Icon from 'react-bootstrap-icons'
import user from '../../assets/images/user.jpg'
import { ColumnChooser } from 'devextreme-react/data-grid'
import { connect } from 'react-redux'

const userSettings = ({ sharedState }) => {
  return (
    <div>
      <Card>
        <Card.Header>
          <h3>View Profile</h3>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '10px',
                  marginTop: '20px',
                  height: '250px',
                }}
              >
                <img src={user} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <Button variant="warning"> Edit</Button>
              </div>
            </Col>
            <Col md={9}>
              {' '}
              <h2> My details</h2>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col>
                      <label>
                        <h3>Staff Name</h3>
                      </label>
                    </Col>
                    <Col>
                      <h3>{sharedState.userData.staff}</h3>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col>
                      <label>
                        <h3>Staff Email</h3>
                      </label>
                    </Col>
                    <Col>
                      <h3>{sharedState.userData.email}</h3>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col>
                      <label>
                        <h3>Staff Role</h3>
                      </label>
                    </Col>
                    <Col>
                      <h3>{sharedState.userData.role}</h3>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col>
                      <label>
                        <h3>Staff Gneder</h3>
                      </label>
                    </Col>
                    <Col>
                      <h3>{sharedState.userData.gender}</h3>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

const MapStateToProps = (state) => ({
  sharedState: state.SharedState,
})

export default connect(MapStateToProps)(userSettings)
