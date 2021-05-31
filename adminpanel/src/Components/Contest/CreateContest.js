import React,{useState,useContext} from 'react'
import ImageUploading from 'react-images-uploading'
import DatePicker from "react-datepicker"
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'
import $ from 'jquery'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar'
import {AuthContext} from '../Context/Auth-Context'
function CreateContest({setformstate}) {
   const auth=useContext(AuthContext)
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
  
  const [startTime,setStartTime]=useState()
  const [endTime,setEndTime]=useState()
  
  const [contestType,setContestType]=useState();
  
  const [contestItems,setContestItems]=useState([
    {slotno:'',slotstarttime:'',slotendtime:''}
  ])
       const handleformsubmit=(e)=>{
         e.preventDefault()
         console.log(contestType);
         console.log(contestItems)
        if(image.length==0 ){
          setError('Please upload an image also. It is a required field.')
          setOpen(true)
          console.log('upload an image')
          return;
        }
           let data={}
           data.contestname=document.getElementById('contestname').value
           data.starttime=startTime
           data.endtime=endTime
           data.image= image.length==0 ?null:image[0].data_url
           data.noofquestions=document.getElementById('quesno').value
           data.contestduration=document.getElementById('contestduration').value
           data.prize=document.getElementById('prize').value
           data.totalslots=contestItems
           data.slotstrength=document.getElementById('slotstrength').value
           data.rules=document.getElementById('rules').value
           data.contestdetail=document.getElementById('contestDetail').value
           data.contesttype=contestType

          // POST REQ To create a new user
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
            },
            error: function (error) {
             console.log(error)
            
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
              setformstate(false)
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
        {open && <ErrorSnackBar open={open}  handleClick={handleClick} error={error} handleClose={handleClose}  />}
        <form   onSubmit={handleformsubmit} style={{marginTop:'50px'}}>
        <div className="formHeader" ><h3>Create a New Contest</h3></div>
         
          <div id="contact" >
          <fieldset>
            <input placeholder="Contest Name" type="text" tabindex="2" required id="contestname"/>
          </fieldset>
          <fieldset style={{textAlign:'justify'}} >
            <span style={{marginRight:'5px'}} >
          <DatePicker selected={startTime} name="slot" placeholderText="Start Time"
            showTimeSelect dateFormat="Pp"
             onChange={date => setStartTime(date)}  />
             </span>
             <span style={{marginLeft:'10px'}} >
              <DatePicker selected={endTime} placeholderText="End Time"
            showTimeSelect dateFormat="Pp"
             onChange={date => setEndTime(date)} />
             </span>
          </fieldset>
          <fieldset>
            <input placeholder="No of Questions" type="tel" tabindex="2" required id="quesno"/>
          </fieldset>
          <fieldset>
            <input placeholder="Contest Duration(in hrs)" type="tel" tabindex="3" required id="contestduration"/>
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
            <input placeholder=" Max Slot Strength" type="tel" tabindex="4" required id="slotstrength"/>
          </fieldset>

          <fieldset style={{textAlign:'justify'}}  >
            <label>Total Slots</label>
            <br/>
            <button  className="imageBtn" onClick={handelAddFields}  >Add New Items</button><br/><br/>
             {contestItems.map((times,i)=>(
               <div key={i} style={{margin:'10px'}} >
                 <input style={{margin:'5px'}} placeholder="Slot no" type="text" tabindex="3" id="slot"
                  onChange={event => handleChangeInput(i,event,"slotno")} value={times.slotno} required />
                 <span style={{ margin:'5px'}}>
                  <DatePicker style={{margin:'3px'}} selected={times.slotstarttime} value={times.slotstarttime} name="slotstarttime" placeholderText="Slot Start Time"
                    showTimeSelect dateFormat="Pp"
                    onChange={event => handleChangeInput(i,event,"slotstarttime")} />
                    </span>
                    <span style={{margin:'5px'}}>
                      <DatePicker style={{margin:'3px' }} selected={times.slotendtime} value={times.slotendtime} name="slotendtime"  placeholderText="Slot End Time"
                    showTimeSelect dateFormat="Pp"
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
          <fieldset style={{textAlign:'justify'}} >
            <label>Contest Type</label>
            <br/>
          <select  className="imageBtn" placeholder="ContestType" value={contestType}
           onChange={(event)=>setContestType(event.target.value)}  >
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
        </form>
      </div>
    )
}

export default CreateContest