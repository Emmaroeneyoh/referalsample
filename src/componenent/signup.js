import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { userSignup, userReset } from '../redux/user'
import {useNavigate} from 'react-router-dom'

function Signup() {
    const { user, success, loading, error } = useSelector((state) => state.user)
    
     //state for input field
     const [email, setemail] = useState('')
    const [username, setusername] = useState('')
    
       
   //function for onChange event
   const emailchange = (e) => {
    setemail(e.target.value)
    }
    
   const userchange = (e) => {
    setusername(e.target.value)
    }

    const dispatch = useDispatch();//this will enable us call any action in the redux;

    const state = { username, email }
    
    const submit = (e) => {
        e.preventDefault()
        dispatch(userSignup(state))
    }

    const navigate = useNavigate()
         // useEffect to navigate the user
  useEffect(() => {
    if (success === true) {
          navigate('/')
        }
        console.log('usefect working')
          return () => {
            dispatch(userReset())
        }
      }, [success])
  return (
    <Form onSubmit={submit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email}  onChange={emailchange} />
      
          </Form.Group>
          
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Enter username" value={username} onChange={userchange} />
      
    </Form.Group>

  
  
    <Button variant="primary" type="submit">
    {loading === 'pending' ? 'Signing Up' : 'Signup' }
          </Button>
          <div>{error ? error : '' }</div>
      </Form>
      
  )
}

export default Signup