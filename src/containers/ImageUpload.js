import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./ImageUpload.css";
//new import
import ImgUpload from "../img.svg";
export default function ImageUpload() {
  const file = useRef(null);
  const history = useHistory();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  function validateForm() {
    return file.length > 0;
  }

  async function handleSubmit(event) {
  event.preventDefault();

  if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
    alert(
      `Please pick a file smaller than ${
        config.MAX_ATTACHMENT_SIZE / 1000000
      } MB.`
    );
    return;
  }


  setIsLoading(true);

  try {
    const attachment = file.current ? await s3Upload(file.current) : null;
    history.push("/search");
  } catch (e) {
    onError(e);
    setIsLoading(false);
  }
}


  return (
    <div className="ImageUpload">
      <form onSubmit={handleSubmit}>
      <div className="image" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
	  	<img src={ImgUpload} alt="login" height="50%" width="50%" alignItems="center"/> 
	    </div>
        <FormGroup controlId="file">

          <ControlLabel>Image</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" alignItems="center"/>
        </FormGroup>
        
        <LoaderButton
        
          alignItems="center"
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          //if button disabled comment code below
		  //disabled={!validateForm()}
        width="30%">
          Upload
        </LoaderButton>
      </form>
    </div>
  );
}
//lines adde 53-55
//<div className="image" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
	  //	<img src={search} alt="login" height="20%" width="20%" alignItems="center"/> 
	  //  </div>