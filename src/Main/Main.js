import React, { useEffect,useState } from "react";
import "./Main.css"
import { Outlet, Link } from "react-router-dom";

import {useNavigate} from "react-router-dom"
import profile from "./Images/main_image.jpg";
export function Main() {
     const navigate = useNavigate();

     const mailidlocal = localStorage.getItem("mail");
     const [isPopupOpen, setIsPopupOpen] = useState(false);

     const openPopup = () => {
       setIsPopupOpen(true);
     };
   
     const closePopup = () => {
       setIsPopupOpen(false);
     };
     useEffect(() => {
          let sp1 = document.getElementsByClassName("con1");
          for (let spp of sp1) {
               spp.style.background = "skyblue";
          }
     }, []);
     function setternum(val){
          localStorage.setItem("value",val)
          
     }
     function help() {
         let val=localStorage.getItem("value")
          console.log("Local value",val)
          if (val == 0) {
               let sp2 = document.getElementsByClassName("con1");
               for (let spp of sp2) {
                    spp.style.background = "skyblue";
               }
          }
          else {
               let sp = document.getElementsByClassName("con1");
               for (let spp of sp) {
                    spp.style.background = "none";
               }
          }
          if (val == 1) {
               let sp = document.getElementsByClassName("con2");
               for (let spp of sp) {
                    spp.style.background = "skyblue";
               }
          }
          else {
               let sp = document.getElementsByClassName("con2");
               for (let spp of sp) {
                    spp.style.background = "none";
               }
          }
          if (val == 2) {
               let sp = document.getElementsByClassName("con3");
               for (let spp of sp) {
                    spp.style.background = "skyblue";
               }
          }
          else {
               let sp = document.getElementsByClassName("con3");
               for (let spp of sp) {
                    spp.style.background = "none";
               }
          }
          if (val == 3) {
               let sp = document.getElementsByClassName("con4");
               for (let spp of sp) {
                    spp.style.background = "skyblue";
               }
          }
          else {
               let sp = document.getElementsByClassName("con4");
               for (let spp of sp) {
                    spp.style.background = "none";
               }
          }
          if (val == 4) {
               let sp = document.getElementsByClassName("con5");
               for (let spp of sp) {
                    spp.style.background = "skyblue";
               }
          }
          else {
               let sp = document.getElementsByClassName("con5");
               for (let spp of sp) {
                    spp.style.background = "none";
               }
          }
          if (val == 5) {
               let sp = document.getElementsByClassName("con6");
               for (let spp of sp) {
                    spp.style.background = "skyblue";
               }
          }
          else {
               let sp = document.getElementsByClassName("con6");
               for (let spp of sp) {
                    spp.style.background = "none";
               }
          }
     }
     function loginpage(){
          localStorage.removeItem("mail");
          localStorage.removeItem("password");

          navigate('/login', { replace: true }); // Replace '/new-page' with the URL of the page you want to navigate to
     }
     return (
          <>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@500&family=Exo+2:ital@1&family=Josefin+Sans&family=Libre+Baskerville:ital@1&family=Mukta&display=swap" rel="stylesheet"></link>
          <div className="decider">
               <div className="leftblock">
                    <img className="prof" src={profile} alt="prof     ile_image" />
                    <div  className="detailstop">
                    <p className="prof1">{mailidlocal}</p>
                    <button onClick={loginpage}>Logout</button>
                    {/* <p onClick={openPopup}>Try Preminum</p> */}
                    {/* {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Premium Pack</h2>  
            <div className="popinner">
            <input type="radio"></input>
            <label >INR 1500/1 Month</label><br></br>
            </div>
            <div className="popinner">
            <input type="radio"></input>
            <label >INR 6000/6 Month</label><br></br>
            </div>
            <div className="popinner">
            <input type="radio"></input>
            <label >INR 1000/1 Year</label><br></br>
            </div>
            <button className="paypop" onClick={closePopup}>Pay</button>
          </div>
        </div>
      )} */}
                    </div>
                    <div className="innerinfo">

                         <Link onClick={() =>{setternum(0); help()}} to="/front"><p className="con1">DashBoard</p></Link>
                         <Link onClick={() =>{setternum(1); help()}} to="/front/employee"> <p className="con2">Employee Details</p></Link>
                         <Link onClick={() =>{setternum(2); help()}} to="/front/hatching"><p className="con3">Production Details</p></Link>
                         <Link onClick={() =>{setternum(3); help()}} to="/front/order"><p className="con4">Order Details</p></Link>
                         <Link onClick={() =>{setternum(4); help()}} to="/front/doctor"><p className="con5">Doctor Details</p></Link>

                    </div>


               </div>
               <Outlet />     
          </div>
          </>
     )
}
