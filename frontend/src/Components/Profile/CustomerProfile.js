import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Customer/Header/Header";
import Footer from "../Customer/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./CustomerProfile.css";
import ProfileIcon from "./profileicon.png";

function CustomerProfile() {
  const [customer, setCustomer] = useState({});
  const [orders, setOrders] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      const customerId = localStorage.getItem("customerId");
      const customerEmail = localStorage.getItem("userEmail");

      if (!customerEmail) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:6001/Customers/${customerId}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setCustomer(response.data);
          localStorage.setItem("userEmail", response.data.email);
        }
      } catch (error) {
        console.error("Error fetching customer profile:", error);
      }

      try {
        const orderResponse = await axios.get(`http://localhost:6001/Order/getOrders/${customerId}`, {
          withCredentials: true,
        });

        if (orderResponse.status === 200) {
          setOrders(orderResponse.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }

      try {
        const repairResponse = await axios.get(`http://localhost:6001/Repair/getRepairs/${customerEmail}`, {
          withCredentials: true,
        });

        if (repairResponse.status === 200) {
          setRepairs(repairResponse.data);
        }
      } catch (error) {
        console.error("Error fetching repairs:", error);
      }

      try {
  const invoiceResponse = await axios.get(`http://localhost:6001/Invoice/getInvoices/${customerEmail}`, {
    withCredentials: true,
  });

  if (invoiceResponse.status === 200) {
    setInvoices(invoiceResponse.data);
  }
} catch (error) {
  console.error("Error fetching invoices:", error);
}


      setLoading(false);
    };

    fetchCustomerProfile();
  }, [navigate]);

  const handleEditProfile = () => navigate("/EditProfile");
  const handleResetPassword = () => navigate("/ResetPassword");
  const handleBack = () => navigate("/");
  const handleLogout = () => {
    localStorage.removeItem("customerId");
    navigate("/login");
  };

  const handlePayNow = (order) => {
    if (order.orderStatus === "Pending") {
      alert("Please wait until your order is approved.");
      return;
    }
    if (order.orderStatus === "Rejected") {
      alert("Your order is rejected.");
      return;
    }
    if (order.paymentStatus === "Completed") {
      alert("You have already made the payment.");
      return;
    }
    navigate("/PaymentPage", {
      state: { orderId: order._id, amount: order.packageId.price, customerId: order.customerId },
    });
  };

  const handleRequestRepair = (orderId) => {
    const orderDetails = orders.find((order) => order._id === orderId);
    navigate("/RequestRepair", {
      state: {
        orderId: orderDetails._id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerContact: customer.contact,
        packageName: orderDetails.packageId.package_name,
        address: customer.address,
      },
    });
  };

  const handleDeleteRepair = async (repairId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this repair request?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:6001/Repair/deleteRepair/${repairId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setRepairs((prevRepairs) => prevRepairs.filter((repair) => repair._id !== repairId));
        alert("Repair request deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting repair:", error);
      alert("Failed to delete repair request.");
    }
  };

  const handleOpenReviewPopup = (order) => {
    setSelectedOrder(order);
    setShowReviewPopup(true);
    setReviewText("");
  };

  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
    setSelectedOrder(null);
    setReviewText("");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
  
    if (!reviewText.trim()) {
      alert("Please enter a review before submitting.");
      return;
    }
  
    setSubmitting(true);
  
    try {
      const payload = {
        customerName: customer.name,
        customerEmail: customer.email,
        orderId: selectedOrder._id,
        packageName: selectedOrder.packageId.package_name,
        reviewText,
      };
  
      const response = await axios.post("http://localhost:6001/Review/addReview", payload, {
        withCredentials: true,
      });
  
      if (response.status === 201) {
        alert("Review submitted successfully!");
        handleCloseReviewPopup();
      } else {
        alert("Failed to submit review. Try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };
  

  if (loading) {
    return (
      <div className="loading-container">
        <h2 className="loading-text">FutureWatt</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="customer-profile">
        <div className="profile-split-container">
          <div className="profile-left">
            <div className="profile-card">
              <h1>Customer Profile</h1>
              <img src={ProfileIcon} alt="Profile Icon" className="profile-icon" />
              <div className="profile-details">
                <p><strong>Name:</strong> <span>{customer.name || "N/A"}</span></p>
                <p><strong>Email:</strong> <span>{customer.email || "N/A"}</span></p>
                <p><strong>Contact:</strong> <span>{customer.contact || "N/A"}</span></p>
                <p><strong>Address:</strong> <span>{customer.address || "N/A"}</span></p>
                <p><strong>NIC:</strong> <span>{customer.nic || "N/A"}</span></p>
              </div>
              <div className="profile-buttons">
                <button onClick={handleBack}>Back</button>
                <button onClick={handleEditProfile}>Edit Profile</button>
                <button onClick={handleResetPassword}>Reset Password</button>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </div>
          </div>

          <div className="profile-right">
            <div className="orders-card">
              <h2>My Orders</h2>
              {orders.length === 0 ? (
                <p className="no-orders">No orders found.</p>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order._id} className="order-item">
                      <p><strong>Order ID:</strong> <span>{order._id}</span></p>
                      <p><strong>Package:</strong> <span>{order.packageId.package_name}</span></p>
                      <p><strong>Order Status:</strong> <span>{order.orderStatus}</span></p>
                      <p><strong>Payment Status:</strong> <span>{order.paymentStatus}</span></p>
                      <div className="order-buttons">
                        <button onClick={() => handlePayNow(order)} className="pay-btn">Pay Now</button>
                        <button onClick={() => handleRequestRepair(order._id)} className="repair-btn">Request Repair</button>
                        <button
                          onClick={() => handleOpenReviewPopup(order)}
                          className="review-btn"
                          disabled={order.orderStatus !== "Completed"}
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="orders-card">
              <h2>My Repairs</h2>
              {repairs.length === 0 ? (
                <p className="no-repairs">No repair requests found.</p>
              ) : (
                <div className="orders-list">
                  {repairs.map((repair) => (
                    <div key={repair._id} className="order-item">
                      <p><strong>Repair ID:</strong> <span>{repair._id}</span></p>
                      <p><strong>Package:</strong> <span>{repair.packageName}</span></p>
                      <p><strong>Repair Type:</strong> <span>{repair.repairType}</span></p>
                      <p><strong>Status:</strong> <span>{repair.repairStatus}</span></p>
                      <p><strong>Description:</strong> <span>{repair.description}</span></p>
                      <div className="repair-buttons">
                        
                        <button className="repair-btn" onClick={() => handleDeleteRepair(repair._id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="orders-card">
  <h2>My Invoices</h2>
  {invoices.length === 0 ? (
    <p className="no-invoices">No invoices found.</p>
  ) : (
    <div className="orders-list">
      {invoices.map((invoice) => (
        <div key={invoice._id} className="order-item">
          <p><strong>Invoice ID:</strong> <span>{invoice._id}</span></p>
          <p><strong>Order ID:</strong> <span>{invoice.orderId}</span></p>
          <p><strong>Price:</strong> <span>LKR {invoice.price}</span></p>
          <p><strong>Date:</strong> <span>{new Date(invoice.createdAt).toLocaleDateString()}</span></p>
          <a
            href={`data:application/pdf;base64,${btoa(
              new Uint8Array(invoice.pdfBuffer.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), "")
            )}`}
            download={`Invoice-${invoice._id}.pdf`}
            className="download-btn"
          >
            Download Invoice
          </a>
        </div>
      ))}
    </div>
  )}
</div>

          </div>
        </div>

        {showReviewPopup && (
          <div className="review-popup" role="dialog" aria-modal="true" aria-labelledby="review-popup-title">
            <div className="review-popup-content">
              <h2 id="review-popup-title">Submit Your Review</h2>
              <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={customer.name || ""}
                    readOnly
                    className="form-input"
                    aria-describedby="name-desc"
                  />
                  <span id="name-desc" className="sr-only">
                    This field is pre-filled with your name and cannot be edited.
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={customer.email || ""}
                    readOnly
                    className="form-input"
                    aria-describedby="email-desc"
                  />
                  <span id="email-desc" className="sr-only">
                    This field is pre-filled with your email and cannot be edited.
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="review">Review:</label>
                  <textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                    className="form-textarea"
                    required
                    aria-describedby="review-desc"
                  ></textarea>
                  <span id="review-desc" className="sr-only">
                    Enter your review for the order. This field is required.
                  </span>
                </div>
                <div className="popup-buttons">
                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseReviewPopup}
                    className="cancel-btn"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CustomerProfile;