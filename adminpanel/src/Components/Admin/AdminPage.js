import React,{useEffect,useContext,useState} from 'react'
import $ from 'jquery'
import {AuthContext} from '../Context/Auth-Context'
import EnhancedTable from '../DataTable/Datatable'
import Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar'
const AdminPage = () => {
    const auth=useContext(AuthContext)

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
              setrows([...rows,data])
               console.log(data)
               setformstate(false)
            },
            error: function(xhr, status, err) {
              setloading(false)
              setError(err.message)
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
              { id: 'adminemail', numeric: false, disablePadding: true, label: 'Email' },
              { id: 'adminname', numeric: true, disablePadding: false, label: 'Name' },
            ];
            let Rows=[]
            //defining Rows array
            data.admins.map(user=>{
              Rows.push({
                adminname:user.adminname,
                adminemail:user.adminemail
              })
            })
            setrows(Rows);
            setheadcells(headCells)
            //defining Rows array
         
          },
          error: function(xhr, status, err) {
            setloading(false)
            console.error( status, err.toString());
          }
        });
  },[loading]) 

    return (
        <div >
          {open && <ErrorSnackBar   open={open}  handleClick={handleClick} error={error} handleClose={handleClose} />}
          <Header  listsize={rows.length} setformstate={setformstate} setloading={setloading} required="true"/>
          {loading && <Loader />}
          { formstate && <div  class="container" >  <form >
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
          <button name="submit" type="submit" id="contact-submit" onClick={handleformsubmit} >Submit</button>
            <button id="contact-cancel"onClick={()=>setformstate(false)}  >Cancel</button>
            </div>
    </form> </div>}
       { !formstate && <EnhancedTable heading="admins" headCells={headCells} rows={rows} />}
        {}
        </div>
    )
}

export default AdminPage