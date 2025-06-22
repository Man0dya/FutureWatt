const Service = require("../Model/ServiceModel");

// Create a new service report
const createServiceReport = async (req, res) => {
  try {
    const {
      repairId,
      customerName,
      repairType,
      customerContact,
      serviceDescription,
      totalCost,
      repairStatus,
    } = req.body;

    const newReport = new Service({
      repairId,
      customerName,
      repairType,
      customerContact,
      serviceDescription,
      totalCost,
      repairStatus,
    });

    await newReport.save();
    res.status(201).json({ message: "Service Report Created Successfully", report: newReport });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all service reports
const getAllService = async (req, res) => {
  try {
    const reports = await Service.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a service report by ID
const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const deletedReport = await Service.findByIdAndDelete(serviceId);

    if (!deletedReport) {
      return res.status(404).json({ message: "Service Report not found" });
    }

    res.status(200).json({ message: "Service Report Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createServiceReport, getAllService, deleteService };
