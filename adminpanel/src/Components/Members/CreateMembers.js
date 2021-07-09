import React,{useState,useContext} from 'react'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar'
import ImageUploading from 'react-images-uploading'
import { AuthContext } from '../Context/Auth-Context'
import Loader from '../Loader/Loader'
import $ from 'jquery'
const CreateMembers = (props) => {


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
   const handlecancelclick=()=>{
       props.setformstate(false)
   }
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
      data.name=document.getElementById('membername').value
      data.post=document.getElementById('memberpost').value
      data.companyname=document.getElementById('companyname').value
      data.image= image.length==0 ?null:image[0].data_url
      data.year=document.getElementById('year').value
      data.linkedin=document.getElementById('linkedin').value
      data.facebook=document.getElementById('facebook').value
      data.instagram=document.getElementById('instagram').value
      

     // POST REQ To create a new contest
    
     console.log(data)
      const url=`${process.env.REACT_APP_BACKEND_URL}createmember`
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
         props.setSuccessMessage('Member Created successfully')
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


    return (
        <div class="container">  
        {loading && <Loader /> }
        {open && <ErrorSnackBar open={open}  handleClick={handleClick} error={error} handleClose={handleClose}  />}
       { !loading && <form   onSubmit={handleformsubmit} style={{marginTop:'50px'}} >
        <div className="formHeader" ><h3>Create a New Member</h3></div>
         
          <div id="contact" >
          <fieldset>
            <input placeholder="Member Name" type="text" tabindex="2" required id="membername"/>
          </fieldset>
         
          <fieldset>
            <input placeholder="Post" type="text" tabindex="2" required id="memberpost"/>
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
             <label  >Select an Image of Member</label><br/><br/>
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
            <input placeholder="Company Name" type="text" tabindex="4" required id="companyname"/>
          </fieldset>
          
          <fieldset>
            <input placeholder="year" type="text" tabindex="4" required id="year"/>
          </fieldset>
          
          <fieldset>
          <input placeholder="linked" type="text" tabindex="4" required id="linkedin"/>
          </fieldset>
          <fieldset>
          <input placeholder="facebook" type="text" tabindex="4" required id="facebook"/>
          </fieldset>
          <fieldset>
          <input placeholder="instagram" type="text" tabindex="4" required id="instagram"/>
          </fieldset>
        
          <fieldset>
            <button name="submit" type="submit" id="contact-submit" >Submit</button>
            <button id="contact-cancel" onClick={handlecancelclick}>Cancel</button>
          </fieldset>
          </div>
        </form>}
      </div>
    )
}

export default CreateMembers
