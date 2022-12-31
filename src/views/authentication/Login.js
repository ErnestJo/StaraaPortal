import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../authentication/Login.css'
import { useEffect, useRef, useState, useContext } from 'react'
import loginIcon from '../../assets/images/man.png'
import loginSvg from '../../assets/images/image.svg'
import axios from 'axios'
import Notify from '../../Helper/Notify'
import { connect } from 'react-redux'
import { InsertUserData } from 'src/actions/request'

const LOGIN_URL = '/api/StaffManagement/login'
function Login({ sharedState, InsertUserData, ...prop }) {
  const navigate = useNavigate()
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUser] = useState('')
  const [password, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ username, password }), {
        headers: { 'content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log(response.data.data[0])

      if (response.data.data.length > 0) {
        InsertUserData(response.data.data[0])
        Notify.notifySuccessTopCenter('You have logged in Successufuly')
        setUser('')
        setPwd('')
        setSuccess(true)
        navigate('dashboard')
      } else {
        console.log('sinakitu hapa')
        Notify.notifyErrorTopCenter('Sorry failed to login please check your login credentials')
        setUser('')
        setPwd('')
        setSuccess(false)
      }
    } catch (e) {}
  }

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col lg={4} md={6} sm={12} className="text-center m-7 p-3 space">
            <img className="icon-img" src={loginIcon} alt="Icon" />
            <h3>My Saloon System</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  id="staff_username"
                  autoComplete="off"
                  ref={userRef}
                  value={username}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="staff_password"
                  value={password}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <img className="w-80" src={loginSvg} alt="Icon" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const MapStateToProps = (state) => ({
  sharedState: state.SharedState,
})
export default connect(MapStateToProps, { InsertUserData })(Login)
