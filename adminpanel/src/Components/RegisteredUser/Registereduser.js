//This file is for showing all the available contests whose registered users you want to check
import React,{useState,useEffect} from 'react'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata';
import ContestCard from '../Utils/ContestCard'
import {Link} from 'react-router-dom'
import $ from 'jquery'
function Registereduser() {
    const [loading,setloading]=useState(true)
    const [contests,setcontests]=useState([])
    const [formstate,setformstate]=useState(false)

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
          console.error( status, err.toString());
        }
      })
    },[])
    return (
        <div>
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
                return <Link to={`/registeredusers/${contest.id}`}><ContestCard contestname={contest.contestname} contestid={contest.id}/></Link>
             })
           )}
           </div>
           {!loading&&contests.length===0&&(
             <Nulldata  text="There are no available contests,first create a contest to create questions" setformstate={setformstate} required="true"/>
           )}
           <div>
           </div>
        </div>
    )
}

export default Registereduser
