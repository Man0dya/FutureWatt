const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
require('dotenv').config(); // Load .env file
const customerRouter = require("./Route/CustomerRoute");
const packageRouter = require("./Route/PackageRoute");
const orderRouter = require("./Route/OrderRoute");
const paymentRouter = require("./Route/PaymentRoute");
const employeeRouter = require("./Route/EmployeeRoute");
const financeRouter = require("./Route/FinanceRoute");
const invoiceRouter = require("./Route/InvoiceRoute");
const repairRouter = require("./Route/RepairRoute");
const serviceRoutes = require("./Route/ServiceRoute");
const reviewRoutes = require("./Route/ReviewRoute");
const salaryRoutes = require("./Route/SalaryRoute");
const OtpRoute = require("./Route/OtpRoute");
const contactRoutes = require('./Route/ContactRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow frontend requests
    credentials: true // Allow cookies/sessions to be shared
}));


// Session setup
app.use(session({
    secret: "your_secret_key",  // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Admin:v6bxyxGdu6gVksax@testcluster.fqjuc.mongodb.net/",
        collectionName: "sessions"
    }),
    cookie: { secure: false, httpOnly: true }
}));

app.use("/Customers", customerRouter);
app.use("/Package", packageRouter);
app.use("/Order", orderRouter);
app.use("/Payment", paymentRouter);
app.use("/Employee", employeeRouter);
app.use("/Finance", financeRouter);
app.use("/Invoice", invoiceRouter);
app.use("/Repair", repairRouter);
app.use("/Service", serviceRoutes);
app.use("/Review", reviewRoutes);
app.use("/Salary", salaryRoutes);
app.use("/otp", OtpRoute);
app.use('/Contact', contactRoutes);



mongoose.connect("mongodb+srv://Admin:v6bxyxGdu6gVksax@testcluster.fqjuc.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(6001,  () => console.log("Server running on port 6001"));
    })
    .catch((err) => console.log(err));
