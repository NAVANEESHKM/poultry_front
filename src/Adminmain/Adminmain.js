import React, { useState, useEffect } from "react";
import "./Adminmain.css";
import { Link, useNavigate } from 'react-router-dom';

export function Adminmain() {
  const [Admin, setAdmin] = useState([]);
  const[Adup,setAdup]=useState([])
  const maxCount = 5; 
  const [emp,setemp]=useState("")
  const [prod,setprod]=useState("")
  const[ord,setord]=useState("")
  const[doc,setdoc]=useState("")
  const mailidlocal = localStorage.getItem("mail");
  const passwordlocal = localStorage.getItem("password");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/userinfo');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Update the data state with the new array data, limiting counts
        const newData = jsonData.array.map(data => ({
          ...data,
          poultry_count: Math.min(data.poultry_count, maxCount),
          hatching_count: Math.min(data.hatching_count, maxCount),
          order_count: Math.min(data.order_count, maxCount),
        }));

        setAdmin(newData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    console.log("fetch before");
    fetchData(); // Call the fetchData function
  }, []);
  const updatedata={
    mailid:mailidlocal,
    password:passwordlocal,
    employee_count:parseInt(emp),
    production_count:parseInt(prod),
    order_count:parseInt(ord),
    doctor_count:parseInt(doc)
  }
  const AdminUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/admin/value/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedata),
      });

      if (response.ok) {
        console.log('Post created successfully');
      } else {
        console.log('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const adm={
    mailid:mailidlocal,
    password:passwordlocal
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/value/get',{
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adm),
        });
        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const newArrayData = jsonData.array;
        console.log("here i",newArrayData);

       setemp(newArrayData.employee_count)
       setprod(newArrayData.production_count)
       setord(newArrayData.order_count)
       setdoc(newArrayData.doctor_count)
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    console.log("fetch before");
    fetchData(); // Call the fetchData function
  }, []);
const DeleteUser=async(data)=>{
       const user={
            mailid:data.mailid,
            password:data.password
       }

    try {
        const response = await fetch('http://localhost:4000/api/delete/user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user), // You can include any data to send in the request body
        });
      
        if (response.ok) {
          console.log('Delete request successful');
        } else {
          console.log('Failed to delete data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }
  return (
    <div className="container">
      <div className="header">Admin Page</div>

      <div className="data-input">
        <div>
          <p>Employee Count</p>
          <input type="number" value={emp} onChange={(e)=>setemp(e.target.value)} min="1" max="50"/>
        </div>
        <div>
          <p>Production Count</p>
          <input type="number" value={prod} onChange={(e)=>setprod(e.target.value)}  min="1" max="50" />
        </div>
        <div>
          <p>Order Count</p>
          <input type="number" value={ord} onChange={(e)=>setord(e.target.value)}  min="1" max="50" />
        </div>
        <div>
          <p>Doctor Count</p>
          <input type="number" value={doc} onChange={(e)=>setdoc(e.target.value)}  min="1" max="50" />
        </div>
      </div>
      <button className="updateadmin1" onClick={(e)=>AdminUpdate(e)}>Update</button>

      {Admin.map((data, index) => (
        <div className="admin-info" key={index}>
          <p><strong>Email:</strong> {data.mailid}</p>
          <p><strong>Password:</strong> {data.password}</p>
          <p><strong>Poultry Count:</strong> {data.poultry_count}</p>
          <p><strong>Hatching Count:</strong> {data.hatching_count}</p>
          <p><strong>Order Count:</strong> {data.order_count}</p>
          <button className="updateadmin" onClick={()=>DeleteUser(data)}>Remove user</button>
        </div>
      ))}

    </div>
  );
}
