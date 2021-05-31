//This file is for creating the questions and also lists the already created questions for the Choosen contest .....

import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import  Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata'
import $ from 'jquery'
import CreateQuestion from './CreateQuestion'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar'
import EnhancedTable from '../DataTable/Datatable'
function Questions() {
    const contestid=useParams().cid
    const [loading,setloading]=useState(true)
    const [rows,setrows]=useState([])
    const [headCells,setheadcells]=useState([])
    const [questions,setquestions]=useState([])
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
                    
                    { id: 'question', numeric: true, disablePadding: false, label: 'Question' },
                    { id: 'correctvalue', numeric: true, disablePadding: false, label: 'CorrectValue' },
                    { id: 'score', numeric: true, disablePadding: false, label: 'Score'},

                  ];
                  let Rows=[]
                  //defining Rows array
                  data.questions.map(ques=>{
                    Rows.push({
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
                setError(error.message || 'something went wrong...')
                setOpen(true)
                console.error(error)
            }
        })
    },[])
    return (
        <React.Fragment>
            {open &&  <ErrorSnackBar  open={open}  handleClick={handleClick} error={error} handleClose={handleClose} />  }
        <div className="contest__questions">   
        <div className="contest__questionheader">
        <Header listsize={questions.length} setformstate={setformstate} setloading={setloading} required="true"/>
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
           <CreateQuestion/>
       )}
       {!loading&&!formstate&&questions.length!==0&&(
           <div>
               <EnhancedTable  heading="Question" rows={rows} headCells={headCells}  />
              
           </div>
       )}
        </div>
        </React.Fragment>
    )
}

export default Questions