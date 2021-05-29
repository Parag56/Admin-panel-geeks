import React,{useState} from 'react'
import ImageUploading from 'react-images-uploading'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar';
const CreateQuestion = () => {
    const DUMMY_CONTEST=[
        {contestName:'contestA',contestId:'1'},
        {contestName:'contestB',contestId:'2'},
        {contestName:'contestC',contestId:'3'},
        {contestName:'contestD',contestId:'4'}
    ]
  
    let element=document.getElementById('actual-btn')
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

    const [contestId,setContestId]=useState();
    const [image,setImage]=useState([])
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImage(imageList);
      };
      const maxNumber=1;

      const [options,setOptions]=useState([
          {optionKey:'',optionValue:''}
      ])
      const handleformsubmit=(e)=>{
        e.preventDefault()
          console.log(options,contestId);

          const files = document.getElementById("files");
          const formData = new FormData();
          formData.append("files", files);
          const url=`${process.env.REACT_APP_BACKEND_URL}signup`
          fetch(`${process.env.REACT_APP_BACKEND_URL}uploadfile`, {
            method: 'post',
            body: formData
        })
            .then((res) => console.log(res))
            .catch((err) => ("Error occured", err));

      }

      const optionValueHandler=(i,event,element)=>{
          const values=[...options]
          values[i][element]=event.target.value;
          setOptions(values);
      }
      const addOtherOption=()=>{
          setOptions([...options, {optionKey:'',optionValue:''}])
      }
      const deleteOptionHandler=(i)=>{
         const values=[...options]
         values.splice(i,1);
         setOptions(values);
      }
    return (
        <div  class="container" >
            {open && <ErrorSnackBar  open={open}  handleClick={handleClick} error={error} handleClose={handleClose} />}
            <form >
            <div className="formHeader" ><h3>Add a Question</h3></div>
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
                    value={val.optionKey}
                    onChange={(event)=>optionValueHandler(i,event,"optionKey")} 
                    type="text" tabindex="2" required id="quesText"/>

                     <input placeholder="Option value"
                    value={val.optionValue}
                    onChange={(event)=>optionValueHandler(i,event,"optionValue")} 
                    type="text" tabindex="2" required id="quesText"/>
                    <div style={{textAlign:'justify'}} >
                    <button onClick={(i)=>deleteOptionHandler(i)} 
                    className="imageBtn" style={{backgroundColor:'red'}} > Delete</button>
                    </div>
              </fieldset>
          ))}
          <br/><br/>
           
              <fieldset  style={{textAlign:'justify'}} >
              <input id="actual-btn" type="file" required  hidden />
              <label className="imageBtn" htmlFor="actual-btn" >choose a csv file</label>
                <span id="file-chosen">{element ? element.value:'No file Chosen' }</span>
              </fieldset><br/><br/>
           <fieldset style={{textAlign:'justify'}} >
            <label>Contest Id</label>
            <br/>
          <select className="imageBtn" placeholder="ContestId" value={contestId}
           onChange={(event)=>setContestId(event.target.value)}>
            {DUMMY_CONTEST.map((ques,i)=>(
                <option value={ques.contestId}> {ques.contestName} </option>
            ))}
          </select>
          </fieldset>
          <fieldset>
          <input placeholder="Correct Value" type="text" tabindex="2" required id="correctVal"/>
          </fieldset>
          <fieldset>
            <input placeholder="Score" type="text" tabindex="2" required id="score"/>
          </fieldset>
          <button name="submit" type="submit"   id="contact-submit" onClick={handleformsubmit}>Submit</button>
            <button id="contact-cancel" >Cancel</button>
            </div>
    </form>
    </div>
    )
}
export default CreateQuestion