import React,{useState} from 'react'
import './CreateUser.css'
import ImageUploading from 'react-images-uploading'
import $ from 'jquery'
import ErrorSnackBar from '../ErrorSnackbar/ErrorSnackBar'
function Createuser({setformstate,setOpenSuccess,setSuccessMessage}) {
  const [image,setImage]=useState([])
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
  //console.log(image);
       const handleformsubmit=(e)=>{
         e.preventDefault()
         console.log(image);
           let data={}
           data.email=document.getElementById('email-val').value
           data.name=document.getElementById('name-val').value
           data.phoneno=document.getElementById('phone-val').value
           data.imageUrl=image.length==0?null:image[0].data_url
           data.college=document.getElementById('college-val').value
           data.Branch=document.getElementById('branch-val').value
           data.year=document.getElementById('year-val').value
           data.password=document.getElementById('pass-val').value
           //POST REQ To create a new user
           const url=`${process.env.REACT_APP_BACKEND_URL}signup`
           $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            url,
            success: function (data) {
              console.log("success");
              setOpenSuccess(true)
              setSuccessMessage('User Created Successfully')
              // console.log(JSON.stringify(data));
            },
            error: function (error) {
             console.log(error)
             setError(error.responseJSON.message)
             setOpen(true)
            },
          });
       }
     
       const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImage(imageList);
        console.log(image);
      };
       const maxNumber=1;
          const handlecancelclick=()=>{
              setformstate(false)
          }
    return (
        
        <div class="container">  
         {open && <ErrorSnackBar  open={open}  handleClick={handleClick} error={error} handleClose={handleClose} />}
        <form   onSubmit={handleformsubmit}>
          <div className="formHeader" ><h3>Create a New User</h3></div>
          <div id="contact">
          <fieldset>
            <input placeholder="Email" type="text" tabindex="1" required autofocus id="email-val"/>
          </fieldset>
          <fieldset>
            <input placeholder="Name" type="text" tabindex="2" required id="name-val"/>
          </fieldset>
          <fieldset>
            <input placeholder="Phone Number" type="tel" tabindex="3"  id="phone-val"/>
          </fieldset>
           
          <div clasName="imageUploaderMenu" style={{display:'inline',textAlign:'justify',margin:'10px'}} >
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
            <label>Select Your Profile Image</label> <br/><br/>
            <button
            className="imageBtn"
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Select Image
            </button>
            &nbsp;
            {/* <button className="imageBtn" onClick={onImageRemoveAll}>Remove </button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="200" />
                <div className="image-item__btn-wrapper">
                  <button className="imageBtn" onClick={() => onImageUpdate(index)}>Update</button>
                  <button className="imageBtn" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
          
          <fieldset>
            <input placeholder="College" type="text" tabindex="4"  id="college-val"/>
          </fieldset>
          <fieldset> 
          <input placeholder="Year" type="text" tabindex="4"  id="year-val"/>
          </fieldset>
          <fieldset>
          <input placeholder="Branch" type="text" tabindex="4"  id="branch-val"/>
          </fieldset>
          <fieldset>
          <input placeholder="Password" type="password" tabindex="4" required id="pass-val"/>
          </fieldset>
          <fieldset>
            <button name="submit" type="submit" id="contact-submit">Submit</button>
            <button id="contact-cancel" onClick={handlecancelclick}>Cancel</button>
          </fieldset>
          </div>
        </form>
       
      </div>
    )
}

export default Createuser