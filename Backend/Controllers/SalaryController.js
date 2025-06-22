// controllers/SalaryController.js
const Salary = require("../Model/SalaryModel");
const Employee = require("../Model/EmployeeModel");  // Assuming you already have an Employee model

exports.createSalary = async (req, res) => {
    console.log("Received data:", req.body); // Log the entire request body

    const { employeeId, name, month, year, basicSalary, bonus } = req.body;
    
    if (!employeeId) {
        return res.status(400).json({ message: "Employee ID is required." });
    }
    
    try {
        // Log employeeId before querying database
        console.log("Employee ID:", employeeId);
        const existingSalary = await Salary.findOne({ employeeId, month, year });
        if (existingSalary) {
            return res.status(400).json({ message: "Salary already created for this month." });
        }

        const netSalary = basicSalary + bonus;

        const salary = new Salary({
            employeeId,
            name,
            month,
            year,
            basicSalary,
            bonus,
            netSalary,
        });

        await salary.save();

        res.status(201).json({ message: "Salary created successfully!", salary });
    } catch (error) {
        console.error("Error creating salary:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};


  

// Get salary details for a specific employee and month
exports.getSalary = async (req, res) => {
    const { employeeId, month, year } = req.query;
  
    try {
      const salary = await Salary.findOne({ employeeId, month, year });
  
      if (!salary) {
        return res.status(404).json({ message: "No salary found for the specified month." });
      }
  
      res.status(200).json(salary);
    } catch (error) {
      console.error("Error fetching salary:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  

// In SalaryController.js
exports.getAllSalaries = async (req, res) => {
    try {
      const salaries = await Salary.find().sort({ createdAt: -1 });
      res.status(200).json(salaries);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // In Controller/SalaryController.js
exports.deleteSalary = async (req, res) => {
    try {
      const result = await Salary.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Salary not found" });
      }
      res.json({ message: "Salary deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
