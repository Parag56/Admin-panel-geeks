//This file is for showing the contests and the admin chooses the contest of which he has to create Questions

import React,{useState,useEffect} from 'react';
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata';
import ContestCard from '../Utils/ContestCard'
import {Link} from 'react-router-dom'
import './Question.css'
import $ from 'jquery'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar';
const Question = () => {
    const [loading,setloading]=useState(true)
    const [contests,setcontests]=useState([])
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

    //Fetching the Contests created 
    useEffect(()=>{
      const url=`${process.env.REACT_APP_BACKEND_URL}contests`
      $.ajax({
        url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          setloading(false)
          setcontests(data.contests)
        },
        error: function(xhr, status, err) {
          setloading(false)
          setError(err.toString())
          setOpen(true);
          console.error( status, err.toString());
        }
      })
    },[])

   
    return (
        <div>
          {open && <ErrorSnackBar  open={open}  handleClick={handleClick} error={error} handleClose={handleClose} /> }
          <div className="contest__header">
             <div className="contest__heading">
                <h2>Available Contests</h2>
             </div>
          </div>
           {loading&&!formstate&&(
             <Loader/>
           )}
           <div className="contestcards">
            {!loading&&contests.length!==0&&(
              contests.map((contest)=>{
                return <Link to={`/questions/${contest.id}`}><ContestCard contestname={contest.Contestname} contestid={contest.id}/></Link>
             })
           )}
           </div>
           {!loading&&contests.length===0&&(
             <Nulldata  text="There are no available contests,first create a contest to create questions" setformstate={setformstate} required="true"/>
           )}
           <div>
           </div>
        </div>
    );
}

export default Question;