import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import  Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata'
import './Registereduser.css'
import $ from 'jquery'
function RegisteredUsers() {
    const contestid=useParams().cid
    const [loading,setloading]=useState(true)
    const [registeredusers,setregisteredusers]=useState([])
      //Fetching all the  Registered Users of the contest
      useEffect(()=>{
        const url=`${process.env.REACT_APP_BACKEND_URL}getUsers/${contestid}`
          $.ajax({
              url,
              dataType:'json',
              cache:false,
              success:function(data){
                // console.log(data)
                  //Set Loading state to false
                  setloading(false)
                  //add registeredusers to registeredusers state
                  setregisteredusers(data.data)
              },
              error:function(error){
                  //Set Loading sate to false
                  setloading(false)
                  console.error(error)
              }
          })
      },[])
    return (
        <div className="registered_users">   
        <div className="registered__usersheader">
        <Header listsize={registeredusers.length} setloading={setloading} required="false"/>
        </div>
        {loading&&(
           <Loader/>
        )}
        <div className="registered__usersnull">
       {!loading&&registeredusers.length===0&&(
           <Nulldata required="false"/>
       )}
       </div>
       {!loading&&registeredusers.length!==0&&(
           <div>Question table
           </div>
       )}
        </div>
    )
}

export default RegisteredUsers
