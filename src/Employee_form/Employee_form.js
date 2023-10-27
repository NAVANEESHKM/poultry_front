import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./Employee_form.css"

export function Employee_form(){
  const navigate = useNavigate();
   var[id,setid]=useState("")
   var[Fn,setfn]=useState("")
   var[Ls,setls]=useState("")
   var[Gen,setgen]=useState("")
   var[Ag,setage]=useState("")
   var[Dep,setdep]=useState("")
   var[Pn,setpn]=useState("")
   var[Sal,setsal]=useState("")
   var storedValue = localStorage.getItem("mail");

   const post = {
    id: parseInt(id), // Convert to integer if necessary
    firstname: Fn,
    lastname: Ls,
    gender: Gen,
    age: parseInt(Ag), // Convert to integer if necessary
    department: Dep,
    phone:parseInt(Pn),
    salary: parseInt(Sal), // Convert to integer if necessary
    mailfind:storedValue
  };

   const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://poultry-back.vercel.app/api/profile/create', {
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
            <label>Id</label>
            <input type="text"
            className="input_form"
                    value={id}
                    onChange={(e)=>setid(e.target.value)}
            ></input>
            <label>FirstName</label>
            <input type="text" value={Fn}
                   className="input_form"
                    onChange={(e)=>setfn(e.target.value)}></input>
            <label>LastName</label>
            <input type="text" value={Ls}
                    className="input_form"
                    onChange={(e)=>setls(e.target.value)}></input>
            <label>Gender</label>
            <input type="text" value={Gen}
                    className="input_form"
                    onChange={(e)=>setgen(e.target.value)}></input>
            <label>Age</label>
            <input type="text"
            className="input_form"
            value={Ag}
            onChange={(e)=>setage(e.target.value)}></input>
            <label>Department</label>
            <input type="text" value={Dep}
            className="input_form"
                    onChange={(e)=>setdep(e.target.value)}></input>
            <label>PhoneNumber</label>
            <input type="text" value={Pn}
            className="input_form"
                    onChange={(e)=>setpn(e.target.value)}></input>
            <label>Salary</label>
            <input type="text" value={Sal}
            className="input_form"
                    onChange={(e)=>setsal(e.target.value)}></input>
           <button className="submit" onClick={(e)=>{handleSubmit(e); navigate("/front/employee")}} >click</button>
        </form>
        </div>
        </div>
    )
}