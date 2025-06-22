import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FloatingIcon.css";
import { FaBoxOpen } from "react-icons/fa";

const FloatingIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const orderResponse = await axios.get(
        `http://localhost:6001/Order/getOrders/${customerId}`,
        {
          withCredentials: true,
        }
      );

      if (orderResponse.status === 200) {
        setOrders(orderResponse.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array means it runs once on mount

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle popup visibility
  };

  const handleOrderClick = () => {
    setIsOpen(false); // Close popup
    navigate("/CustomerProfile"); // Redirect to CustomerProfile
  };

  return (
    <div className="sticky-float-container">
      <button
        className="sticky-float-btn"
        onClick={handleClick}
        title="View My Orders"
      >
        <FaBoxOpen size={24} /> {/* Order Box Icon */}
        {orders.length > 0 && (
          <span className="order-notification-badge">{orders.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="sticky-float-popup">
          <h3>My Orders</h3>
          {loading ? (
            <p>Loading...</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="sticky-float-list">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="sticky-float-item"
                  onClick={handleOrderClick}
                >
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Package:</strong> {order.packageId.package_name}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.orderStatus}
                  </p>
                  <p>
                    <strong>Payment:</strong> {order.paymentStatus}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingIcon;