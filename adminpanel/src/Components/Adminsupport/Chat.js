import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import './Chat.css'
 const Chat = () => {
    const [roomids,setroomids]=useState()
    const [socket,setsocket]=useState(null)
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
    const handlesendmessage=()=>{

    }
    const handleconnection=()=>{

    }
    return (    
<div>
{roomids&&(
<div id="container">
	<aside>
		<header>
		    <h1 style={{color:'white'}}>Rooms</h1>
		</header>
		<ul>
            {roomids.map((id)=>{
              return  <li onClick={handleconnection}>
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
		<ul id="chat">
			<li class="you">
				<div class="entete">
					<span class="status green"></span>
					<h2>Vincent</h2>
					<h3>10:12AM, Today</h3>
				</div>
				<div class="triangle"></div>
				<div class="message">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
				</div>
			</li>
			<li class="me">
				<div class="entete">
					<h3>10:12AM, Today</h3>
					<h2>Vincent</h2>
					<span class="status blue"></span>
				</div>
				<div class="triangle"></div>
				<div class="message">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
				</div>
			</li>
			<li class="me">
				<div class="entete">
					<h3>10:12AM, Today</h3>
					<h2>Vincent</h2>
					<span class="status blue"></span>
				</div>
				<div class="triangle"></div>
				<div class="message">
					OK
				</div>
			</li>
			<li class="you">
				<div class="entete">
					<span class="status green"></span>
					<h2>Vincent</h2>
					<h3>10:12AM, Today</h3>
				</div>
				<div class="triangle"></div>
				<div class="message">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
				</div>
			</li>
			<li class="me">
				<div class="entete">
					<h3>10:12AM, Today</h3>
					<h2>Vincent</h2>
					<span class="status blue"></span>
				</div>
				<div class="triangle"></div>
				<div class="message">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
				</div>
			</li>
			<li class="me">
				<div class="entete">
					<h3>10:12AM, Today</h3>
					<h2>Vincent</h2>
					<span class="status blue"></span>
				</div>
				<div class="triangle"></div>
				<div class="message">
					OK
				</div>
			</li>
		</ul>
		<footer>
			<input placeholder="Type your message"></input>
			<button onClick={handlesendmessage} >Send</button>
		</footer>
	</main>
</div>)}
		
		
</div>
    )
}

export default Chat
