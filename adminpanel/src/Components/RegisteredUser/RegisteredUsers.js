import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import  Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata'
import './Registereduser.css'
import $ from 'jquery'
import EnhancedTable from '../DataTable/Datatable'
function RegisteredUsers() {
    const contestid=useParams().cid
    const [rows,setrows]=useState([])
    const [headCells,setheadcells]=useState([])
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

                  const headcells = [
                    { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
                    { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
                    { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
                    { id: 'uploadimage', numeric: true, disablePadding: false, label: 'Upload Image' },
                    { id: 'phoneno', numeric: true, disablePadding: false, label: 'Phone Number'},
                    {id: 'college', numeric: true, disablePadding: false, label: 'College'},
                    {  id:'year', numeric: true, disablePadding: false, label: 'Year'},
                    { id: 'branch', numeric: true, disablePadding: false, label: 'Branch'} ,
                  ];
                  let Rows=[]
                  //defining Rows array
                  data.registeredusers.map(user=>{
                    Rows.push({
                      email:user.email,
                      name:user.name,
                      id:user.id,
                      phoneno:user.phoneno,
                      college:user.college,
                      year:user.year,
                      branch:user.branch,
                    })
                  })
                  setrows(Rows);
                  setheadcells(headcells)

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
           <div> 
               <EnhancedTable heading="RegisteredUsers" rows={rows} headCells={headCells} />
           </div>
       )}
        </div>
    )
}

export default RegisteredUsers
