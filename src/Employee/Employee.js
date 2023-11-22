import React from "react";
import { useState,useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import {Employee_form} from "../Employee_form/Employee_form.js"
import "./Employee.css";

export function Employee(){
  const [count, setCount] = useState(0);

  const [deleteId,setDelete]=useState("")
  const[editId,setEditID]=useState(-1)
  const [data, setData] = useState([]);
  const mailidlocal = localStorage.getItem("mail");
  const empget={
    mailid:mailidlocal
  }
  function handleEdit(row){
    setEditID(row.id)
    setid1(row.id)
    setfn1(row.firstname)
    setls1(row.lastname)
    setgen1(row.gender)
    setage1(row.age)
    setdep1(row.department)
    setpn1(row.phone)
    setsal1(row.salary)
    // window.location.reload();
  
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/profile/get',{
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empget),
        });
        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const newArrayData = jsonData.array;
        console.log(newArrayData);
  
        // Update the data state with the new array data
        if(newArrayData.length == 0)setData([])
        else
        setData([...newArrayData]);
        console.log("Final array", data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    console.log("fetch before");
    fetchData(); // Call the fetchData function
  }, [count]);
  
  var[id1,setid1]=useState("")  
  var[Fn1,setfn1]=useState("")
  var[Ls1,setls1]=useState("")
  var[Gen1,setgen1]=useState("")
  var[Ag1,setage1]=useState("")
  var[Dep1,setdep1]=useState("")
  var[Pn1,setpn1]=useState("")
  var[Sal1,setsal1]=useState("")
  const post = {
   id: parseInt(id1), // Convert to integer if necessary
   firstname: Fn1,
   lastname: Ls1,
   gender: Gen1,
   age: parseInt(Ag1), // Convert to integer if necessary
   department: Dep1,
   phone:parseInt(Pn1),
   salary: parseInt(Sal1), 
   mailfind:mailidlocal
 };

  const handleSubmit1 = async (event) => {
   

   try {
     const response = await fetch('http://localhost:4000/api/profile/create/edit', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(post),
     });

     if (response.ok) {
      setCount(()=>count+2);
      setEditID(-1)
       console.log('Post created successfully');
     } else {
       console.log('Failed to create post');
     }
   } catch (error) {
     console.error('Error:', error);
   }
 };

 const handleDelete=async (val) => {
  const empdel={
    id:parseInt(val),
    mailid:mailidlocal
}
   console.log(deleteId)
  try {
    const response = await fetch('http://localhost:4000/api/profile/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empdel),
    });

    if (response.ok) {
      setCount(()=>count+2);
       console.log('Deleted successfully');
    } else {
      console.log('Failed to create post');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  return(
      
        <div className="employouter">
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@500&family=Libre+Baskerville:ital@1&display=swap" rel="stylesheet"/>
            <div className="employmenu">
                <p className="employtit">Employee Details</p>
                <Link to="/front/emp_form" className="employadd">+Add Employee</Link>
            </div>
        <table className="employtable">
          <thead>
        <tr>
          <th>ID</th>
          <th>FIRST NAME</th>
          <th>LASTNAME</th>
          <th>GENDER</th>
          <th>AGE</th>
          <th>DEPARTMENT</th>
          <th>PHONE NUMBER</th>
          <th>SALARY</th>
          <th>Actions</th>
          
        </tr>
        </thead>
        
          {
          
          data?.map((row) => (
        
            row.id===editId ?
           
            <tr>
                   <td>{row.id}</td> 
                 
            <td><input type="text" value={Fn1}
                   className="input_form1"
                    onChange={(e)=>setfn1(e.target.value)}></input></td>  
          
           <td> <input type="text" value={Ls1}
                    className="input_form1"
                    onChange={(e)=>setls1(e.target.value)}></input></td>
          
           <td> <input type="text" value={Gen1}
                    className="input_form1"
                    onChange={(e)=>setgen1(e.target.value)}></input></td>
          
            <td><input type="text"
            className="input_form1"
            value={Ag1}
            onChange={(e)=>setage1(e.target.value)}></input></td>
            
           <td> <input type="text" value={Dep1}
            className="input_form1"
                    onChange={(e)=>setdep1(e.target.value)}></input></td>
           
           <td> <input type="text" value={Pn1}
            className="input_form1"
                    onChange={(e)=>setpn1(e.target.value)}></input></td>
           
            <td><input type="text" value={Sal1}
            className="input_form1"
                    onChange={(e)=>setsal1(e.target.value)}></input></td>
                   <td><button className="update" onClick={()=>handleSubmit1()}>Update</button></td>
            </tr>
            :
            <tr>
              <td>{row.id}</td>
              <td>{row.firstname}</td>
              <td>{row.lastname}</td>
              <td>{row.gender}</td>
              <td>{row.age}</td>
              <td>{row.department}</td>
              <td>{row.phone}</td>
              <td>{row.salary}</td>
              <td><button onClick={() => handleEdit(row)} className="update">Edit</button><button  onClick={()=>{  handleDelete(row.id)}} className="delete">Delete</button></td>
            </tr>
          ))}
        
        
       </table>
        </div>
    )
}