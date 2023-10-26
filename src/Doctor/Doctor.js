import React from "react";
import { DoctorBlock } from "../DoctorBlock/DoctorBlock";
import prof1 from "./Images/poul_prof1.jpeg";
import prof2 from "./Images/poul_prof2.jpg";
import "./Doctor.css"
//This is a doctor file
var arr1=[prof1,"My name is Mery","My MailId mery@gmail.com","I am from Los Angles","I am Handling 3 Batches","My Birthdate 04/12/1995"];
var arr2=[prof2,"My name is John","My MailId john@gmail.com","I am from New York","I am Handling 4 BAtches","My Birthday 12/10/1990"];
export function Doctor(){
    return(
        <div className="Doctormain">

            <DoctorBlock argu={arr1}/>
            <DoctorBlock argu={arr2}/>
           
        </div>
    )
}