const Repair = require("../Model/RepairModel");
const Order = require("../Model/OrderModel");

// Create a repair request
exports.createRepair = async (req, res) => {
  try {
    const { orderId, repairType, description, price, customerName, customerEmail, customerContact, packageName, address } = req.body;
    
    const repair = new Repair({
      orderId,
      customerName,
      customerEmail,
      customerContact,
      packageName,
      address,
      repairType,
      description,
      price,
    });

    await repair.save();
    res.status(201).json({ message: "Repair request created successfully", repair });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating repair request" });
  }
};

// Get repairs by customer's email
exports.getRepairsByCustomer = async (req, res) => {
    const customerEmail = req.params.customerEmail;  // Get email from the URL params
    
    try {
      // Find repairs based on the customer's email (assuming repair table has a customerEmail field)
      const repairs = await Repair.find({ customerEmail: customerEmail });
      
      if (!repairs || repairs.length === 0) {
        return res.status(404).json({ message: "No repair requests found for this customer" });
      }
      res.status(200).json(repairs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching repair requests" });
    }
  };
  

// Delete a repair request
exports.deleteRepair = async (req, res) => {
  const repairId = req.params.repairId;
  
  try {
    const repair = await Repair.findByIdAndDelete(repairId);
    if (!repair) {
      return res.status(404).json({ message: "Repair request not found" });
    }
    res.status(200).json({ message: "Repair request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting repair request" });
  }
};

// Get all repair requests (for admin/technician)
exports.getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.find();
    res.status(200).json(repairs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching all repair requests" });
  }
};

// Update repair status (Pending, Approved, Rejected)
exports.updateRepairStatus = async (req, res) => {
  const repairId = req.params.repairId;
  const { repairStatus } = req.body;

  if (!["Pending", "Approved", "Rejected", "Completed"].includes(repairStatus)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const repair = await Repair.findByIdAndUpdate(repairId, { repairStatus }, { new: true });
    if (!repair) {
      return res.status(404).json({ message: "Repair request not found" });
    }
    res.status(200).json({ message: "Repair status updated successfully", repair });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating repair status" });
  }
};

// Update repair price
exports.updatePrice = async (req, res) => {
  const repairId = req.params.repairId;
  const { price } = req.body;

  try {
    const repair = await Repair.findByIdAndUpdate(repairId, { price }, { new: true });
    if (!repair) {
      return res.status(404).json({ message: "Repair request not found" });
    }
    res.status(200).json({ message: "Repair price updated successfully", repair });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating repair price" });
  }
};

// Get a repair request by ID
exports.getRepairById = async (req, res) => {
  const repairId = req.params.repairId;

  try {
    const repair = await Repair.findById(repairId);
    if (!repair) {
      return res.status(404).json({ message: "Repair request not found" });
    }
    res.status(200).json(repair);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching repair request" });
  }
};


exports.getPendingRepairsCount = async (req, res) => {
  try {
    const pendingRepairsCount = await Repair.countDocuments({ repairStatus: "Pending" });
    res.json({ count: pendingRepairsCount });
  } catch (error) {
    console.error("Error fetching pending repairs:", error);  // Log the error to the console
    res.status(500).json({ error: "Failed to get pending repairs count" });
  }
};

