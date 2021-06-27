//This file is for creating the questions and also lists the already created questions for the Choosen contest .....

import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import  Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata'
import $ from 'jquery'
import CreateQuestion from './CreateQuestion'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar'
import SuccessSnackBar from '../SuccessSnackBar/SuccessSnackBar'
import EnhancedTable from '../DataTable/Datatable'
import { CSVLink, CSVDownload } from "react-csv";
function Questions() {
    const contestid=useParams().cid
   
    const [loading,setloading]=useState(true)
   
    const [rows,setrows]=useState([])
    const [headCells,setheadcells]=useState([])
    const [questions,setquestions]=useState([])
    const [formstate,setformstate]=useState(false)
    const [q,setQ]=useState("")
    const [filterstate,setFilterState]=useState("")


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

    //Fetching the questions by Contest ID
    useEffect(()=>{
      const url=`${process.env.REACT_APP_BACKEND_URL}questions/${contestid}`
        $.ajax({
            url,
            dataType:'json',
            cache:false,
            success:function(data){
                //Set Loading state to false
                setloading(false)
                //add questions to questions state
                setquestions(data)
                console.log(data)


                const headCells = [
                  { id: 'name', numeric: true, disablePadding: false, label: 'questionId' },
                    { id: 'question', numeric: true, disablePadding: false, label: 'Question' },
                    { id: 'correctvalue', numeric: true, disablePadding: false, label: 'CorrectValue' },
                    { id: 'score', numeric: true, disablePadding: false, label: 'Score'},

                  ];
                  let Rows=[]
                  //defining Rows array
                  data.questions.map(ques=>{
                    Rows.push({
                    name:ques._id,
                     question:ques.question,
                     correctvalue:ques.correctvalue,
                     score:ques.score,
                    })
                  })
                  setrows(Rows);
                  setheadcells(headCells)


            },
            error:function(error){
                //Set Loading sate to false
                setloading(false)
                setError(error.responseJSON.message || 'something went wrong...')
                setOpen(true)
                console.error(error)
            }
        })
    },[formstate])

    //filter function...
   const filterFields=["question","correctvalue","score"]
   const search=(rows)=>{
     if(filterstate=="")
      return rows

      if(filterstate=="question")
      return rows.filter(r=>r.question.toLowerCase().indexOf(q)==0 )

      if(filterstate=="correctvalue")
      return rows.filter(r=>r.correctvalue.toLowerCase().indexOf(q)==0 )

      if(filterstate=="score")
      return rows.filter(r=>r.score!=null).filter(r=>r.score.indexOf(q)==0) 

     
   }

   //filter function...


    return (
        <React.Fragment>
           {opensuccess &&  <SuccessSnackBar open={opensuccess} handleClick={handleClickSuccess} successmessage={successmessage} handleClose={handleCloseSuccess}  />  }
            {open &&  <ErrorSnackBar  open={open}  handleClick={handleClick} error={error} handleClose={handleClose} />  }
        <div className="contest__questions">   
        <div className="contest__questionheader">
        <Header listsize={questions.length} filterFields={filterFields}
         filterstate={filterstate} setFilterState={setFilterState} setformstate={setformstate} 
         setloading={setloading} required="true"/>
      { !formstate && !loading && <div style={{ display:'flex', justifyContent:'space-between',padding:'5px',margin:'10px' }} >
           <CSVLink data={rows}  filename={"Questiondata.csv"}  ><button className="imageBtn" >Export Csv</button> 
           </CSVLink>
           <input style={{height:'40px' }} type="text" placeholder="Search here..." value={q} onChange={(e)=>setQ(e.target.value)} />
           </div> }
        </div>
        {loading&&!formstate&&(
           <Loader/>
        )}
        <div className="contest__questonsnull">
       {!loading&&!formstate&&questions.length===0&&(
           <Nulldata setformstate={setformstate} required="true"/>
       )}
       </div>
       {!loading &&formstate&&(
           <CreateQuestion   opensuccess={opensuccess} setOpenSuccess={setOpenSuccess} 
           formstate={formstate}  successmessage={successmessage}
            setSuccessMessage={setSuccessMessage} setformstate={setformstate} />
       )}
       {!loading&&!formstate&&questions.length!==0&&(
           <div>
               <EnhancedTable  heading="questions" loading={loading} formstate={formstate}
               setloading={setloading} setformstate={setformstate} setOpenSuccess={setOpenSuccess}
               setSuccessMessage={setSuccessMessage}
                 rows={search(rows)} headCells={headCells}  />
              
           </div>
       )}
        </div>
        </React.Fragment>
    )
}

export default Questions