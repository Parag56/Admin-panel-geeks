import React,{useState,useEffect} from 'react'
import Header from '../Pageheader/Header'
import SuccessSnackBar from '../SuccessSnackBar/SuccessSnackBar'
import Nulldata from '../Nulldata/Nulldata'
import Loader from '../Loader/Loader'
import EnhancedTable from '../DataTable/Datatable'
import { CSVLink, CSVDownload } from "react-csv";
import $ from 'jquery'
import CreateMembers from './CreateMembers'
const Members = (props) => {

    const [loading,setloading]=useState(true)
    const [memberdata,setmemberdata]=useState([])
    const [headCells,setheadcells]=useState([])
    const [rows,setrows]=useState([])
    const [formstate,setformstate]=useState(false)
    const [q,setQ]=useState("")
    const [filterstate,setFilterState]=useState("")
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

     useEffect(()=>{
        setloading(true)
     const url=`${process.env.REACT_APP_BACKEND_URL}getmembers_adminpanel`
     $.ajax({
        url,
        dataType: 'json',
        cache: false,
        success: function(data) {
        //   console.log(data)
          setloading(false)
          console.log(data)
          setmemberdata(data.members)
          const headCells = [
            // { id: 'idx', numeric: false, disablePadding: true, label: 'Email' },
            { id: 'name', numeric: false, disablePadding: false, label: 'MemberId' },
            { id: 'membername', numeric: false, disablePadding: false, label: 'Membername' },
            { id: 'memberpost', numeric: true, disablePadding: false, label: 'Member Post' },
            { id: 'year', numeric: true, disablePadding: false, label: 'Current Year' },
            { id: 'companyname', numeric: true, disablePadding: false, label: 'Company' },
          ];
          let Rows=[]
          data.members.map(member=>{
            Rows.push({
              name:member._id,
              membername:member.name,
              memberpost:member.post,
              year:member.year,
              companyname:member.companyname
            })
          })
          setrows(Rows);
          setheadcells(headCells)
        },
        error: function(xhr, status, err) {
          setloading(false)
          console.error( status, err.toString());
        }
     })
    },[formstate])
    //filter function...
const filterFields=["membername","memberpost","year","companyname"]
const search=(rows)=>{
  if(filterstate=="")
   return rows

   if(filterstate=="membername")
   return rows.filter(r=>r.membername.toLowerCase().indexOf(q)==0 )

   if(filterstate=="memberpost")
   return rows.filter(r=>r.memberpost!=null).filter(r=>r.memberpost.toLowerCase().indexOf(q)==0)

   if(filterstate=="year")
   return rows.filter(r=>r.year.toLowerCase().indexOf(q)==0 )

   if(filterstate=="companyname")
   return rows.filter(r=>r.companyname!=null).filter(r=>r.companyname.toLowerCase().indexOf(q)==0) 

}

//filter function...
   
    return (
        <div>
        <Header listsize={memberdata.length}  filterFields={filterFields} 
        filterstate={filterstate} setFilterState={setFilterState} setformstate={setformstate}
         setloading={setloading} required="true"/>
         { !formstate  && !loading && <div style={{ display:'flex', justifyContent:'space-between',padding:'5px',margin:'10px' }} >
       <CSVLink data={rows}  filename={"Members.csv"}  ><button className="imageBtn" >Export Csv</button> 
       </CSVLink>
       <input style={{height:'40px' }} type="text" placeholder="Search here..." value={q} onChange={(e)=>setQ(e.target.value)} />
       </div> }
        {opensuccess &&  <SuccessSnackBar open={opensuccess} handleClick={handleClickSuccess} successmessage={successmessage} handleClose={handleCloseSuccess} /> }
        {loading &&!formstate&& (
            <Loader />
        )}
        {!loading && memberdata.length===0&&!formstate&&(
            <Nulldata setformstate={setformstate} required="true"/>
        )}
        {!loading &&  !formstate && memberdata.length>0 &&(
            <EnhancedTable heading="memberspage" loading={loading} formstate={formstate} setloading={setloading}
            setformstate={setformstate}  setOpenSuccess={setOpenSuccess} 
            setSuccessMessage={setSuccessMessage} rows={search(rows)} headCells={headCells} />
        )}
          {formstate&&(
         <div>
        <CreateMembers setloading={setloading} setOpenSuccess={setOpenSuccess} 
        setSuccessMessage={setSuccessMessage}  setformstate={setformstate}/>
         </div>
     )}
    </div>
    )
}

export default Members
