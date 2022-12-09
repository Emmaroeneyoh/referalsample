import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Getusers, userReset } from '../redux/user'
import { useNavigate, Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import BasicExample from './Navbar';

function Users() {
    const { users, success, loading, error } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Getusers())
      console.log('this is users ', users)
      return () => {
        dispatch(userReset())
    }
    } , [])
  return (
      <>
          <BasicExample></BasicExample>
            <ListGroup>
              {users.length > 0 ? users.map((user) => (
                  <div>
                      <ListGroup.Item><Link to={`/chat/${user._id}`}>{user.username }</Link></ListGroup.Item>  
            </div>
        )) : 'No users'}
    </ListGroup>
      </>
  )
}

export default Users