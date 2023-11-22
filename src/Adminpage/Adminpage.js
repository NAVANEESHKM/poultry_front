import React, { useState } from "react";
import  "./Adminpage.css"

import { Link, useNavigate } from 'react-router-dom';

 export function Adminpage(){
    const navigate = useNavigate();
    let[Adminid,setadminid]=useState("")
    let[Password,setpassword]=useState("")
    let [responseMessage, setResponseMessage] = useState("");
    let[passwordmanger,setPasswordMessage]=useState("")
    let[number,setnumber]=useState("")
     const logininfo={
      signup:Adminid,
      password:Password
     }
     const handlesubmit1 = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://poultry-backends.onrender.com/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logininfo),
      });

      if (response.ok) {
       
        const responseData = await response.json();
          setResponseMessage(responseData.message);
          setPasswordMessage(responseData.password);
          
         
          if(responseData.number==="equal"){
            localStorage.setItem("mail",responseData.message);
            localStorage.setItem("password",responseData.password);
            setnumber(responseData.number)
            

            navigate('/adminpage')
          }
          
      } else {
        console.error("Failed to post data");
        // Handle error scenarios here
      }
    
    } catch (error) {
      console.error("Error:", error);
      // Handle network error here
    }
    
  };
   
  
    return(
      <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@500&family=Exo+2:ital@1&family=Libre+Baskerville:ital@1&display=swap" rel="stylesheet"></link>
        <div id="outer">
            <div id="inner">
              <div className="react-head">
              <h1 className="heading">ADMIN PAGE</h1>
              </div>
            <label id="labelmail" for="mailid">ADMIN ID</label><br/>
            <div className="pairer">
            <input  id="mailid" 
            value={Adminid}
            type="text"
            onChange={(e)=>setadminid(e.target.value)}
            />
            <p className="indicator">{responseMessage}</p>
            </div>
            <label id="labelpass" for="password">ADMIN PASSWORD</label><br/>
           <div className="pairer">
            <input id="password" 
             value={Password}
             type="password"
             onChange={(e)=>setpassword(e.target.value)}
            />
             <p className="indicator">{passwordmanger}</p>
             </div>
        <button className="signup" onClick={(e)=>handlesubmit1(e)} type="submit">Login</button><br/>
        </div>
        </div>
        </>
    );
}
