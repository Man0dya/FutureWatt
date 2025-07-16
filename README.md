# FutureWatt – Solar Energy Management Platform

FutureWatt is a full-stack web application designed to streamline the management of solar energy solutions in Sri Lanka. It empowers customers and staff to manage orders, repairs, payments, and more, all through a modern, user-friendly interface.

## Features

- **Customer Portal**
  - Explore solar packages and place orders
  - Track order status and payments
  - Request repairs and view service reports
  - Submit reviews and feedback
  - Access chatbot support

- **Admin & Employee Management**
  - Manage employees, packages, and customer messages
  - Approve or reject repair and order requests
  - View and respond to customer inquiries

- **Repair & Service Management**
  - Manage repair requests and update statuses
  - Create on-site and live installation reports (with PDF download)
  - Track service history

- **Payment & Finance**
  - Generate and email invoices (with PDF attachments)
  - Manage employee salaries and financial records

- **Sales & Marketing**
  - Dashboard for tracking orders, repairs, and payments
  - Manage customer reviews

## Tech Stack

- **Frontend:** React.js, Material-UI, React Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Other:** Nodemailer (email), PDFKit/pdfmake (PDF generation), Axios (API calls)

## Project Structure

```
Backend/
  Controllers/
  Model/
  Route/
  middlewares/
  uploads/
  Utils/
  app.js
  package.json
  .env

frontend/
  public/
  src/
    Components/
    index.js
  package.json
  .env
  README.md
```
