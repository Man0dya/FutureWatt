const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");
const upload = require("../middlewares/upload");

// Create a new order
router.post("/createOrder", OrderController.createOrder);

// Get orders by customer ID
router.get("/getOrders/:customerId", OrderController.getOrdersByCustomer);

router.get("/getOrder/:orderId", OrderController.getOrderById);

// Update the status of an order (e.g., technician approval)
router.put("/updateOrderStatus", OrderController.updateOrderStatus);

// Delete an order (cancel order)
router.delete("/deleteOrder/:orderId", OrderController.deleteOrder); // New delete route

router.put("/updatePaymentStatus", OrderController.updatePaymentStatus);

router.get("/getAllOrders", OrderController.getAllOrders);

router.put("/updateTechnicianAssignment", OrderController.updateTechnicianAssignment);

router.put("/updateTechReport/:orderId", OrderController.updateTechReport);

router.get("/getPendingOrdersCount", OrderController.getPendingOrdersCount);


router.put(
    "/updateLiveReport/:orderId",
    upload.single("live_image"),
    OrderController.updateLiveReport
  );

module.exports = router;
