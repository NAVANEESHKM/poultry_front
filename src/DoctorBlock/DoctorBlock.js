import React, { useState } from "react";
import "./DoctorBlock.css";
import aa from "./Images/aa.png";
import address from "./Images/address.png";
import batch from "./Images/batch.png";
import calander from "./Images/calander.png";

export function DoctorBlock(props){
    
    let name=props.argu[1];
    let [namer,setnamer]=useState(name);
    function helper(val){
        
        if(val==1) setnamer(props.argu[1]);
           if(val==2) setnamer(props.argu[2]);
           if(val==3) setnamer(props.argu[3]);
           if(val==4) setnamer(props.argu[4]);
           if(val==5) setnamer(props.argu[5]);
    }
    return(
        
        <div className="Doctorouter">
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@500&display=swap" rel="stylesheet"/>
             <div className="Doctorhead">
                     <img className="doctor_img" src={props.argu[0]} alt="image _doctor"/>
                     <p className="doctorcont">{namer}</p>
             </div>
             <div onMouseLeave={()=>helper(1) }className="menuupper">
                  <img onMouseOver={()=>helper(2)} className="doctormenu" src={aa}/>
                  <img onMouseOver={()=>helper(3)} className="doctormenu" src={address}/>
                  <img onMouseOver={()=>helper(4)} className="doctormenu" src={batch}/>
                  <img onMouseOver={()=>helper(5)} className="doctormenu" src={calander}/>
             </div>
        </div>
        
    )
}