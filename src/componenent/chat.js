import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import user, { Singleuser, userReset , online , offline } from '../redux/user'
import { useNavigate, Link , useParams} from 'react-router-dom'
import BasicExample from './Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { socket } from '../App'
import ListGroup from 'react-bootstrap/ListGroup';

function Chat() {
  const { friend, user , success, loading, error , FriendStatus } = useSelector((state) => state.user)
  
  const {id}  = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(Singleuser(id))
        if (friend) {
            console.log('this is users ', friend)
      }
      return () => {
        dispatch(userReset())
    }
    }, [])
  
  //function for the chat app
  const [text, settext] = useState('')
  const [message, setmessage] = useState('')

  const textchange = (e) => {
    settext(e.target.value)
  }
  
  const payload = { text, id }
  //getting the userid and the friend id to check in the database
  const senderid = user._id
  const receviverid = friend._id
  
  const stateload = {receviverid, senderid}  //storing them in a state
  const submit = (e) => {
    e.preventDefault()
    socket.emit('sendMessages', payload)
  }

  useEffect(() => {
    socket.on("msg-recieved", (msg) => {
        
      console.log("this is message", msg)
      setmessage(msg)
     })
  }, [])


  //changing the status of the user .
  //this is the first check once the user opens the chat ui
  useEffect(() => {
    socket.emit("checkStatus",stateload)
  }, [receviverid])
  
  //creating a functio for subsequent check using the setineterval
  const runcheck = () => {
    socket.emit("checkStatus",stateload)
  }
  setInterval(runcheck, 3000)




  //checking for offline signal to see if the user is offline then dispatch the offline signal with the lasstseen as pauload
  useEffect(() => {
    socket.on("offlineStatus", (msg) => {
        
      console.log("this is message", msg)
      dispatch(offline(msg))
    })
    
  }, [FriendStatus])

  //checking for online signal then dispatch the online signal
  useEffect(() => {
    socket.on("onlineStatus", (msg) => {
        
      console.log("this is message", msg)
      dispatch(online())
    })
  
  }, [])

  return (
      <>
          <BasicExample></BasicExample>
            <Alert key={'primary'} variant={'primary'}>
        {friend ? friend.username : "friend dont exist"}
        <h3>status : {FriendStatus }</h3>
      </Alert>
      
      {/* displaying chat  */}
      <ListGroup as="ul">
      <ListGroup.Item as="li" active>
      {message === '' ? `start a conversation ${friend.username} ` : message}
      </ListGroup.Item>
      {/* <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item> */}
     
    </ListGroup>
      <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
       
        <Form.Control type="text" value={text} onChange={textchange} placeholder="Enter Message" />
       
      </Form.Group>

      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
      </>
  )
}

export default Chat