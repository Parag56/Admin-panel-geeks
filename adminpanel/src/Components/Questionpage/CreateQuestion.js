import React,{useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import ImageUploading from 'react-images-uploading'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar';
import {AuthContext} from '../Context/Auth-Context'
import $ from 'jquery'
const CreateQuestion = () => {
   const auth= useContext(AuthContext)
    const contestId=useParams().cid
    let element=document.getElementById('actual-btn')
    const [open, setOpen] = useState(false);
    const [error,setError]=useState()
    const handleClick = () => {
      setOpen(true);
    };
    const [csvFile,setcsvFile]=useState()
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };  

   
    const [image,setImage]=useState([])
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImage(imageList);
      };
      const maxNumber=1;

      const [options,setOptions]=useState([
          {option:'',value:''}
      ])
      //this function is for adding question manually...
      const handleformsubmit=(e)=>{
        e.preventDefault()
          console.log(options,contestId);

          //const files = document.getElementById("files");
          // const formData = new FormData();
          // formData.append("question", document.getElementById('quesText').value);
          // formData.append("image",image)
          // formData.append("options",options)
          // formData.append("correctValue",document.getElementById('correctVal').value)
          // formData.append("score",document.getElementById('score').value)
          
          const url=`${process.env.REACT_APP_BACKEND_URL}questions/${contestId}`
          let data={}
          data.question=document.getElementById('quesText').value
          data.image=image[0].data_url
          data.options=options
          data.correctvalue=document.getElementById('correctVal').value
          data.score=document.getElementById('score').value
          console.log(data)

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
      const handleAlternateformsubmit=(e)=>{
           e.preventDefault();
      }
      const [csv,setcsv]=useState(false)
      const optionValueHandler=(i,event,element)=>{
          const values=[...options]
          values[i][element]=event.target.value;
          setOptions(values);
      }
      const addOtherOption=()=>{
          setOptions([...options,{option:'',value:''}])
      }
      const deleteOptionHandler=(i)=>{
         const values=[...options]
         values.splice(i,1);
         setOptions(values);
      }
    return (
        <div  class="container" >

            <div style={{display:'flex',justifyContent:'center'}} > <span 
            style={{ backgroundColor:'#6F2D91',borderRadius:'4px', padding:'5px 10px',cursor:'pointer',color:'white',margin:'5px' }}  onClick={()=>setcsv(true)} >Add Questions Manually</span> 
            <span style={{ backgroundColor:'#6F2D91',borderRadius:'4px',padding:'5px 10px',cursor:'pointer',color:'white',margin:'5px' }}
              onClick={()=>{setcsv(false)
               setcsvFile(null)
              }
              
              } >Add Questions via Csv file</span>  </div>
            {open && <ErrorSnackBar  open={open}  handleClick={handleClick} error={error} handleClose={handleClose} />}
          { csv && <form >
            <div className="formHeader" ><h3>Add a Question {!csv ? ' (via Csv)' :' (Manually)'}</h3></div>
                <div id="contact" >
          <div style={{display:'inline',textAlign:'justify',margin:'10px'}} >
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
                    <label> Upload Image for Question</label><br/><br/>
                    <button  className="imageBtn"
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    >
                    Pick
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
            <input placeholder="Question " type="text" tabindex="2" required id="quesText"/>
          </fieldset>
          <div style={{textAlign:'justify',margin:'20px',marginLeft:'0px'}} >
          <label>Options</label><br/>
          <button onClick={addOtherOption}  className="imageBtn" >Add Option</button>
          </div>
          {options.map((val,i)=>(
              <fieldset>
                   <input placeholder="Option Key "
                    value={val.option}
                    onChange={(event)=>optionValueHandler(i,event,"option")} 
                    type="text" tabindex="2" required id="quesText"/>

                     <input placeholder="Option value"
                    value={val.value}
                    onChange={(event)=>optionValueHandler(i,event,"value")} 
                    type="text" tabindex="2" required id="quesText"/>
                    <div style={{textAlign:'justify'}} >
                    <button onClick={(i)=>deleteOptionHandler(i)} 
                    className="imageBtn" style={{backgroundColor:'red'}} > Delete</button>
                    </div>
              </fieldset>
          ))}
          <br/><br/>
           
              {/* <fieldset  style={{textAlign:'justify'}} >
              <input id="actual-btn" type="file" required  hidden />
              <label className="imageBtn" htmlFor="actual-btn" >choose a csv file</label>
                <span id="file-chosen">{element ? element.value:'No file Chosen' }</span>
              </fieldset><br/><br/> */}
       
          <fieldset>
          <input placeholder="Correct Value" type="text" tabindex="2" required id="correctVal"/>
          </fieldset>
          <fieldset>
            <input placeholder="Score" type="text" tabindex="2" required id="score"/>
          </fieldset>
          <button name="submit" type="submit"   id="contact-submit" onClick={handleformsubmit}>Submit</button>
            <button id="contact-cancel" >Cancel</button>
            </div>
    </form>}
    {!csv && 
    <div class="container">
             <form>
             <div className="formHeader" ><h3>Add a Question {!csv ? ' (via Csv)' :' (Manually)'}</h3></div>
               <div id="contact">
             <fieldset  style={{textAlign:'justify'}} >
              <input value={csvFile} onChange={(event)=>setcsvFile(event.target.value)} id="actual-btn" type="file" required  hidden />
              <label className="imageBtn" htmlFor="actual-btn"  >choose a csv file</label>
                <span id="file-chosen">{ csvFile &&  `${csvFile}` }</span>
              </fieldset><br/><br/>
            <button name="submit" type="submit"   id="contact-submit" onClick={handleAlternateformsubmit}>Submit</button>
            <button id="contact-cancel" >Cancel</button>
            </div>
            </form>
    </div>
    }
    </div>
    )
}
export default CreateQuestion