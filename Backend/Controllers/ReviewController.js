const Review = require("../Model/ReviewModel");

exports.addReview = async (req, res) => {
  try {
    const { customerName, customerEmail, orderId, packageName, reviewText } = req.body;

    const review = new Review({
      customerName,
      customerEmail,
      orderId,
      packageName,
      reviewText,
    });

    await review.save();
    res.status(201).json({ message: "Review submitted successfully." });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.getReviewsByCustomer = async (req, res) => {
  try {
    const { email } = req.params;
    const reviews = await Review.find({ customerEmail: email }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find().sort({ createdAt: -1 });
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
