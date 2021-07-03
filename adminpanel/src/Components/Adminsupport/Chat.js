import React, { useEffect, useState,useCallback } from 'react'
import $ from 'jquery'
import { io } from "socket.io-client";
import './Chat.css'
 const Chat = () => {
    const [roomids,setroomids]=useState()
    const [socket,setsocket]=useState(null)
	const [activeroomid,setactiveroomid]=useState(null)
	const [messages,setmessages]=useState([])
    useEffect(()=>{
        const url=`${process.env.REACT_APP_BACKEND_URL}getrooms/${JSON.parse(localStorage.getItem('adminData')).adminid}`
        console.log(url)
        $.ajax({
            url,
            dataType: 'json',
            cache: false,
            success: function(data) {
              console.log(data)
              setroomids(data.roomids)
            },
            error: function(xhr, status, err) {
              console.log(err)
            }
         })
    },[])
	const addMsg=(msg) =>{
		setmessages([...messages,{msg,id:JSON.parse(localStorage.getItem('adminData')).adminid}])
		document.getElementById("message").value = "";
		document.getElementById("chat").scrollTop = document.getElementById(
		  "chat"
		).scrollHeight;
	}

	const handlesendmessage=()=> {
		var msg = document.getElementById("message").value;
		if(socket&&activeroomid)
		socket.emit('message-admin',msg,activeroomid,JSON.parse(localStorage.getItem('adminData')).adminid)
		if (msg == "") return;
		addMsg(msg);
	  }
	
	  const handleenter=(event)=>{
        if (event.keyCode === 13) {
            event.preventDefault();
            handlesendmessage();
          }
       }
    const handleconnection=(roomid)=>{
		const socket=io("http://localhost:5000/connection")
		socket.emit("join-room-admin",roomid)
		setactiveroomid(roomid)
		setsocket(socket)
    }

		if(socket){
       socket.on('message',(msg,id)=>{
		   setmessages([...messages,{msg,id}])
	   })
	}
	
   
    return (    
<div>
{!roomids&&(
	<div>There are no users</div>
)}
{roomids&&(
<div id="container">
	<aside>
		<header>
		    <h1 style={{color:'white'}}>Rooms</h1>
		</header>
		<ul>
            {roomids.map((id)=>{
              return  <li onClick={()=>{handleconnection(id)}}>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
				<div>
					<h2>Prénom Nom</h2>
					<h3>
						<span class="status orange"></span>
						{id}
					</h3>
				</div>
                    </li>
            })}
		</ul>
	</aside>
	<main>
		<header>
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
			<div>
				<h2>Chat with Vincent Porter</h2>
				<h3>already 1902 messages</h3>
			</div>
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt=""/>
		</header>
		<ul className="chat-area" id="chat">
			{messages.map((msg)=>{
				if(msg.id===JSON.parse(localStorage.getItem('adminData')).adminid)
				return <div className="chat-message-div"> 
                <span style={{flexGrow:'1'}}></span>
                <div className='chat-message-sent'>{msg.msg}</div>
             </div>
			 else
			 return <div className="chat-message-div"> 
			 <div className='chat-message-received '>{msg.msg}</div>
			 <span style={{flexGrow:'1'}}></span>
		  </div>
			})}
		</ul>
		<footer>
			<input placeholder="Type your message" id="message" onKeyUp={(e)=>handleenter(e)}></input>
			<button onClick={handlesendmessage} >Send</button>
		</footer>
	</main>
</div>)}
		
		
</div>
    )
}

export default Chat
