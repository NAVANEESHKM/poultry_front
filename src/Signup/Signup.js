import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import  "./Signup.css"

 function Signup(){
  const navigate = useNavigate();
  let[Signup,setsignup]=useState("")
    let[Password,setpassword]=useState("")
    let [responseMessage, setResponseMessage] = useState("");
    let[passwordmanger,setPasswordMessage]=useState("")
    let[exister,setexister]=useState("")
    // const [Image, setImage] = useState(null);


     const handlesubmit1 = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://poultry-backends.onrender.com/api/customer/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({Signup,Password}),
      });

      if (response.ok) {
        const responseData = await response.json();
        setexister(responseData.exist)
        if (responseData.message) {
          setResponseMessage(responseData.message);
        }
        if (responseData.password) {
          setPasswordMessage(responseData.password);
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
  // const formData = new FormData();
    // formData.append('mailid', Signup);
    // formData.append('password', Password);
    // formData.append('image',Image)
    const logininfo={
      mailid:Signup,
      password:Password
     }
    const handlesubmit2 = async (event) => {
    event.preventDefault();
    

    try {
      const response = await fetch("https://poultry-backends.onrender.com/api/customer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(logininfo),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.message) {
          setResponseMessage(responseData.message);
          console.log(responseData.message)
        }
        if (responseData.password) {
          setPasswordMessage(responseData.password);
          console.log(responseData.password)
        }

      } else {
        console.error("Failed to post data");
        // Handle error scenarios here
      }
      navigate("/blogs")

   } catch (error) {
      console.error("Error:", error);
      // Handle network error here
    }
  };
    const handlesubmit3 = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://poultry-backends.onrender.com/api/customer/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({Signup,Password}),
      });

      if (response.ok) {
        console.log("Data posted successfully");
        // You can perform additional actions here on success
      } else {
        console.error("Failed to post data");
        // Handle error scenarios here
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network error here
    }
  };
  // const handleImageChange = (event) => {
  //     const file = event.target.files[0];
  //   setImage(file);
  // };
    return(
      <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@500&family=Exo+2:ital@1&family=Libre+Baskerville:ital@1&display=swap" rel="stylesheet"></link>
        <div id="outer">
            <div id="inner">
              <div className="react-head">
              <h1 className="heading">SIGNUP</h1>
              </div>
            <label id="labelmail" for="mailid">MailID</label><br/>
            <div className="pairer">
            <input  id="mailid" 
            value={Signup}
            type="text"
            onChange={(e)=>setsignup(e.target.value)}
            />
            <p className="indicator">{responseMessage}</p>
            </div>
            <label id="labelpass" for="password">Password</label><br/>
           <div className="pairer">
            <input id="password" 
             value={Password}
             type="password"
             onChange={(e)=>setpassword(e.target.value)}
            />
             <p className="indicator">{passwordmanger}</p>
             </div>
             {/* <label id="labelmail" for="mailid">Upload Image</label><br/>
            <div className="pairer">
            <input type="file" accept="image/*" onChange={handleImageChange} /> */}

            {/* </div> */}
        <button className="signup" onClick={(e)=>handlesubmit2(e)} type="submit">Signup</button><br/>

        <div className="down-react">
        <p className="info">Already having an account <Link className="login-link" to="/login">Login</Link></p>
        <Link className="login-link" to="/admin_login">Admin Page</Link>
        </div>
        <h1>{exister}</h1>
       
        </div>
        </div>
        </>
    );
}
export default Signup