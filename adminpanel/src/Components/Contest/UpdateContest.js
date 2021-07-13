import React,{useState,useContext,useEffect} from 'react'
import ImageUploading from 'react-images-uploading'
import DatePicker from "react-datepicker"
import Loader from '../Loader/Loader'
import { setMinutes,setHours } from 'date-fns'
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'
import $ from 'jquery'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar'
import {AuthContext} from '../Context/Auth-Context'
import SuccessSnackBar from '../SuccessSnackBar/SuccessSnackBar'
const UpdateContest = (props) => {
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
        const [image,setImage]=useState([])
        const onChange = (imageList, addUpdateIndex) => {
         // data for submit
         console.log(imageList, addUpdateIndex);
         setImage(imageList);
       };
        const maxNumber=1;
 
 
        const [startTime,setStartTime]=useState()
        const [endTime,setEndTime]=useState()

        const [contestType,setContestType]=useState();

        const [contestItems,setContestItems]=useState([
        {slotno:'',slotstarttime:'',slotendtime:''}
        ])

//get request for existing contest
    useEffect(()=>{
        //setloading(true)
     const url=`${process.env.REACT_APP_BACKEND_URL}contest/${props.updatecontestid}`
     $.ajax({
        url,
        dataType: 'json',
        cache: false,
        success: function(data) {
           console.log(data)
           const mycontest=data.contest
           document.getElementById('contestname').value=mycontest.contestname
           setStartTime(mycontest.starttime)
           setEndTime(mycontest.endtime)
           document.getElementById('quesno').value=mycontest.noofquestions
           document.getElementById('contestDetail').value=mycontest.contestdetail
           document.getElementById('rules').value=mycontest.rules
           document.getElementById('fees').value=mycontest.fees
           document.getElementById('venue').value=mycontest.venue
           document.getElementById('prize').value=mycontest.prize
           document.getElementById('slotstrength').value=mycontest.slotstrength
         // setloading(false)
        
        },
        error: function(xhr, status, err) {
          //setloading(false)
          console.error( status, err.toString());
        }
     })
        
    },[])

    return (
        <div class="container">  
        {loading && <Loader /> }
        {open && <ErrorSnackBar open={open}  handleClick={handleClick} error={error} handleClose={handleClose}  />}
       { !loading && <form   style={{marginTop:'50px'}} >
        <div className="formHeader" ><h3>Update Contest</h3></div>
         
          <div id="contact" >
          <fieldset>
            <input placeholder="Contest Name" type="text"  disabled tabindex="2" required id="contestname"/>
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
       
          <fieldset>
            <button name="submit" type="submit" id="contact-submit" >Submit</button>
            <button id="contact-cancel" onClick={()=>props.setupdateformstate(false)} >Cancel</button>
          </fieldset>
          </div>
        </form>}
      </div>
    )
}

export default UpdateContest
