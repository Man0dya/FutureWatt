const express = require("express");
const router = express.Router();
const repairController = require("../Controllers/RepairController");

// Route to create a repair request
router.post("/createRepair", repairController.createRepair);

// Route to get repairs by customer email
router.get("/getRepairs/:customerEmail", repairController.getRepairsByCustomer);

// Route to delete a repair request by repair ID
router.delete("/deleteRepair/:repairId", repairController.deleteRepair);

// Route to get all repair requests (for admin/technician)
router.get("/getAllRepairs", repairController.getAllRepairs);

// Route to update repair status (Pending, Approved, Rejected)
router.put("/updateRepairStatus/:repairId", repairController.updateRepairStatus);

// Route to update repair price
router.put("/updatePrice/:repairId", repairController.updatePrice);

// Route to get a repair request by ID
router.get("/getRepairById/:repairId", repairController.getRepairById);

router.get("/getPendingRepairsCount", repairController.getPendingRepairsCount);


module.exports = router;
