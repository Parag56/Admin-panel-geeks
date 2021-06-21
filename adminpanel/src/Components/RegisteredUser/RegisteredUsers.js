import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import  Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata'
import './Registereduser.css'
import $ from 'jquery'
import EnhancedTable from '../DataTable/Datatable'
import { CSVLink, CSVDownload } from "react-csv";
function RegisteredUsers() {
    const contestid=useParams().cid
    const [rows,setrows]=useState([])
    const [headCells,setheadcells]=useState([])
    const [loading,setloading]=useState(true)
    const [registeredusers,setregisteredusers]=useState([])
    const [formstate,setformstate]=useState(false)
    const [q,setQ]=useState("")
    const [filterstate,setFilterState]=useState("")
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
                    { id: 'username', numeric: true, disablePadding: false, label: 'Name' },
                    { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
                    { id: 'phoneno', numeric: true, disablePadding: false, label: 'Phone Number'},
                    { id: 'branch', numeric: true, disablePadding: false, label: 'Branch'} ,
                    {id: 'college', numeric: true, disablePadding: false, label: 'College'},
                    {  id:'year', numeric: true, disablePadding: false, label: 'Year'},
                   
                  ];
                  let Rows=[]
                  //defining Rows array
                  console.log(data)
                  data.data.map(user=>{
                    Rows.push({
                      email:user.email,
                      username:user.name,
                      id:user.id,
                      name:user._id,
                      phoneno:user.phoneno,
                      branch:user.branch,
                      college:user.college,
                      year:user.year,
                     
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

        //filter function...
   const filterFields=["email","username","branch","college"]
   const search=(rows)=>{
     if(filterstate=="")
      return rows

      if(filterstate=="email")
      return rows.filter(r=>r.email!=null).filter(r=>r.email.toLowerCase().indexOf(q)==0 )

      if(filterstate=="username")
      return rows.filter(r=>r.username!=null).filter(r=>r.username.toLowerCase().indexOf(q)==0 )

      if(filterstate=="branch")
      return rows.filter(r=>r.branch!=null).filter(r=>r.branch.toLowerCase().indexOf(q)==0) 
      if(filterstate=="college")
      return rows.filter(r=>r.college!=null).filter(r=>r.college.toLowerCase().indexOf(q)==0) 

     
   }

   //filter function...
    return (
        <div className="registered_users">   
        <div className="registered__usersheader">
        <Header listsize={registeredusers.length} filterFields={filterFields}
         filterstate={filterstate} setFilterState={setFilterState} 
          setloading={setloading} setformstate={setformstate} required="false"/>
        </div>
        { !formstate && !loading && <div style={{ display:'flex', justifyContent:'space-between',padding:'5px',margin:'10px' }} >
           <CSVLink data={rows}  filename={"Questiondata.csv"}  ><button className="imageBtn" >Export Csv</button> 
           </CSVLink>
           <input style={{height:'40px' }} type="text" placeholder="Search here..." value={q} onChange={(e)=>setQ(e.target.value)} />
           </div> }
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
               <EnhancedTable heading="RegisteredUsers" rows={search(rows)} headCells={headCells} />
           </div>
       )}
        </div>
    )
}

export default RegisteredUsers
