import React from 'react'
import './Nulldata.css'
function Nulldata({setformstate,required,text}) {
    const handlefirstrecord=()=>{
        setformstate(true)
    }
    return (
        <div className="nulldata">
            <div className="no_record">
                <h2>No Record</h2>
              {text!=null&&(
                  <h5>{text}</h5>
              )}
              {
                  text==null&&(
                    <h5>There are no records in this resource</h5>
                  )
              }
                     
                
                
              
            </div>
            {
                required==="true"&&text==null&&(
                    <div className="create__resource">
                <button className="create" onClick={handlefirstrecord}>+&nbsp;Create First Record</button>
            </div>
                )
            }
          
        </div>
    )
}
export default Nulldata