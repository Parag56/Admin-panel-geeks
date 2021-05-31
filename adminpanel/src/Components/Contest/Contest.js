import React, { useEffect,useState} from 'react'
import Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata'
import CreateContest from './CreateContest'
import $ from 'jquery'
import EnhancedTable from '../DataTable/Datatable'
function Contest(){
    const [loading,setloading]=useState(true)
    const [contestdata,setcontestdata]=useState([])
    const [headCells,setheadcells]=useState([])
    const [rows,setrows]=useState([])
    const [formstate,setformstate]=useState(false)
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
          
            { id: 'contestname', numeric: true, disablePadding: false, label: 'Contestname' },
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
    },[])


    return (
        <div>
            <Header listsize={contestdata.length} setformstate={setformstate} setloading={setloading} required="true"/>
            {loading &&!formstate&& (
                <Loader />
            )}
            {!loading && contestdata.length===0&&!formstate&&(
                <Nulldata setformstate={setformstate} required="true"/>
            )}
            {!loading && contestdata.length>0 &&(
                <EnhancedTable heading="Contest" rows={rows} headCells={headCells} />
            )}
              {formstate&&(
             <div>
            <CreateContest setformstate={setformstate}/>
             </div>
         )}
        </div>
    )
}

export default Contest
