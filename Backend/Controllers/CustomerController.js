const Customer = require("../Model/CustomerModel");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        if (!customers.length) {
            return res.status(404).json({ message: "No customers found" });
        }
        res.status(200).json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Add new customer
const addCustomer = async (req, res) => {
    const { name, password, email, contact, address, nic } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new customer with the hashed password
        const customer = new Customer({
            name,
            password: hashedPassword, // Store the hashed password
            email,
            contact,
            address,
            nic
        });

        // Save the customer to the database
        await customer.save();
        res.status(201).json({ message: "Account Created!", customer });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get customer by ID
const getById = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Update customer details
const updateCustomers = async (req, res) => {
    const { id } = req.params;
    const { name, password, email, contact, address, nic } = req.body;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { name, password, email, contact, address, nic },
            { new: true } // Return updated document
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer updated successfully", updatedCustomer });
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete customer
const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer deleted successfully", deletedCustomer });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Login customer and create session
const loginCustomer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Store customer data in session
        req.session.user = {
            id: customer._id,
            name: customer.name,
            email: customer.email,
        };

        res.status(200).json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Logout customer and destroy session
const logoutCustomer = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });

        res.status(200).json({ message: "Logged out successfully" });
    });
};

// Get customer profile (use session user ID)
const getCustomerProfile = async (req, res) => {
    const userId = req.session.user.id;  // Use session ID
  
    try {
      const customer = await Customer.findById(userId);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(customer);  // Send customer data
    } catch (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  


// Update customer profile
const updateCustomerProfile = async (req, res) => {
    const userId = req.session.user.id; // Get logged-in user from session
    const { name, email, contact, address, nic } = req.body;
  
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        userId,
        { name, email, contact, address, nic },
        { new: true } // Return updated document
      );
  
      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      // Log the response before sending
      console.log("Updated customer:", updatedCustomer);
  
      // Send updated customer as part of the response
      res.status(200).json({ 
        message: "Profile updated successfully", 
        updatedCustomer,  // Send the updated customer data
        user: updatedCustomer // Ensure this is included as 'user'
      });
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  

// Reset password


const resetPassword = async (req, res) => {
    // Get the user ID from the session (ensure the user is authenticated)
    const userId = req.session.user?.id;
  
    if (!userId) {
      return res.status(401).json({ message: "User not logged in" });
    }
  
    const { currentPassword, newPassword, confirmPassword } = req.body;
  
    // Check if the new password and confirmation match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }
  
    try {
      // Fetch the customer by ID
      const customer = await Customer.findById(userId);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      // Compare current password with stored password hash
      const isMatch = await bcrypt.compare(currentPassword, customer.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
  
      // Hash the new password
      customer.password = await bcrypt.hash(newPassword, 10);
  
      // Save the updated customer record
      await customer.save();
  
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };








module.exports = {
    getAllCustomers,
    addCustomer,
    getById,
    updateCustomers,
    deleteCustomer,
    loginCustomer,
    logoutCustomer,
    getCustomerProfile,
    updateCustomerProfile,
    resetPassword,
};
