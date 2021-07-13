import React, { useEffect,useState} from 'react'
import Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata'
import CreateContest from './CreateContest'
import $ from 'jquery'
import EnhancedTable from '../DataTable/Datatable'
import SuccessSnackBar from '../SuccessSnackBar/SuccessSnackBar'
import { CSVLink, CSVDownload } from "react-csv";
import UpdateContest from './UpdateContest'
function Contest(){
    const [loading,setloading]=useState(true)
    const [contestdata,setcontestdata]=useState([])
    const [headCells,setheadcells]=useState([])
    const [rows,setrows]=useState([])
    const [formstate,setformstate]=useState(false)
    const [updateformstate,setupdateformstate]=useState(false)
    const [updatecontestid,setupdatecontestid]=useState(null)
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
     const url=`${process.env.REACT_APP_BACKEND_URL}contests`
     $.ajax({
        url,
        dataType: 'json',
        cache: false,
        success: function(data) {
        //   console.log(data)
          setloading(false)
          console.log(data)
          setcontestdata(data.contests)
          const headCells = [
            // { id: 'idx', numeric: false, disablePadding: true, label: 'Email' },
            { id: 'name', numeric: false, disablePadding: false, label: 'ContestId' },
            { id: 'contestname', numeric: false, disablePadding: false, label: 'Contestname' },
            { id: 'contestduration', numeric: true, disablePadding: false, label: 'Contest Durations' },
            { id: 'starttime', numeric: true, disablePadding: false, label: 'Start Time' },
            { id: 'endtime', numeric: true, disablePadding: false, label: 'End Time' },
            { id: 'contesttype', numeric: true, disablePadding: false, label: 'Contest Type' },
            { id: 'noofquestions', numeric: true, disablePadding: false, label: 'No of Questions'},
            {id: 'totalslots', numeric: true, disablePadding: false, label: 'Total Slots'},
            {  id:'slotstrength', numeric: true, disablePadding: false, label: 'Slot Strength'},
          ];
          let Rows=[]
          data.contests.map(contest=>{
            Rows.push({
              name:contest.id,
              contestname:contest.contestname,
              contestduration:contest.contestduration,
              starttime:contest.starttime,
              endtime:contest.endtime,
              contesttype:contest.contesttype,
              noofquestions:contest.noofquestions,
              totalslots:contest.totalslots.length,
              slotstrength:contest.slotstrength,
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
const filterFields=["contestname","contesttype","slotstrength","starttime"]
const search=(rows)=>{
  if(filterstate=="")
   return rows

   if(filterstate=="contestname")
   return rows.filter(r=>r.contestname.toLowerCase().indexOf(q)==0 )

   if(filterstate=="contesttype")
   return rows.filter(r=>r.contesttype.toLowerCase().indexOf(q)==0 )

   if(filterstate=="slotstrength")
   return rows.filter(r=>r.slotstrength!=null).filter(r=>r.slotstrength.indexOf(q)==0) 

   if(filterstate=="starttime")
   return rows.filter(r=>r.starttime!=null).filter(r=>r.starttime.toLowerCase().indexOf(q)==0) 

}

//filter function...

    return (
        <div>
            <Header listsize={contestdata.length} 
             showupdatebtn={true} filterFields={filterFields} 
            filterstate={filterstate} setFilterState={setFilterState} setformstate={setformstate}
             setloading={setloading} required="true"/>
             { !formstate && !updateformstate && !loading && <div style={{ display:'flex', justifyContent:'space-between',padding:'5px',margin:'10px' }} >
           <CSVLink data={rows}  filename={"Contests.csv"}  ><button className="imageBtn" >Export Csv</button> 
           </CSVLink>
           <input style={{height:'40px' }} type="text" placeholder="Search here..." value={q} onChange={(e)=>setQ(e.target.value)} />
           </div> }
            {opensuccess &&  <SuccessSnackBar open={opensuccess} handleClick={handleClickSuccess} successmessage={successmessage} handleClose={handleCloseSuccess} /> }
            {loading &&!formstate&& (
                <Loader />
            )}
            {!loading && !updateformstate && contestdata.length===0&&!formstate&&(
                <Nulldata setformstate={setformstate} required="true"/>
            )}
            {!loading && !updateformstate && !formstate && contestdata.length>0 &&(
                <EnhancedTable heading="contest" loading={loading} formstate={formstate} setloading={setloading}
                setformstate={setformstate} setupdateformstate={setupdateformstate}  setOpenSuccess={setOpenSuccess}
                 setupdatecontestid={setupdatecontestid}
                setSuccessMessage={setSuccessMessage} rows={search(rows)} headCells={headCells} />
            )}
              {!updateformstate && formstate&&(
             <div>
            <CreateContest  setloading={setloading} setOpenSuccess={setOpenSuccess} 
            setSuccessMessage={setSuccessMessage}  setformstate={setformstate}/>
             </div>
         )}

         { !loading && !formstate && updateformstate && (  <div> 
             <UpdateContest setloading={setloading} loading={loading} setupdateformstate={setupdateformstate} updatecontestid={updatecontestid} />
            </div>  ) }
        </div>
    )
}

export default Contest
