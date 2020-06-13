import React from "react";
import "./Home.css";
//new import
import cloudImg from "../cloud.svg";

export default function Home() {
  return (
    <div className="Home">
      
      <div className="lander">
      
      <div className="image" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
	  	<img src={cloudImg} alt="login" height="10%" width="10%" alignItems="center"/>
	    </div>
        <h1>TagStore</h1>
        <p>A Modern Image Storage on the Cloud</p>
      </div>
      
    </div>
  );
}

//lines added  11 - 13
//<div className="image" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
	  	//<img src={cloudImg} alt="login" height="10%" width="10%" alignItems="center"/>
	    //</div>