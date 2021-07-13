import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { io } from "socket.io-client";
import { Avatar } from '@material-ui/core';
import './Chat.css'
import SuccessSnackBar from '../SuccessSnackBar/SuccessSnackBar'
 const Chat = () => {
    const [roomids,setroomids]=useState([])
    const [socket,setsocket]=useState(null)
	const [activeroomid,setactiveroomid]=useState(null)
	const [activeusername,setactiveusername]=useState(null)
	const [messages,setmessages]=useState([])
      //success snackbar functions..
	  const [opensuccess, setOpenSuccess] = useState(false);
	  const [successmessage,setSuccessMessage]=useState()
	  const handleClickSuccess = () => {
		setOpenSuccess(true);
	  };
	  
	  const handleCloseSuccess = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenSuccess(false);
	  };  
	  //success snackbar functions..

	
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
	useEffect(()=>{
		if(activeroomid){
	   const url=`${process.env.REACT_APP_BACKEND_URL}getmessages/${activeroomid}`
	   console.log(url)
	   $.ajax({
		   url,
		   dataType: 'json',
		   cache: false,
		   success: function(data) {
			 console.log(data)
			 let dbmessages=[]
			 data.messages.forEach((msg)=>{
				   dbmessages.push({msg:msg.message,id:msg.ownerid,timestamp:msg.timestamp})
			 })
			 setmessages(dbmessages)
		   },
		   error: function(xhr, status, err) {
			 console.log(err)
		   }
		})
	   }
	  },[activeroomid])     
	const addMsg=(msg) =>{
		setmessages([...messages,{msg,id:JSON.parse(localStorage.getItem('adminData')).adminid,timestamp:Date.now()}])
		document.getElementById("message").value = "";
		document.getElementById("chat").scrollTop = document.getElementById(
		  "chat"
		).scrollHeight;
	}

	const handlesendmessage=()=> {
		var msg = document.getElementById("message").value;
		if(socket&&activeroomid)
		socket.emit('message-admin',msg,activeroomid,JSON.parse(localStorage.getItem('adminData')).adminid,Date.now(),JSON.parse(localStorage.getItem('adminData')).adminname)
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
		if(roomid!==activeroomid){
		const socket=io("http://localhost:5000/connection")
		socket.emit("join-room-admin",roomid)
		setactiveroomid(roomid)
		setsocket(socket)
		}
    }

	if(socket){
       socket.on('message',(msg,id,timestamp)=>{
		   setmessages([...messages,{msg,id,timestamp}])
	   })
	   socket.on('disconnectclient',()=>{
		//    //here...
		//    setOpenSuccess(true)
		//    setSuccessMessage(`chat ended with ${activeusername}`)
		socket.disconnect()
	})
	}

	
		


    const handleendchat=()=>{
		// if(socket&&activeroomid){
		// 	socket.emit('endchat',activeroomid,JSON.parse(localStorage.getItem('adminData')).adminid)
			
		// }
		 //here...
		 setOpenSuccess(true)
		 setSuccessMessage(`chat ended with ${activeusername}`)
	}
    return (    
<div className="admin__chat">
{opensuccess &&  <SuccessSnackBar open={opensuccess} handleClick={handleClickSuccess} successmessage={successmessage} handleClose={handleCloseSuccess} /> }
{roomids.length===0&&(
	<div>There are no users</div>
)}
{roomids.length!==0&&(
<div id="container">
	<aside>
		<header>
		    <h1 style={{color:'white'}}>Rooms</h1>
		</header>
		<ul>
            {roomids.length!==0&&roomids.map((room)=>{
              return  <li onClick={()=>{
				    handleconnection(room.id)
					setactiveusername(room.username) 
			        }}>
					<Avatar/>
				<div>
					<h2>{room.username}</h2>
					<h3>
						<span class="status orange"></span>
						{room.id}
					</h3>
				</div>
                    </li>
            })}
		</ul>
	</aside>
	<main>
		<header>
		<Avatar/>
			<div>
				<h2>Chat with {activeusername}</h2>
				<h3>{messages.length} messages in chat</h3>
			</div>
			<div>
				<button className="endchatbtn" onClick={handleendchat}>End Chat</button>
			</div>
		</header>
		<ul className="chat-area" id="chat">
			{messages.map((msg)=>{
				if(msg.id===JSON.parse(localStorage.getItem('adminData')).adminid)
				return <div><div className="chat-message-div"> 
                <span style={{flexGrow:'1'}}></span>
                <div className='chat-message-sent'>{msg.msg}</div>
             </div>
			 <div className="chat-message-sent-timestamp">
         {new Date(msg.timestamp).toLocaleString()}
           </div>
			 </div>
			 else
			 return <div><div className="chat-message-div"> 
			 <div className='chat-message-received '>{msg.msg}</div>
			 <span style={{flexGrow:'1'}}></span>
		  </div>
		  <div className="chat-message-received-timestamp">
         {new Date(msg.timestamp).toLocaleString()}
           </div>
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
