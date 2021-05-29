import React,{useState,useEffect} from 'react'
import $ from 'jquery'
import Loader from '../Loader/Loader'
import Header from '../Pageheader/Header'
import Nulldata from '../Nulldata/Nulldata'
import './User.css'
import EnhancedTable from '../DataTable/Datatable'
import CreateUser from './Createuser'
function User() {
    const [loading,setloading]=useState(true)
    const [userdata,setuserdata]=useState([])
    const [headCells,setheadcells]=useState([])
    const [rows,setrows]=useState([])
    const [formstate,setformstate]=useState(false)
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
                  email:user.email,
                  name:user.name,
                  id:user.id,
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

    return (
        <div className="user__page">
          <Header  listsize={userdata.length} setformstate={setformstate} setloading={setloading} required="true"/>
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
             <EnhancedTable heading="Users" headCells={headCells} rows={rows} />
             </div>
         )}
        </div>
    )
}
export default User
