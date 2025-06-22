const Finance = require("../Model/FinanceModel");

// Add Finance Data
const addFinanceData = async (req, res) => {
    try {
        const { month, income, expenses } = req.body;

        let existingEntry = await Finance.findOne({ month });
        if (existingEntry) {
            return res.status(400).json({ message: "Data for this month already exists." });
        }

        const financeData = new Finance({ month, income, expenses });
        await financeData.save();

        res.status(201).json({ message: "Finance data added successfully", financeData });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get Monthly Finance Data
const getFinanceData = async (req, res) => {
    try {
        const financeData = await Finance.find().sort({ createdAt: -1 });
        res.status(200).json(financeData);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// Delete Finance Data for a specific month
const deleteFinanceData = async (req, res) => {
    try {
      const financeId = req.params.id;
      const deletedFinance = await Finance.findByIdAndDelete(financeId);
      if (!deletedFinance) {
        return res.status(404).json({ message: 'Finance record not found' });
      }
      res.status(200).json({ message: 'Finance data deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting finance data', error });
    }
  };

module.exports = { addFinanceData, getFinanceData, deleteFinanceData };
