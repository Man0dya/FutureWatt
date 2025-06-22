const express = require("express");
const router = express.Router();

//Insert Model
const Customer = require("../Model/CustomerModel");

//Insert User Controller
const CustomerController = require("../Controllers/CustomerController");

router.get("/",CustomerController.getAllCustomers);

router.post("/",CustomerController.addCustomer);

router.put("/resetPassword", CustomerController.resetPassword);

router.put("/:id",CustomerController.updateCustomers);

router.delete("/:id",CustomerController.deleteCustomer);

router.post('/login', CustomerController.loginCustomer);

router.post('/logout', CustomerController.logoutCustomer);

router.get("/:id", CustomerController.getCustomerProfile);

router.put("/:id",CustomerController.updateCustomerProfile);




//export
module.exports = router; 
