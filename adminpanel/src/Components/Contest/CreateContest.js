import React,{useState,useContext} from 'react'
import ImageUploading from 'react-images-uploading'
import DatePicker from "react-datepicker"
import Loader from '../Loader/Loader'
import { setMinutes,setHours } from 'date-fns'
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'
import $ from 'jquery'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar'
import {AuthContext} from '../Context/Auth-Context'
import SuccessSnackBar from '../SuccessSnackBar/SuccessSnackBar'
function CreateContest(props) {
   const auth=useContext(AuthContext)
   const [loading,setLoading]=useState(false)
   //error snackbar functions 
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
     //error snackbar functions 

   
   
  const [startTime,setStartTime]=useState()
  const [endTime,setEndTime]=useState()
  
  const [contestType,setContestType]=useState();
  
  const [contestItems,setContestItems]=useState([
    {slotno:'',slotstarttime:'',slotendtime:''}
  ])
       const handleformsubmit=(e)=>{
         e.preventDefault()
          setLoading(true)
        
        if(image.length==0 ){
          setError('Please upload an image also. It is a required field.')
          setOpen(true)
          console.log('upload an image')
          setLoading(false)
          return;
        }
        
         
           let data={}
           data.contestname=document.getElementById('contestname').value
           data.starttime=startTime
           data.endtime=endTime
           data.image= image.length==0 ?null:image[0].data_url
           data.noofquestions=document.getElementById('quesno').value
          //  data.contestduration=document.getElementById('contestduration').value
          data.contestduration=endTime-startTime
           data.prize=document.getElementById('prize').value
           data.venue=document.getElementById('venue').value
           data.totalslots=contestItems
           data.slotstrength=document.getElementById('slotstrength').value
           data.rules=document.getElementById('rules').value
           data.fees=document.getElementById('fees').value
           data.contestdetail=document.getElementById('contestDetail').value
           data.contesttype=contestType

          // POST REQ To create a new contest
         
          console.log(data)
           const url=`${process.env.REACT_APP_BACKEND_URL}createcontest`
           $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            url,
            headers: {"Authorization":'Bearer ' + auth.token},
            success: function (data) {
              console.log("success");
              // console.log(JSON.stringify(data));
               setLoading(false)
              props.setOpenSuccess(true)
              props.setSuccessMessage('Contest Created successfully')
              props.setformstate(false)
            },
            error: function (error) {
             console.log(error)
             setLoading(false)
            setError(error.responseJSON.message)
            setOpen(true)
            },
          });
       }
       const [image,setImage]=useState([])
       const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImage(imageList);
      };
       const maxNumber=1;
          const handlecancelclick=()=>{
              props.setformstate(false)
          }

        const handleChangeInput=(i,event,temp)=>{
          const values=[...contestItems];
          if(temp=='slotno'){
           values[i][temp]=event.target.value
          }
          else{
          values[i][temp]=event
          }
          setContestItems(values)
          console.log(event)
        }
        const handelAddFields=()=>{
          setContestItems([...contestItems,{ slotno:'', slotstarttime:'',slotendtime:''}])
        }
        const handelDeleteFields=(i)=>{
            const values=[...contestItems]
            values.splice(i,1);
            setContestItems(values)
        }  
    return (
        
      <div class="container">  
        {loading && <Loader /> }
        {open && <ErrorSnackBar open={open}  handleClick={handleClick} error={error} handleClose={handleClose}  />}
       { !loading && <form   onSubmit={handleformsubmit} style={{marginTop:'50px'}} >
        <div className="formHeader" ><h3>Create a New Contest</h3></div>
         
          <div id="contact" >
          <fieldset>
            <input placeholder="Contest Name" type="text" tabindex="2" required id="contestname"/>
          </fieldset>
          <fieldset style={{textAlign:'justify'}} >
            <span style={{marginRight:'5px'}} >
          <DatePicker selected={startTime} selectsStart 
            startDate={startTime} endDate={endTime} 
            name="slot" 
            placeholderText="Start Time"
            timeInputLabel="Time:"
             dateFormat="Pp"
             showTimeInput
             minDate={Date.now() }
             onChange={date => setStartTime(date)}  />
             </span>
             <span style={{marginLeft:'10px'}} >
              <DatePicker selected={endTime}  selectsEnd startDate={startTime} 
              endDate={endTime} minDate={startTime} 
              placeholderText="End Time"
              timeInputLabel="Time:"
              dateFormat="Pp"
              showTimeInput
              onChange={date => setEndTime(date)} />
             </span>
          </fieldset>
          <fieldset>
            <input placeholder="No of Questions" type="number" tabindex="2" required id="quesno"/>
          </fieldset>
           
          <div  clasName="imageUploaderMenu" style={{display:'inline',textAlign:'justify',margin:'10px'}} >
          {/* <input name="image" value={image} type="text" tabindex="3" required hidden />  */}
              <ImageUploading
                multiple
                value={image}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                required
              >
        
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
             <label  >Select an Image for Contest</label><br/><br/>
            <button  className="imageBtn"
              style={isDragging ? { color: 'red' } : undefined}
              type="button"
              onClick={onImageUpload}
              {...dragProps}
            >
              Select Image
            </button>
            &nbsp;
           
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button  className="imageBtn" onClick={() => onImageUpdate(index)}>Update</button>
                  <button  className="imageBtn" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
          
          <fieldset>
            <input placeholder="Prize" type="text" tabindex="4" required id="prize"/>
          </fieldset>
          
          <fieldset>
            <input placeholder=" Max Slot Strength" type="number" tabindex="4" required id="slotstrength"/>
          </fieldset>

          <fieldset style={{textAlign:'justify'}}  >
            <label>Total Slots</label>
            <br/>
            <button  className="imageBtn" type="button" onClick={handelAddFields}  >Add New Items</button><br/><br/>
             {contestItems.map((times,i)=>(
               <div key={i} style={{margin:'10px'}} >
                 <input style={{margin:'5px'}} placeholder="Slot no" type="text" tabindex="3" id="slot"
                  onChange={event => handleChangeInput(i,event,"slotno")} value={times.slotno} required />
                 <span style={{ margin:'5px'}}>
                  <DatePicker style={{margin:'3px'}} minDate={new Date(Date.now())} selected={times.slotstarttime} value={times.slotstarttime} name="slotstarttime" placeholderText="Slot Start Time"
                    showTimeInput  timeInputLabel="Time:" dateFormat="Pp"
                    onChange={event => handleChangeInput(i,event,"slotstarttime")} />
                    </span>
                    <span style={{margin:'5px'}}>
                      <DatePicker style={{margin:'3px' }} selected={times.slotendtime} value={times.slotendtime} name="slotendtime"  placeholderText="Slot End Time"
                    showTimeInput  timeInputLabel="Time:" minDate={times.slotstarttime} dateFormat="Pp"
                    onChange={date => handleChangeInput(i,date,"slotendtime")} />
                     </span>
                    <br/>
                    <button className="imageBtn" style={{margin:'5px',backgroundColor:'red'}} onClick={()=>handelDeleteFields(i)} >Delete</button>
               </div>
             ))}
          </fieldset>

          
          <textarea placeholder="Contest Details" type="text" tabindex="4" required id="contestDetail"/>
          
          <fieldset>
          <input placeholder="Rules" type="text" tabindex="4" required id="rules"/>
          </fieldset>
          <fieldset>
          <input placeholder="Fees" type="number" tabindex="4" required id="fees"/>
          </fieldset>
          <fieldset>
          <input placeholder="Venue" type="text" tabindex="4" required id="venue"/>
          </fieldset>
          <fieldset style={{textAlign:'justify'}} >
            <label>Contest Type</label>
            <br/>
          <select  className="imageBtn" placeholder="ContestType" value={contestType}
           onChange={(event)=>setContestType(event.target.value)}  >
             <option value={null} > select contest type </option>
            <option value={'ongoing'}  >ongoing </option>
            <option value={'upcoming'} >upcoming </option>
            <option value={'previous'} >previous </option>
          </select>
          </fieldset><br/><br/>
          <fieldset>
            <button name="submit" type="submit" id="contact-submit" >Submit</button>
            <button id="contact-cancel" onClick={handlecancelclick}>Cancel</button>
          </fieldset>
          </div>
        </form>}
      </div>
    )
}

export default CreateContest