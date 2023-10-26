import React from "react";
import { useState,useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Hatching.css";
export var arrayexport=[]
export function Hatching(){
  const[batch,setbatch]=useState("")
  const[date,setdate]=useState("")
  const[egg,setegg]=useState("")
  const[meet,setmeet]=useState("")
  const[chick,setchick]=useState("")
  const[findhatch,edithatch]=useState("")
  const [data1, setData] = useState([]);
  var storedValue = localStorage.getItem("mail");
  const gethatch={
    mailid:storedValue
  }
  function editor(row){
    edithatch(row.batch_id)
            setbatch(row.batch_id)
            setdate(row.date)
            setegg(row.egg)
            setmeet(row.meet)
            setchick(row.chick)
            console.log(findhatch)
  }
  function deletehelper(row){
            setbatch(row.batch_id)
            setdate(row.date)
            setegg(row.egg)
            setmeet(row.meet)
            setchick(row.chick)
            console.log("console side sending value",batch,date,egg,meet,chick)
            
  }
    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
          console.log("well it is called here")
          try {
            const response = await fetch('http://localhost:4000/api/profile/get/hatching',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(gethatch),
            }); // Replace with your API endpoint
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
           
            const newArrayData = jsonData.array;
           console.log(newArrayData)
            // Append the fetched data to the existing data array
            setData([...newArrayData]);
            console.log("Final array",data1)
          } catch (error) {
            console.error('Error:', error);
          }
        };
        console.log("fetch before")
        fetchData(); // Call the fetchData function
        arrayexport=[...data1]
      }, []);
      
     
      
      
    const handlehatchedit=async (val) => {
     
      const post1={batch_id:parseInt(batch),
        date:date, 
        egg:parseInt(egg), 
        meet:parseInt(meet),
        chick:parseInt(chick),
        mailfind:storedValue 
      }
      console.log(post1)

      try {
        const response = await fetch('http://localhost:4000/api/profile/hatch/edit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post1),
        });
        if (response.ok) {
          console.log('Post created successfully');
          window.location.reload()
        } else {
          console.log('Failed to create post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
   const hatchdelete1=async(row)=>{
     console.log("Row values ",row)
            
    const delhatch={
         batch_id:parseInt(row.batch_id),
        date:row.date, 
        egg:parseInt(row.egg), 
        meet:parseInt(row.meet),
        chick:parseInt(row.chick),
        mailfind:storedValue 

    }
    console.log("The values are stored here for sending",delhatch)
    try {
      const response = await fetch('http://localhost:4000/api/profile/delete/hatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(delhatch),
      });
  
      if (response.ok) {
        console.log('Deleted successfully');
        window.location.reload()
      } else {
        console.log('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
   };
    return(
        <div className="Hatchmain">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https:  //fonts.googleapis.com/css2?family=Dosis:wght@500&family=Libre+Baskerville:ital@1&display=swap" rel="stylesheet"></link>
             <div className="Hatchmenu">
                  <p className="Hatchtitle">Hatching Details</p>
                 
                  <Link to="/front/hatch_form" className="Hatchadder">+Add Hatching Details</Link>
             </div>
             <table>
                <tr>
                    <th>BATCH ID</th>
                    <th>DATE</th>
                    <th>EGGS</th>
                    <th>MEET SALES</th>
                    <th>CHICKS HATCH</th>
                    <th>Actions</th>

                </tr>
                
                {data1.map((row) => (
                  row.batch_id==findhatch?
                  <tr>
                  <td>{row.batch_id}</td>
                  <td>{row.date}</td>
                  <td><input type="text" value={egg}
                   className="input_form1"
                    onChange={(e)=>setegg(e.target.value)}></input></td>
                  <td><input type="text" value={meet}
                   className="input_form1"
                    onChange={(e)=>setmeet(e.target.value)}></input></td>
                  <td><input type="text" value={chick}
                   className="input_form1"
                    onChange={(e)=>setchick(e.target.value)}></input></td>
                  <td><button className="update" onClick={()=>handlehatchedit(row.batch_id)}>Update</button></td>
                  </tr>
                  :
            <tr>
              <td>{row.batch_id}</td>
              <td>{row.date}</td>
              <td>{row.egg}</td>
              <td>{row.meet}</td>
              <td>{row.chick}</td>
              <td><button className="update" onClick={()=>editor(row)}>Edit</button><button className="delete" onClick={()=>{deletehelper(row); hatchdelete1(row)} }>Delete</button></td>
            </tr>
          ))}
             </table>
        </div>
    )
}