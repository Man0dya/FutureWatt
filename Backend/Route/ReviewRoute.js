const express = require("express");
const router = express.Router();
const ReviewController = require("../Controllers/ReviewController");

router.post("/addReview", ReviewController.addReview);
router.get("/getReviews/:email", ReviewController.getReviewsByCustomer);
router.get("/getAllReviews", ReviewController.getAllReviews);


module.exports = router;
