import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/SignUp/Signup'
import Login from './Components/SignUp/Login'
import CustomerProfile from './Components/Profile/CustomerProfile'
import EditProfile from './Components/Profile/EditProfile'
import ResetPassword from './Components/Profile/ResetPassword'
import CustomerHome from './Components/CustomerHome/CustomerHome'
import OffGrid from './Components/Customer/Products/OffGrid/OffGrid'
import OnGrid from './Components/Customer/Products/OnGrid/OnGrid'
import HotWater from './Components/Customer/Products/HotWater/HotWater'
import Packages from './Components/Customer/Products/Products'
import AboutUs from './Components/Customer/AboutUs/AboutUs'
import PlaceOrder from './Components/PlaceOrder/PlaceOrder'
import PaymentPage from './Components/Payment/PaymentPage'
import SuccessPage from './Components/Payment/SuccessPage'
import CancelPage from './Components/Payment/CancelPage'
import ContactUs from './Components/Customer/ContactUs/ContactUs';
import RequestRepair from './Components/Repair/RepairRequestPage.js';
import 'leaflet/dist/leaflet.css';

import LoginEmployee from './Components/SignUp/LoginEmployee';
import PMdashboard from './Components/Payment Management/Home/DashboardHome';
import PM_Dashboard_Order_payments from './Components/Payment Management/OrderPayments/order-payments';
import PM_Dashboard_Employee_Salary from './Components/Payment Management/EmployeeSalary/EmployeeSalary.js';
import PM_Dashboard_Invoices from './Components/Payment Management/Invoices/Invoices.js';
import PM_Dashboard_Finances from './Components/Payment Management/Finances/Finances';


import SM_Dashboard from './Components/Sale&MarketingManagement/Home/Home.js';
import SM_Dashboard_Invoices from './Components/Sale&MarketingManagement/Invoices/Invoices_sales.js';
import SM_Dashboard_Order from './Components/Sale&MarketingManagement/Order Requests/OrderRequests.js';
import SM_Dashboard_Repair from './Components/Sale&MarketingManagement/Repair Requests/RepairRequests.js';

import RM_Dashboard from './Components/Repair Management/RM_Home/RM_Home.js';
import RM_Dashboard_Repair_Requests from './Components/Repair Management/Rrepair Requests/RepairRequests.js';
import RM_Dashboard_Service_Report from './Components/Repair Management/Service Report/ServiceReport.js';
import RM_Dashboard_On_Site_Report from './Components/Repair Management/On Site Report/OnSiteReport.js'
import RM_Dashboard_Live_Report from './Components/Repair Management/Live Report/LiveReport.js'


import AD_Dashboard from './Components/User Management/AdminHome/AdminHome.js';
import AD_Dashboard_Manage_EMP from './Components/User Management/Manage Employees/ManageEmployees.js';
import AD_Dashboard_Add_PKG from './Components/User Management/Add Packages/AddPackages.js';
import AD_Dashboard_Manage_PKG from './Components/User Management/Manage Packages/ManagePackages.js';
import AD_Dashboard_Reviews from './Components/User Management/Reviews/Reviews.js';
import AD_Dashboard_Contact from './Components/User Management/Contact/Contact.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/customerHome" element={<CustomerHome />} />
      <Route path="/" element={<CustomerHome />} />
      <Route path="/CustomerProfile" element={<CustomerProfile />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/Packages/OffGrid" element={<OffGrid />} />
      <Route path="/Packages/OnGrid" element={<OnGrid />} />
      <Route path="/Packages/HotWater" element={<HotWater />} /> 
      <Route path="/Packages" element={<Packages />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/PlaceOrder" element={<PlaceOrder />} />
      <Route path="/PaymentPage" element={<PaymentPage />} />
      <Route path="/SuccessPage" element={<SuccessPage />} />
      <Route path="/CancelPage" element={<CancelPage />} />
      <Route path="/RequestRepair" element={<RequestRepair />} />

      <Route path="/LoginEmployee" element={<LoginEmployee />} />
      <Route path="/PMdashboard" element={<PMdashboard />} />
      <Route path="/PM_Dashboard_Order_payments" element={<PM_Dashboard_Order_payments />} />
      <Route path="/PM_Dashboard_Employee_Salary" element={<PM_Dashboard_Employee_Salary />} />
      <Route path="/PM_Dashboard_Invoices" element={<PM_Dashboard_Invoices />} />
      <Route path="/PM_Dashboard_Finances" element={<PM_Dashboard_Finances />} />

      <Route path="SM_Dashboard" element={<SM_Dashboard />} />
      <Route path="SM_Dashboard_Invoices" element={<SM_Dashboard_Invoices />} />
      <Route path="SM_Dashboard_Order" element={<SM_Dashboard_Order />} />
      <Route path="SM_Dashboard_Repair" element={<SM_Dashboard_Repair />} />

      <Route path="RM_Dashboard" element={<RM_Dashboard />} />
      <Route path="RM_Dashboard_Repair_Requests" element={<RM_Dashboard_Repair_Requests />} />
      <Route path="RM_Dashboard_Service_Report" element={<RM_Dashboard_Service_Report />} />
      <Route path="RM_Dashboard_On_Site_Report" element={<RM_Dashboard_On_Site_Report />} />
      <Route path="RM_Dashboard_Live_Report" element={<RM_Dashboard_Live_Report />} />

      <Route path="AD_Dashboard" element={<AD_Dashboard />} />
      <Route path="AD_Dashboard_Manage_EMP" element={<AD_Dashboard_Manage_EMP />} />
      <Route path="AD_Dashboard_Add_PKG" element={<AD_Dashboard_Add_PKG />} />
      <Route path="AD_Dashboard_Manage_PKG" element={<AD_Dashboard_Manage_PKG />} />
      <Route path="AD_Dashboard_Reviews" element={<AD_Dashboard_Reviews />} />
      <Route path="AD_Dashboard_Contact" element={<AD_Dashboard_Contact />} />
    
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
