const Order = require("../Model/OrderModel");
const Package = require("../Model/PackageModel");

const createOrder = async (req, res) => {
  try {
    const { customerId, packageId, fullName, email, contactNo, address, NIC, deliveryLocation } = req.body;

    // Check if the package exists
    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: "Package not found." });
    }

    // Create the order
    const newOrder = new Order({
      customerId,
      packageId,
      fullName,
      email,
      contactNo,
      address,
      NIC,
      deliveryLocation,
    });

    await newOrder.save();

    // After saving the order, return the order with package price
    res.status(201).json({
      message: "Order created successfully.",
      order: {
        ...newOrder.toObject(),
        packagePrice: package.price, // Include price in the order response
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order." });
  }
};


const getOrdersByCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const orders = await Order.find({ customerId }).populate("packageId");

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this customer." });
    }

    // Populate package price in the response
    const ordersWithPrice = orders.map(order => {
      order.packagePrice = order.packageId.price;
      return order;
    });

    res.status(200).json(ordersWithPrice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders." });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Validate the status
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.orderStatus = status;
    await order.save();
    res.status(200).json({ message: "Order status updated.", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status." });
  }
};

// New deleteOrder method to handle order cancellation
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Optionally, you can check if the order status is "pending" before allowing cancellation
    if (order.status !== "pending") {
      return res.status(400).json({ message: "Cannot cancel an order that is not pending." });
    }

    await order.remove();
    res.status(200).json({ message: "Order cancelled successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error cancelling the order." });
  }
};

const updatePaymentStatus = async (req, res) => {
    const { orderId, paymentStatus } = req.body;

    if (!orderId || !paymentStatus) {
        return res.status(400).json({ message: "Order ID and payment status are required" });
    }

    try {
        // Find the order and update paymentStatus
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { paymentStatus: paymentStatus },
            { new: true } // Return the updated order
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Payment status updated successfully", updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params; // Get the orderId from the URL

  try {
    const order = await Order.findById(orderId); // Find the order by ID

    if (!order) {
      return res.status(404).json({ message: "Order not found" }); // Handle if order is not found
    }

    res.status(200).json(order); // Send the order details as a response
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Error fetching order details" }); // Handle server error
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("packageId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const updateTechnicianAssignment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.isTechnicianAssigned) {
      return res.status(400).json({ message: "Technician already assigned." });
    }

    order.isTechnicianAssigned = true;
    await order.save();

    res.status(200).json({ message: "Technician assigned successfully.", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating technician assignment." });
  }
};



// Update order with technician's description and order status
const updateTechReport = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { tech_description, orderStatus } = req.body;

        // Validate input
        if (!tech_description || !orderStatus) {
            return res.status(400).json({ message: "tech_description and orderStatus are required" });
        }

        // Update order
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { tech_description, orderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        console.error("Error updating technician report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateLiveReport = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const live_description = req.body.live_description || "";
    const live_image = req.file ? req.file.path : "";

    if (!live_description && !live_image && !orderStatus) {
      return res.status(400).json({ message: "At least one field is required." });
    }

    const updatedData = {
      ...(live_description && { live_description }),
      ...(live_image && { live_image }),
      ...(orderStatus && { orderStatus }),
    };

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating live report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getPendingOrdersCount = async (req, res) => {
  try {
    const pendingOrdersCount = await Order.countDocuments({ orderStatus: "Pending" });
    res.json({ count: pendingOrdersCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to get pending orders count" });
  }
};








module.exports = {
  createOrder,
  getOrdersByCustomer,
  updateOrderStatus,
  deleteOrder, 
  updatePaymentStatus,
  getOrderById,
  getAllOrders,
  updateTechnicianAssignment,
  updateTechReport,
  updateLiveReport,
  getPendingOrdersCount,
};
