import React,{useState} from 'react'
import ImageUploading from 'react-images-uploading'
import DatePicker from "react-datepicker"
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'
import $ from 'jquery'
function CreateContest({setformstate}) {
  
  const [startTime,setStartTime]=useState()
  const [endTime,setEndTime]=useState()
  
  const [contestType,setContestType]=useState();
  
  const [contestItems,setContestItems]=useState([
    {slotStartTime:'',slotEndTime:''}
  ])
       const handleformsubmit=(e)=>{
         e.preventDefault()
         console.log(contestType);
         console.log(contestItems)
        
           let data={}
          //  data.email=document.getElementById('email-val').value
          //  data.name=document.getElementById('name-val').value
          //  data.phoneno=document.getElementById('phone-val').value
          //  data.college=document.getElementById('college-val').value
          //  data.Branch=document.getElementById('branch-val').value
          //  data.year=document.getElementById('year-val').value
          //  data.password=document.getElementById('pass-val').value
           //POST REQ To create a new user
          //  const url='https://geekscode-official-contest.herokuapp.com/createcontest'
          //  $.ajax({
          //   type: "POST",
          //   data: JSON.stringify(data),
          //   contentType: "application/json",
          //   url,
          //   success: function (data) {
          //     console.log("success");
          //     // console.log(JSON.stringify(data));
          //   },
          //   error: function (error) {
          //    console.log(error)
          //   },
          // });
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
          values[i][temp]=event
          setContestItems(values)
          console.log(event)
        }
        const handelAddFields=()=>{
          setContestItems([...contestItems,{slotStartTime:'',slotEndTime:''}])
        }
        const handelDeleteFields=(i)=>{
            const values=[...contestItems]
            values.splice(i,1);
            setContestItems(values)
        }  
    return (
        
        <div class="container">  
        <form   onSubmit={handleformsubmit} style={{marginTop:'50px'}}>
        <div className="formHeader" ><h3>Create a New Contest</h3></div>
          {/* <fieldset>
            <input placeholder="Email" type="text" tabindex="1" required autofocus id="email-val"/>
          </fieldset> */}
          <div id="contact" >
          <fieldset>
            <input placeholder="Contest Name" type="text" tabindex="2" required id="name-val"/>
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
            <input placeholder="Questions " type="text" tabindex="2" required id="ques-val"/>
          </fieldset>
          <fieldset>
            <input placeholder="Contest Duration(in hrs)" type="tel" tabindex="3" required id="contestduration-val"/>
          </fieldset>
           
          <div  clasName="imageUploaderMenu" style={{display:'inline',textAlign:'justify',margin:'10px'}} >
           
      <ImageUploading
        multiple
        value={image}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
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
            <input placeholder="Prize" type="text" tabindex="4" required id="prize-val"/>
          </fieldset>

          <fieldset style={{textAlign:'justify'}}  >
            <label>Total Slots</label>
            <br/>
            <button  className="imageBtn" onClick={handelAddFields}  >Add New Items</button><br/><br/>
             {contestItems.map((times,i)=>(
               <div key={i} style={{margin:'10px'}} >
                 <span style={{ margin:'5px'}}>
                  <DatePicker style={{margin:'3px'}} selected={times.slotStartTime} value={times.slotStartTime} name="slotStartTime" placeholderText="Slot Start Time"
                    showTimeSelect dateFormat="Pp"
                    onChange={event => handleChangeInput(i,event,"slotStartTime")} />
                    </span>
                    <span style={{margin:'5px'}}>
                      <DatePicker style={{margin:'3px' }} selected={times.slotEndTime} value={times.slotEndTime} name="slotEndTime"  placeholderText="Slot End Time"
                    showTimeSelect dateFormat="Pp"
                    onChange={date => handleChangeInput(i,date,"slotEndTime")} />
                     </span>
                    <br/>
                    <button className="imageBtn" style={{margin:'5px',backgroundColor:'red'}} onClick={()=>handelDeleteFields(i)} >Delete</button>
               </div>
             ))}
          </fieldset>

          <fieldset> 
          <textbox placeholder="Contest Details" type="text" tabindex="4" required id="contestDetail-val"/>
          </fieldset>
          <fieldset>
          <input placeholder="Rules" type="text" tabindex="4" required id="rules-val"/>
          </fieldset>
          <fieldset style={{textAlign:'justify'}} >
            <label>Contest Type</label>
            <br/>
          <select  className="imageBtn" placeholder="ContestType" value={contestType}
           onChange={(event)=>setContestType(event.target.value)}  >
            <option value={'onGoing'}  >onGoing </option>
            <option value={'upComing'} >upComing </option>
            <option value={'Previous'} >Previous </option>
          </select>
          </fieldset><br/><br/>
          <fieldset>
            <button name="submit" type="submit" id="contact-submit" onClick={handleformsubmit} >Submit</button>
            <button id="contact-cancel" onClick={handlecancelclick}>Cancel</button>
          </fieldset>
          </div>
        </form>
      </div>
    )
}

export default CreateContest