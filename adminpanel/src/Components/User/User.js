import React,{useState,useEffect} from 'react'
import $ from 'jquery'
import Loader from '../Loader/Loader'
import Header from '../Pageheader/Header'
import Nulldata from '../Nulldata/Nulldata'
import './User.css'
import EnhancedTable from '../DataTable/Datatable'
import CreateUser from './Createuser'
import { CSVLink, CSVDownload } from "react-csv";

function User() {
    const [loading,setloading]=useState(true)
    const [userdata,setuserdata]=useState([])
    const [headCells,setheadcells]=useState([])
    const [rows,setrows]=useState([])
    const [formstate,setformstate]=useState(false)
    const [q,setQ]=useState("")
    const [filterstate,setFilterState]=useState("")
    useEffect(()=>{
        const url=`${process.env.REACT_APP_BACKEND_URL}users`
        $.ajax({
            url,
            dataType: 'json',
            cache: false,
            success: function(data) {
              // console.log(data)
              setloading(false)
             
               setuserdata(data.users)

              //defining headcells array
              const headCells = [
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
              data.users.map(user=>{
                Rows.push({
                  id:user.id,
                  email:user.email,
                  username:user.name,
                  name:user.id,
                  uploadimage:user.profilePhotoLocation,
                  phoneno:user.phoneno,
                  college:user.college,
                  year:user.year,
                  branch:user.Branch,
                })
              })
              setrows(Rows);
              setheadcells(headCells)
            },
            error: function(xhr, status, err) {
              setloading(false)
              console.error( status, err.toString());
            }
          });
    },[]) 

   //filter function...
   const filterFields=["username","email","college","year","branch"]
   const search=(rows)=>{
     if(filterstate=="")
      return rows

      if(filterstate=="username")
      return rows.filter(r=>r.username.toLowerCase().indexOf(q)==0 )

      if(filterstate=="email")
      return rows.filter(r=>r.email.toLowerCase().indexOf(q)==0 )

      if(filterstate=="phoneno")
      return rows.filter(r=>r.phoneno!=null).filter(r=>r.phoneno.indexOf(q)==0) 

      if(filterstate=="college")
      return rows.filter(r=>r.college!=null).filter(r=>r.college.toLowerCase().indexOf(q)==0) 

      if(filterstate=="year")
      return rows.filter(r=>r.year!=null).filter(r=>r.year.toLowerCase().indexOf(q)==0) 
      if(filterstate=="branch")
      return rows.filter(r=>r.branch!=null).filter(r=>r.branch.toLowerCase().indexOf(q)==0) 
   }

   //filter function...

 
    return (
        <div className="user__page">
          <Header  listsize={userdata.length} filterFields={filterFields} filterstate={filterstate} setFilterState={setFilterState} setformstate={setformstate} setloading={setloading} required="true"/>
         {/* <fieldset style={{textAlign:'end'}}  > 
           <input style={{height:'50px'}} type="text" placeholder="select filter field" value={q} onChange={(e)=>setQ(e.target.value)} />
           </fieldset>  */}
         <div style={{ display:'flex', justifyContent:'space-between',padding:'5px',margin:'10px' }} >
           <CSVLink data={rows}  filename={"userdata.csv"}  ><button className="imageBtn" >Export Csv</button> 
           </CSVLink>
           <input style={{height:'40px' }} type="text" placeholder="Search here..." value={q} onChange={(e)=>setQ(e.target.value)} />
           </div> 
          {/* <CSVDownload data={csvData} target="_blank" />; */}
         {loading&&!formstate&&(
           <Loader/>
         )}
         {!loading&&userdata.length==0&&!formstate&&(
           <Nulldata setformstate={setformstate} required="true"/>
         )}
         {formstate&&(
           <div>
            <CreateUser setformstate={setformstate}/>
             </div>
         )}
         {!loading&&userdata.length!=0&&!formstate&&(
           <div>
             <EnhancedTable heading="user" headCells={headCells} rows={search(rows)} />
             </div>
         )}
        </div>
    )
}
export default User
