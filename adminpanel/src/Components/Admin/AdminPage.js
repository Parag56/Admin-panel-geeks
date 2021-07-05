import React,{useEffect,useContext,useState} from 'react'
import $ from 'jquery'
import {AuthContext} from '../Context/Auth-Context'
import EnhancedTable from '../DataTable/Datatable'
import Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar'
import SuccessSnackBar from '../SuccessSnackBar/SuccessSnackBar'
import { CSVLink, CSVDownload } from "react-csv";
const AdminPage = () => {
    const auth=useContext(AuthContext)
    const [q,setQ]=useState("")
    const [filterstate,setFilterState]=useState("")

    //error snackbar functions
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
     //error snackbar functions

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

    const [loading,setloading]=useState(true)
    const [headCells,setheadcells]=useState([])
    const [rows,setrows]=useState([])
    const [formstate,setformstate]=useState(false)
    const handleformsubmit=async(e)=>{
      e.preventDefault()
      setloading(true)
        //console.log(document.getElementById('adminEmail').value)
        const url=`${process.env.REACT_APP_BACKEND_URL}createadmin`
        const data={}
        data.adminname=document.getElementById('adminName').value
        data.adminemail=document.getElementById('adminEmail').value
        data.adminPassword=document.getElementById('adminPassword').value
        $.ajax({
            url,
            type: "POST",
            dataType: 'json',
            cache: false,
            data: JSON.stringify(data),
            contentType: "application/json",
            headers: {"Authorization":'Bearer ' + auth.token},
            success: function(data) {
              // console.log(data)
              setloading(false)
              setSuccessMessage('Admin created successfully')
              setOpenSuccess(true)
              setrows([...rows,data])
               console.log(data)
               setformstate(false)
            },
            error: function(xhr, status, err) {
              setloading(false)
              console.log(err)
              //setError(err.responseJSON.message)
              setOpen(true)
              console.error( status, err.toString());
            }
          });

    }
    useEffect(()=>{
      
      const url=`${process.env.REACT_APP_BACKEND_URL}getadmins`
      $.ajax({
          url,
          type: 'GET',
          dataType: 'json',
          cache: false,
          headers: {"Authorization":'Bearer ' + auth.token},
          success: function(data) {
            // console.log(data)
            setloading(false)
             console.log(data)

            //defining headcells array
             
            const headCells = [
              { id: '_id', numeric: false, disablePadding: true, label: 'AdminId' },
              { id: 'adminemail', numeric: false, disablePadding: true, label: 'Email' },
              { id: 'adminname', numeric: true, disablePadding: false, label: 'Name' },
            ];
            let Rows=[]
            //defining Rows array
            data.admins.map(user=>{
              Rows.push({
                name:user._id,
                adminemail:user.adminemail,
                adminname:user.adminname,
              })
            })
            setrows(Rows);
            setheadcells(headCells)
            //defining Rows array
         
          },
          error: function(xhr, status, err) {
            setloading(false)
            setError(err.responseJSON.message)
            setOpen(true)
            console.error( status, err.toString());
          }
        });
  },[loading]) 

   //filter function...
   const filterFields=["adminname","adminemail"]
   const search=(rows)=>{
     if(filterstate=="")
      return rows

      if(filterstate=="adminname")
      return rows.filter(r=>r.adminname!=null).filter(r=>r.adminname.toLowerCase().indexOf(q)==0 )
     // rows.filter(r=>r.score!=null).filter(r=>r.score.indexOf(q)==0) 

      if(filterstate=="adminemail")
      return rows.filter(r=>r.adminemail!=null).filter(r=>r.adminemail.toLowerCase().indexOf(q)==0 )

   }

   //filter function...


    return (
        <React.Fragment>
          {opensuccess &&  <SuccessSnackBar open={opensuccess} handleClick={handleClickSuccess} successmessage={successmessage} handleClose={handleCloseSuccess}  />  }
          {open && <ErrorSnackBar   open={open}  handleClick={handleClick} error={error} handleClose={handleClose} />}
       <Header  listsize={rows.length} filterFields={filterFields} filterstate={filterstate}
           setFilterState={setFilterState} setformstate={setformstate} setloading={setloading} required="true"/>
       { !formstate && !loading && <div style={{ display:'flex', justifyContent:'space-between',padding:'5px',margin:'10px' }} >
           <CSVLink data={rows}  filename={"userdata.csv"}  ><button className="imageBtn" >Export Csv</button> 
           </CSVLink>
           <input style={{height:'40px' }} type="text" placeholder="Search here..." value={q} onChange={(e)=>setQ(e.target.value)} />
           </div> }
          {loading && <Loader />}
        
          { formstate && !loading && <div  class="container" > 
           <form onSubmit={handleformsubmit} >
            <div className="formHeader" ><h3>Admin Page</h3></div>
                <div id="contact" >
          <div style={{marginTop:'30px',marginBottom:'30px'}} >
          <fieldset>
            <input placeholder="Admin Name " type="text" tabindex="2" required id="adminName"/>
          </fieldset>
         
          <fieldset>
            <input placeholder="Admin Email" type="email" tabindex="2" required id="adminEmail"/>
          </fieldset>
          <fieldset>
            <input placeholder="Password" type="password" tabindex="1" required id="adminPassword"/>
          </fieldset>
          </div>
          <button name="submit" type="submit" id="contact-submit" >Submit</button>
            <button id="contact-cancel"onClick={()=>setformstate(false)}  >Cancel</button>
            </div>
    </form> </div>}
       { !formstate && !loading && <EnhancedTable heading="admin" loading={loading} 
       setloading={setloading} headCells={headCells} rows={search(rows)} />}
        
        </React.Fragment>
    )
}

export default AdminPage