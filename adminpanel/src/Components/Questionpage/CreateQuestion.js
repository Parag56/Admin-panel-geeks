import React,{useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import Loader from '../Loader/Loader'
import ImageUploading from 'react-images-uploading'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar';
import {AuthContext} from '../Context/Auth-Context'
import $ from 'jquery'
import SuccessSnackBar from '../SuccessSnackBar/SuccessSnackBar';
const CreateQuestion = (props) => {
    const auth= useContext(AuthContext)
    const [loading,setLoading]=useState(false);
    const contestId=useParams().cid
    const [csvFile,setcsvFile]=useState()
    const [corrval,setcorrval]=useState()
    let element=document.getElementById('actual-btn')
    //error snackbar functions..
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
    //error snack bar function...

   
    const [image,setImage]=useState([])
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImage(imageList);
      };
      const maxNumber=1;

      const [options,setOptions]=useState([
           //{option:'',value:''}
      ])
      //this function is for adding question manually...
      const handleformsubmit=(e)=>{
        e.preventDefault()
          console.log(options,contestId);
          setLoading(true)
          const url=`${process.env.REACT_APP_BACKEND_URL}questions/${contestId}`
          let data={}
          data.question=document.getElementById('quesText').value
          data.image= image.length==0?null:image[0].data_url
          data.options=options
          // data.correctvalue=document.getElementById('correctVal').value
          data.correctvalue=corrval
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
                setLoading(false)
                props.setSuccessMessage('Question created successfully')
                props.setOpenSuccess(true)
                props.setformstate(false);
              },
              error: function (error) {
                console.log(error)
                setLoading(false)
                setError(error.responseJSON.message)
                setOpen(true)
               
              },
            });

      }
      const handleAlternateformsubmit=(e)=>{
           e.preventDefault();
      }
      const [csv,setcsv]=useState(true)
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
        <React.Fragment>
          {loading && <Loader/>  }
      { !loading && <div  class="container" >
           
            <div style={{display:'flex',justifyContent:'center'}} > <span 
            style={{ backgroundColor:'#6F2D91',borderRadius:'4px', padding:'5px 10px',cursor:'pointer',color:'white',margin:'5px' }}  onClick={()=>setcsv(true)} >Add Questions Manually</span> 
            <span style={{ backgroundColor:'#6F2D91',borderRadius:'4px',padding:'5px 10px',cursor:'pointer',color:'white',margin:'5px' }}
              onClick={()=>{setcsv(false)
               setcsvFile(null)
              }
              
              } >Add Questions via Csv file</span>  </div>
             
            { csv && <form onSubmit={handleformsubmit} >
             
            {open && <ErrorSnackBar  open={open}  handleClick={handleClick} error={error} handleClose={handleClose} />}
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
                                value={i+1}
                                onChange={(event)=>optionValueHandler(i,event,"option")} 
                                type="text" tabindex="2" required id={`queskey_${i}`}
                                disabled
                                />

                                <input placeholder="Option value"
                                value={val.value}
                                onChange={(event)=>optionValueHandler(i,event,"value")} 
                                type="text" tabindex="2" required id={`quesText_${i}`}/>
                                <div style={{textAlign:'justify'}} >
                                <button onClick={()=>deleteOptionHandler(i)} 
                                className="imageBtn" style={{backgroundColor:'red'}} > Delete</button>
                                </div>
                          </fieldset>
                      ))}
                      <br/><br/>
                      
                  
                      {/* <fieldset>
                      <input placeholder="Correct Value" type="text" tabindex="2" required id="correctVal"/>
                      </fieldset> */}
                     <fieldset  style={{textAlign:'justify'}} >
                     {options && 
                     
                        <select className="imageBtn"  placeholder="Correct Value"
                           value={corrval} onChange={(event)=>setcorrval(event.target.value)} >
                             <option val={null} > No value Selected </option>
                             {options.map((op,i)=>(
                               <option value={op.value} >{op.value}</option>
                             ))}
                           
                         </select>
                      }
                      </fieldset>
                      <fieldset>
                        <input placeholder="Score" type="text" tabindex="2" required id="score"/>
                      </fieldset>
                      <button name="submit" type="submit"  id="contact-submit" >Submit</button>
                        <button id="contact-cancel" onClick={()=>props.setformstate(false)} >Cancel</button>
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
                        <button id="contact-cancel"  onClick={()=>props.setformstate(false)} >Cancel</button>
                        </div>
                        </form>
                </div>
                }
                </div>}
                </React.Fragment>
    )
}
export default CreateQuestion