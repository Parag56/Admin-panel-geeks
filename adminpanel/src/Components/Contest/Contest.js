import React, { useEffect,useState} from 'react'
import Header from '../Pageheader/Header'
import Loader from '../Loader/Loader'
import Nulldata from '../Nulldata/Nulldata'
import CreateContest from './CreateContest'
import $ from 'jquery'
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
        //   setcontestdata(data.contests)
        //   const headCells = [
        //     // { id: 'idx', numeric: false, disablePadding: true, label: 'Email' },
        //     { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
        //     { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        //     { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
        //     { id: 'uploadimage', numeric: true, disablePadding: false, label: 'Upload Image' },
        //     { id: 'phoneno', numeric: true, disablePadding: false, label: 'Phone Number'},
        //     {id: 'college', numeric: true, disablePadding: false, label: 'College'},
        //     {  id:'year', numeric: true, disablePadding: false, label: 'Year'},
        //     { id: 'branch', numeric: true, disablePadding: false, label: 'Branch'} ,
        //   ];
        //   let Rows=[]
        //   data.users.map(user=>{
        //     Rows.push({
        //       email:user.email,
        //       name:user.name,
        //       id:user.id,
        //       uploadimage:user.profilePhotoLocation,
        //       phoneno:user.phoneno,
        //       college:user.college,
        //       year:user.year,
        //       branch:user.Branch,
        //     })
        //   })
        //   setrows(Rows);
        //   setheadcells(headCells)
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
              {formstate&&(
           <div>
            <CreateContest setformstate={setformstate}/>
             </div>
         )}
        </div>
    )
}

export default Contest
