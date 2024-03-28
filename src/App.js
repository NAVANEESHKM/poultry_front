
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Main} from "./Main/Main";
import Signup from "./Signup/Signup.js"
import Login from "./Login/Login.js"
import Front from "./Front/Front.js"
import {Home} from "./Home/Home";
import {Employee} from "./Employee/Employee";
import {Hatching} from "./Hatching/Hatching";
import {Doctor} from "./Doctor/Doctor";
import { OrderDetails } from './OrderDetails/OrderDetails';
import {Employee_form} from "./Employee_form/Employee_form";
import { Hatching_form } from "./Hatching_form/Hatching_form";
import{Adminpage} from "./Adminpage/Adminpage";
import {Adminmain} from "./Adminmain/Adminmain"
function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/front" element={<Main/>}>
                    <Route index element={<Home/>}/>
                    <Route path="employee" element={<Employee/>}/>
                    <Route path="hatching" element={<Hatching/>}/>
                    <Route path="doctor" element={<Doctor/>}/>
                    <Route path="order" element={<OrderDetails/>}/>
                    <Route path="emp_form" element={<Employee_form/>}/>
                    <Route path="hatch_form" element={<Hatching_form/>}/>
                    

            </Route>
            <Route path="/admin_login" element={<Adminpage/>}/>
            <Route path="/adminpage" element={<Adminmain/>}/>
        </Routes>
       </Router>
    </div>
  );
}

export default App;
