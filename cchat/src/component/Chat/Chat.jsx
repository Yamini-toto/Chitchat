import React, { useEffect, useState } from 'react'
import socketIo from "socket.io-client"
import sendImg from "../../assets/svg/sendImg.png"
import close from "../../assets/svg/cross.png"
import {user} from "../Join/Join.jsx"
import Message from "../Message/Message.jsx";
import "./Chat.css";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:4500";

const Chat = () => {
 const [id, setid] = useState("");
 const [messages, setMessages] = useState([]);
  const send=()=>{
    const message = document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value="";
  }

useEffect(() => {
 socket = socketIo(ENDPOINT, {transports: ['websocket']});
 socket.on("connect", ()=>{
   alert("Connected");
   setid(socket.id);
 })
 socket.emit('joined',{user})
 socket.on('welcome',(data)=>{
  setMessages([...messages,data]);
  console.log(data.user, data.message);
 })

 socket.on('userJoined',(data)=>{
  setMessages([...messages,data]);
  console.log(data.user, data.message);
 })
 socket.on('leave',(data)=>{
  setMessages([...messages,data]);
  console.log(data.user, data.message);
 })
 return () =>{
 socket.emit('disconnected');
 socket.off();
}
},[])
useEffect(()=>{
  socket.on('sendMessage',(data)=>{
    setMessages([...messages,data]);
    console.log(data.user, data.message, data.id);
  })
  return () =>{
    socket.off();
  }
},[messages])
  return (
    <div className='chatPage'>
     <div className='chatContainer'>
      <div className='header'>
        <h2>ChitChat</h2>
        <a href="/"><img src={close} alt='close' /></a>
      </div>
        <ReactScrollToBottom className='chatBox'>
          {messages.map((item,i)=>
            <Message user={item.id===id ? '' : item.user} message={item.message} classs={item.id===id ? 'right' : 'left'} />
          )}
        </ReactScrollToBottom>
          <div className='inputBox'>
            <input onKeyDown={(event)=> event.key==="Enter" ? send():null} type='text' id='chatInput' />
            <button onClick={send} className='sendBtn'><img src={sendImg} alt="send image"/></button>
          </div>
     </div>
    </div>
  )
}

export default Chat