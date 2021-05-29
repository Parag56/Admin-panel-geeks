import React, { useEffect, useState } from 'react';
import Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata'
import $ from 'jquery'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar';
const PendingUser = () => {
     const [loading,setloading]=useState(false)
     const [userdata,setuserdata]=useState([])
     const [headCells,setheadcells]=useState([])
     const [rows,setrows]=useState([])
     const [formstate,setformstate]=useState(false)
     const [open, setOpen] = useState(false);
    const [error,setError]=useState()
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };  
     useEffect(()=>{
         setloading(true)
         const url=`${process.env.REACT_APP_BACKEND_URL}getpuser`
         $.ajax({
            url,
            dataType: 'json',
            cache: false,
            success: function(data) {
              console.log(data)
              setloading(false)
              setuserdata(data.users)
              const headCells = [
                // { id: 'idx', numeric: false, disablePadding: true, label: 'Email' },
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
              setError(err.message)
              setOpen(true)
              console.error( status, err.toString());
            }
         })
     },[])
     
    return (
        <div>
          {open && <ErrorSnackBar  open={open}  handleClick={handleClick} error={error} handleClose={handleClose} />}
           <Header required="false" listsize={userdata.length}/>
           {loading&&(
               <Loader/>
           )}
           
           {/* Add the table */}



           {
               (userdata.length===0)&&!loading&&(
                   <Nulldata required="false"/>
               )
           }
        </div>
    );
}

export default PendingUser;