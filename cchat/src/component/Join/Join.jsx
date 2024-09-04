import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Join.css"
import logo from "../../assets/svg/logo.svg"
let user;
const sendUser = ()=>{
  user =document.getElementById("joinInput").value;
   document.getElementById("joinInput").value = "";
  }
const Join = ()=> {
  const [name, setname] = useState("");
 
  return (
    <div className='joinPage'>
    <div className='joinContainer'>
    <img src={logo} alt="logo" />
    <input onChange={(e)=>setname(e.target.value)} type="text" placeholder="Enter your name" id="joinInput" />
    <Link  onClick={(e)=> !name ? e.preventDefault() : null} to="/chat"><button className='joinMe' onClick={sendUser}>Click Me</button></Link>
    </div>
    </div>
  )
}

export default Join;
export {user};
