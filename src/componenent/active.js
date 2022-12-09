import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Getactiveusers, userReset } from '../redux/user'
import { useNavigate, Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import BasicExample from './Navbar';

function ActiveUsers() {
    const {activeusers, success, loading, error } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Getactiveusers())
      console.log('this isactiveusers ',activeusers)
      return () => {
        dispatch(userReset())
    }
    } , [])
  return (
      <>
          <BasicExample></BasicExample>
            <ListGroup>
              {activeusers.length > 0 ?activeusers.map((user) => (
                  <div>
                      <ListGroup.Item><Link to={`/chat/${user._id}`}>{user.username }</Link></ListGroup.Item>  
            </div>
        )) : 'No users'}
    </ListGroup>
      </>
  )
}

export default ActiveUsers