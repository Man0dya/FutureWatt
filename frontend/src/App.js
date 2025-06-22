import React from "react";
import Home from "./Components/Customer/Home/Home";
import Products from "./Components/Customer/Products/Products"
import AboutUs from "./Components/Customer/AboutUs/AboutUs";
import ContactUs from "./Components/Customer/ContactUs/ContactUs"
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path ="/" element ={<Home/>}/>
          <Route path ="/Home" element ={<Home/>}/>
          <Route path ="/Packages" element ={<Products/>}/>
          <Route path ="/AboutUs" element ={<AboutUs/>}/>
          <Route path ="/ContactUs" element ={<ContactUs/>}/>
          <Route path ="/Sign Up" element ={<Home/>}/>
        </Routes>
      </React.Fragment>

      
    </div>
  );
}

export default App;
