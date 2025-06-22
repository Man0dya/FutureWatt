const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../Model/PaymentModel");
const Order = require("../Model/OrderModel");
require("dotenv").config();

// ⚡ 2️⃣ Create Stripe Payment Session
const createStripeSession = async (req, res) => {
  try {
    const { amount, customerId, orderId, email } = req.body;

    // Ensure the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Create the Stripe checkout session
    console.log('Creating Stripe session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: { name: "Solar Package" },
            unit_amount: amount * 100, // Convert amount to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/SuccessPage?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/CancelPage`,
      customer_email: email,
    });
    console.log('Stripe session created:', session);

    // Create a payment record in the database
    await Payment.create({
      customerId,
      orderId,
      transactionId: session.id,
      amount,
      paymentStatus: "Pending",
    });

    // Send session ID as response
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Session Error:", error);
    res.status(500).json({ message: "Payment session creation failed." });
  }
};


// ⚡ 4️⃣ Confirm Payment Status after Stripe Session Completion (Manually Call after Payment)
const confirmPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // Update the payment status to "Completed"
      await Payment.findOneAndUpdate({ transactionId: sessionId }, { paymentStatus: "Completed" });
      res.status(200).json({ message: "Payment successful" });
    } else {
      res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Payment Confirmation Error:", error);
    res.status(500).json({ message: "Payment confirmation failed." });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find(); // Fetch all payments
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Failed to retrieve payments" });
  }
};

const approvePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    // Step 1: Find and update the payment status
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { paymentStatus: "Completed" },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    console.log("Updated Payment:", updatedPayment); // Debugging

    // Step 2: Find the related Order and update its payment status
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: updatedPayment.orderId },  // Ensure `orderId` exists in your Payment model
      { paymentStatus: "Completed" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found for this payment" });
    }

    console.log("Updated Order:", updatedOrder); // Debugging

    res.status(200).json({ 
      message: "Payment approved and order payment status updated",
      payment: updatedPayment,
      order: updatedOrder
    });
  } catch (error) {
    console.error("Error approving payment:", error);
    res.status(500).json({ message: "Failed to approve payment" });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    // Find the payment record using transactionId
    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Failed to retrieve payment details" });
  }
};






module.exports = {
  createStripeSession,
  confirmPayment,
  getAllPayments,
  approvePayment,
  getPaymentById,
};
