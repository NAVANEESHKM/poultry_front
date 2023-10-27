import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./Hatching_form.css"

export function Hatching_form(){
  const navigate = useNavigate();
  const[batch,setbatch]=useState("")
      const[date,setdate]=useState("")
      const[egg,setegg]=useState("")
      const[meet,setmeet]=useState("")
      const[chick,setchick]=useState("")
      var storedValue = localStorage.getItem("mail");
  
   const post = {
    batch_id:parseInt(batch),
        date:date, 
        egg:parseInt(egg), 
        meet:parseInt(meet),
        chick:parseInt(chick),
        mailfind:storedValue
  };

   const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://poultry-back.vercel.app/api/profile/create/hatching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      if (jsonData.message==="greater"){
               console.log("value is greater navaneesh navaneesh")
                 alert("Try Preminum to add more")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    return(
      <div className="extra_outer">
                <div className="form_style">

        <form className="outer_form">
            <label>Batch ID</label>
            <input type="text"
            className="input_form"
                    value={batch}
                    onChange={(e)=>setbatch(e.target.value)}
            ></input>
            <label>Date</label>
            <input type="date" value={date}
                   className="input_form"
                    onChange={(e)=>setdate(e.target.value)}></input>
            <label>EGG</label>
            <input type="text" value={egg}
                    className="input_form"
                    onChange={(e)=>setegg(e.target.value)}></input>
            <label>MEET</label>
            <input type="text" value={meet}
                    className="input_form"
                    onChange={(e)=>setmeet(e.target.value)}></input>
             <label>CHICK</label>
              <input type="text" value={chick}
                    className="input_form"
                    onChange={(e)=>setchick(e.target.value)}></input>
           <button className="submit" onClick={(e)=>{handleSubmit(e); navigate("/front/hatching")}} >click</button>
        </form>
        </div>
        </div>
    )
}