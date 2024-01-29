import React from "react";
import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from 'react-chartjs-2';

import Chart from 'chart.js/auto';
import "./Home.css";
import eggicon from "./Images/eggicon.png";
import employersicon from "./Images/employersicon.png";
import ordersicon from "./Images/ordersicon.png";
import salescon from "./Images/salescon.png"


export function Home() {
  let order_details
let production_details
let employee_details
  var eggcount = 0
  const mailidlocal = localStorage.getItem("mail");

  const empget = {
    mailid: mailidlocal
  }
  const [order, setOrder] = useState([]);
  const [hatch, setHatch] = useState([]);
  const [last, setlast] = useState([])
const [orderstate,setorderstate]=useState(0)
const [hatchstate,sethatchstate]=useState(0)
const [empstate,setempstate]=useState(0)


  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [circleData, setCircleData] = useState({
    labels: [],
    datasets: [],
  });


  var arr
  var chick_array
  var meet_array
  var egg_array
 var order_array
  
  useEffect(() => {

    const fetchDataOrder = async () => {
      console.log("well it is called here")
      try {
        const response = await fetch('https://poultry-backends.onrender.com/api/month', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(empget),
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        arr = jsonData.array
        order_array=[arr.order.jan, arr.order.feb, arr.order.mar, arr.order.apr, arr.order.may, arr.order.jun, arr.order.jul, arr.order.aug, arr.order.sep, arr.order.oct, arr.order.nov, arr.order.dec]
        chick_array = [arr.chick.jan, arr.chick.feb, arr.chick.mar, arr.chick.apr, arr.chick.may, arr.chick.jun, arr.chick.jul, arr.chick.aug, arr.chick.sep, arr.chick.oct, arr.chick.nov, arr.chick.dec]
        meet_array = [arr.meet.jan, arr.meet.feb, arr.meet.mar, arr.meet.apr, arr.meet.may, arr.meet.jun, arr.meet.jul, arr.meet.aug, arr.meet.sep, arr.meet.oct, arr.meet.nov, arr.meet.dec,];
        egg_array = [arr.egg.jan, arr.egg.feb, arr.egg.mar, arr.egg.apr, arr.egg.may, arr.egg.jun, arr.egg.jul, arr.egg.aug, arr.egg.sep, arr.egg.oct, arr.egg.nov, arr.egg.dec,];
        console.log("chick array 11", chick_array)
        // Sample data for the chart
        const data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [
            {
              label: "Chick",
              data: chick_array,
              fill: false,
              borderColor: "brown",
              borderWidth: 2,
            },
            {
              label: "Meet", // New dataset label
              data: meet_array, // Replace with your data array for Meet
              fill: false,
              borderColor: "blue", // Customize the color
              borderWidth: 2,
            },
            {
              label: "Egg", // New dataset label
              data: egg_array, // Replace with your data array for Meet
              fill: false,
              borderColor: "black", // Customize the color
              borderWidth: 2,
            }

          ],
        };
        setChartData(data)
        const data1 = {
          labels: ['Jan', 'Feb', 'Mar',"Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"],
          datasets: [
            {
              data: order_array,
              backgroundColor: ['red', '#FF8000', "yellow","#80FF00","green","#00FF80","#00FFFF","#0080FF","#0000FF","#8000FF","#FF00FF","#FF0080"],
              hoverBackgroundColor: ['skyblue'],
            },
          ],
        };
        setCircleData(data1)

        console.log("Returned array of Graph", arr)
        console.log("Chick", arr.chick.jan)
        console.log("Meet", arr.meet)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataOrder()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://poultry-backends.onrender.com/api/getone/customer',{
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
       const arr=jsonData.array
       console.log("Array in the home page",arr)
       order_details=arr.order_count
       production_details=arr.hatching_count
       employee_details=arr.poultry_count
       console.log("All values will be displayed here",order_details,production_details,employee_details)
       setorderstate(order_details)
       sethatchstate(production_details)
       setempstate(employee_details)

      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData(); 


}, [])

// useEffect(() => {
//   console.log("separate useeffect", orderstate, hatchstate, empstate);
// }, [orderstate, hatchstate, empstate]);
const chartOptions = {
  elements: {
    line: {
      tension: 0.4, // You can adjust the tension value for the desired curve
    },
  },
};
  return (
    <>
   <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@500&family=Exo+2:ital@1&family=Josefin+Sans&family=Libre+Baskerville:ital@1&family=Mukta&display=swap" rel="stylesheet"></link>
    <div className="outer_home">
      <div className="homee">
        <div className="homeinner">
          <div className="maincontent">
            <p>{empstate}</p>
            <p>Employee Details</p>
          </div>
          <div className="mainimblock">
            <img className="mainimage" src={ordersicon} alt="orders" />
          </div>

        </div>
        <div className="homeinner">
          <div className="maincontent">
            <p>{hatchstate}</p>
            <p>Production Details</p>
          </div>
          <div className="mainimblock">
            <img className="mainimage" src={employersicon} alt="employers" />
          </div>
        </div>
        <div className="homeinner">
          <div className="maincontent">
            <p>{orderstate}</p>
            <p>Order Details pp</p>
          </div>
          <div className="mainimblock">
            <img className="mainimage" src={eggicon} alt="production" />
          </div>
        </div>
        <div className="homeinner">
          <div className="maincontent">
            <p>2</p>
            <p>Doctor Details</p>
          </div>
          <div className="mainimblock">
            <img className="mainimage" src={salescon} alt="sales" />
          </div>
        </div>
     
      </div>
{/*        
      <div className="chart">
         */}
      <div className="chart-container">
        <div className="sepdot">
          <h2>Order Graph</h2>
      <Doughnut  className="dot" data={circleData}  />  
      </div>
      <div className="sepdot1">
        <h2>Production Graph</h2>
        <Line className="line" data={chartData} options={chartOptions} />
</div>
      </div>
      </div>
{/* 
    </div> */}
    </>
  )
}


