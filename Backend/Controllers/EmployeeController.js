const Employee = require("../Model/EmployeeModel");
const bcrypt = require("bcryptjs");



// Create Employee
const createEmployee = async (req, res) => {
    try {
        const { fullName, email, contactNo, employeeType, password } = req.body;

        if (!fullName || !email || !contactNo || !employeeType || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = new Employee({
            fullName,
            email,
            contactNo,
            employeeType,
            password: hashedPassword,
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// Get All Employees
const getAllEmployees = async (req, res) => {
    try {
      const employees = await Employee.find().select("-password");  // Excluding password
  
      // Sending employee data with correct keys for frontend
      const response = employees.map(emp => ({
        EmployeeID: emp._id,       // Adjusting this based on what frontend expects
        Name: emp.fullName,        // Use fullName from schema
        Email: emp.email,          // Optionally send more fields if needed
        Type: emp.employeeType,
        contactNo: emp.contactNo
      }));
  
      res.status(200).json(response); // Send properly formatted data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Employee Login
const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find employee by email
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Set session
        req.session.employeeId = employee.employeeId;
        req.session.employeeType = employee.employeeType;

        res.status(200).json({
            message: "Login successful",
            employeeId: employee.employeeId,
            employeeFullName: employee.fullName,
            employeeType: employee.employeeType,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { fullName, email, contactNo, employeeType, password } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }

        let employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        if (email && email !== employee.email) {
            const emailExists = await Employee.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        let hashedPassword = employee.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        employee.fullName = fullName || employee.fullName;
        employee.email = email || employee.email;
        employee.contactNo = contactNo || employee.contactNo;
        employee.employeeType = employeeType || employee.employeeType;
        employee.password = hashedPassword;

        await employee.save();

        // Return a response matching getAllEmployees structure
        const response = {
            _id: employee._id.toString(),
            fullName: employee.fullName,
            email: employee.email,
            employeeType: employee.employeeType,
            contactNo: employee.contactNo,
        };

        console.log("Updated employee response:", response); // Debug log
        res.status(200).json({ message: "Employee updated successfully", ...response });

    } catch (error) {
        console.error("Update employee error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        await Employee.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    createEmployee,
    getAllEmployees,
    loginEmployee,
    getEmployeeById,
    updateEmployee, // ✅ Added update function
    deleteEmployee,
};
