import React, { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import "./OrderDetails.css";
export function OrderDetails(){
  const navigate = useNavigate();

  const [count,setcount]=useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }
    const [Order,setorder]=useState([])
    const [add,setadd]=useState(0)
    const[form,setform]=useState("")
    const[date,setdate1]=useState("")

    const [name1,setname]=useState("")
    const[phone1,setphone]=useState("")
    const[egg1,setegg]=useState("")
    const[address1,setaddress]=useState("")
    var storedValue = localStorage.getItem("mail");
    function plus(){
             setadd(1)

                
              }
    function formorder(data){
         setform(data)
         
    }
    useEffect(()=>{
      const fetchDataOrder = async () => {
          console.log("well it is called here")
          try {
            const response = await fetch('http://localhost:4000/api/order/get',{
              method: 'POST',
              headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(getorders),
            }); // Replace with your API endpoint
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
           
            const newArrayData = jsonData.array;
           console.log(newArrayData)
            // Append the fetched data to the existing data array
            setorder([...newArrayData]);
           
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchDataOrder()
        console.log("Finish array",Order)
      },[count])
      
    const ordercreate=async(e)=>{
      e.preventDefault();
      const values={
            name:name1,
            date:date,
            phone:parseInt(phone1),
            egg:parseInt(egg1),
            address:address1,
            mailfind:storedValue
        }

        try {
            const response = await fetch('http://localhost:4000/api/order/post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
       
            const jsonData = await response.json();

            if (!response.ok) {

              setcount(()=>count+1);
             setadd(0);
             setIsVisible(true);

              throw new Error('Network response was not ok');
            }
            
            
          } catch (error) {
            console.error('Error:', error);
          }
    }
    const getorders={
      mailid:storedValue
    }
  

  

   const orderUpdate=async(e)=>{
    e.preventDefault();
       const values={
           name:name1,
           date:date,
           phone:parseInt(phone1),
           egg:parseInt(egg1),
           address:address1,
           mailfind:storedValue 
       }
       try {
           const response = await fetch('http://localhost:4000/api/order/update', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(values),
           });
      
           if (response.ok) {
            setcount(()=>count+1);

             console.log('Post created successfully');
           } else {
             console.log('Failed to create post');
           }
         } catch (error) {
           console.error('Error:', error);
         }
   }
   const orderdelete=async(val)=>{
    try {
      const response = await fetch('http://localhost:4000/api/order/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone:parseInt(val),mailid:storedValue}),
      });
  
      if (response.ok) {
        setcount(()=>count+1);
        console.log('Deleted successfully');
      } else {
        console.log('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
   };
    return(
      
        <div className="outerorder">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@500&family=Exo+2:ital@1&family=Josefin+Sans:wght@600&family=Libre+Baskerville:ital@1&family=Mukta&display=swap" rel="stylesheet"/>

             <h1>Order Details</h1>
            {  Order.map(data=>(

            <>
             {  form==data.name?
               <>
               <div className="extra_outer"> 
                  <div className="form_style">
                    <form className="outer_form">
                    <p> Name </p>
                    <input className="input_form" type="text" value={name1} onChange={(e)=>setname(e.target.value)}/>
                    <p>Date</p>
                    <input type="date" value={date}
                   className="input_form"
                    onChange={(e)=>setdate1(e.target.value)}></input>                    <p>Phone Number</p>
                    <input className="input_form" type="text" value={phone1} onChange={(e)=>setphone(e.target.value)}/>
                    <p>Number of Eggs</p>
                    <input  className="input_form" type="text" value={egg1} onChange={(e)=>setegg(e.target.value)}/>
                    <p>Address</p>
                    <input className="input_form" type="text" value={address1} onChange={(e)=>setaddress(e.target.value)}/>
                    <button className="submit1" onClick={(e)=>orderUpdate(e)}>Update</button>
                    </form>
                    </div>
                </div>
               </>
               :
                <div className="order"> 
                  <div className="innerorder">
                    <p className="dataform">Name</p>
                    <p >{data.name}</p>
                    <p className="dataform">Date</p>
                    <p>{data.date}</p>
                    <p className="dataform">Phone Number</p>
                    <p >{data.phone}</p>
                    <p className="dataform">Number of Eggs</p>
                    <p >{data.egg}</p>
                    <p className="dataform">Address</p>
                    <p >{data.address}</p>
                    <button className="orderedit"onClick={()=>{
                                 formorder(data.name)
                                 setaddress(data.address)
                                 setname(data.name)
                                 setphone(data.phone)
                                 setegg(data.egg)

                                 }}>Edit</button>
                                 <button  className="orderdelete" onClick={()=>orderdelete(data.phone)}>Delete</button>
                    </div>
                </div>
}
            </>
                ))}
                {
                     add==1?
                     <div className="extra_outer">
                        <div className="form_style">
                        <form className="outer_form">
                     <p>Name</p>
                     <input className="input_form" type="text" value={name1} onChange={(e)=>setname(e.target.value)}/>
                     <p>Date</p>
                    <input type="date" value={date}
                   className="input_form"
                    onChange={(e)=>setdate1(e.target.value)}></input>  
                     <p>Phone Number</p>
                     <input className="input_form" type="text" value={phone1} onChange={(e)=>setphone(e.target.value)}/>
                     <p>Number of Eggs</p>
                     <input className="input_form" type="text" value={egg1} onChange={(e)=>setegg(e.target.value)}/>
                     <p>Address</p> 
                     <input className="input_form" type="text"  value={address1} onChange={(e)=>setaddress(e.target.value)}/>
                     <br/>  
                     <button className="submit1" onClick={(e)=>{ordercreate(e); }}>Add Order</button>
                     </form>
                     </div>
                    </div>
                     :
                     <></>
                }
               {isVisible &&  <div className="orderouter">
                       <button className="orderadder" onClick={()=>{plus(); toggleVisibility()}}>+</button>
               </div>}
        </div>
    )
}