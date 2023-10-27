import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import img1 from "./images/suu.jpeg"
import "./Front.css"
function Front(){
    const { number } = useParams();
    var[EmailLatest,setEmailLatest]=useState("")
    var[PasswordLatest,setPasswordLatest]=useState("")
    const handleGetRequest = async () => {
        try {
          const response = await fetch("https://poultry-back.vercel.app/api/customer/latest", {
            method: "GET", 
            headers: {},
          });
      
          if (response.ok) {
            const responseData = await response.json();
            setEmailLatest(responseData.mail);
            setPasswordLatest(responseData.password);
            
          } else {
            console.error("Failed to fetch data");
           
          }
        } catch (error) {
          console.error("Error:", error);
       
        }
      };
      useEffect(() => {
        // Call handleGetRequest when the component mounts
        handleGetRequest();
    }, []);
      
    return(
        <div className="front-page">
          <img className="image-front" src={img1}/>
            <p>Successfully Login as {EmailLatest}</p>
           
        </div>
    )
}
export default Front;