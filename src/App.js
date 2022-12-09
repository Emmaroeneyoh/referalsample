
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./componenent/signup";
import Homepage from "./componenent/homepage";
import Login from "./componenent/login";
import Users from "./componenent/users";
import ActiveUsers from "./componenent/active";
import Chat from "./componenent/chat";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
const socket = io('http://localhost:3000')


function App() {
 

  const { user, success, loading, error } = useSelector((state) => state.user)
  const id = user._id
  useEffect(() => {
      if (user.status === 'online' && user.lastseen === 'active' ) {
      console.log("user is ffline")
      } else {
         
    socket.emit('changeStatus', id);
    }
  
    console.log("sending message success")
  }, []);

  useEffect(() => {
    socket.emit('changeStatus', id);
  })

    //heartbeat messages
    const heartbeatCheck = () => {
      socket.emit("heartbeat",'ping')
    }
    setInterval(heartbeatCheck, 3000)
  return (
    <Router>
      <h1>hello</h1>
      <Routes>
      <Route exact path='/signup' element={<Signup/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/' element={<Homepage/>} />
      <Route exact path='/users' element={<Users/>} />
      <Route exact path='/chat/:id' element={<Chat/>} />
      <Route exact path='/Activeusers' element={<ActiveUsers/>} />
      </Routes>
    </Router>
  );
}


export  { App ,  socket }; 