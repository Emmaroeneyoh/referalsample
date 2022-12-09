import React from 'react'
import BasicExample from './Navbar'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

import { useSelector, useDispatch } from "react-redux";
function Homepage() {
  const { user, success, loading, error } = useSelector((state) => state.user)
  
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.username === '') {
      navigate("/login")
      console.log("user is empty")
     }
  }, )
  return (
      <>
      <BasicExample></BasicExample>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
          <Card.Title>{user.username }</Card.Title>
          <Card.Title>{user.email }</Card.Title>
       
      </Card.Body>
    </Card>
      </>
  )
}

export default Homepage