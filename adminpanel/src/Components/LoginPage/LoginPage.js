import React, { useEffect, useState,useContext } from "react";
import "./LoginPage.css";
import {useHistory} from 'react-router-dom'
import $ from 'jquery'
import {AuthContext} from '../Context/Auth-Context'
import LoginLoader from '../Loader/LoginLoader'

function LoginPage() {


    const history=useHistory()
    //setting the auth context
    
    const [loading,setloading]=useState(false)
    const auth = useContext(AuthContext);
    //handling the password animation and alter input type to password/text
    useEffect(() => {
    const pswInput = document.querySelector("#password");
    const switchBtn = document.querySelector(".switch-btn");
    switchBtn.addEventListener("click", togglePswVisibility);

    //function to change the type from pass to text and also change the icon
    function togglePswVisibility() {
      const isHide = pswInput.type === "password";
      pswInput.setAttribute("type", isHide ? "text" : "password");

      if (isHide) {
        switchBtn.classList.remove("fa-lock");
        switchBtn.classList.add("fa-lock-open");
      } else {
        switchBtn.classList.remove("fa-lock-open");
        switchBtn.classList.add("fa-lock");
      }
    }
  }, []);

  //handler for login
  const handleclick = () => {
    setloading(true)
    //getting the data the admin input
    let data = {};
    const email = document.getElementById("account").value;
    const password = document.getElementById("password").value;
    data.adminemail = email;
    data.adminPassword = password;
    console.log(data);

    const url= `${process.env.REACT_APP_BACKEND_URL}loginadmin`
    console.log(url)
    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url,
        success:(data)=>{
        //  console.log(data)
         auth.login(data.adminid,data.token,data.adminname);
         setloading(false)
         //If login is successfull redirects to home page
         console.log(auth.isloggedin)
         history.push("/home")
        },
        error:()=>{
          setloading(false)
        }
      
    })
  
  };
  return (
    <div className="logindiv">
        {loading&&(
            <LoginLoader/>
        )}
      <div className="bg-box">
        <div className="bg1"></div>
        <div className="bg2"></div>
      </div>
      <div className="form">
        <label for="account">Account</label>
        <div className="input-box">
          <i className="far fa-user prefix"></i>
          <input type="text" id="account" spellcheck="false" />
        </div>
        <label for="password">Password</label>
        <div className="input-box">
          <i className="fas fa-lock prefix"></i>
          <input type="password" id="password" spellcheck="false"/>
          <i className="fas fa-lock switch-btn"></i>
        </div>
        <div className="send-btn" onClick={handleclick}>
          login&nbsp;<i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
