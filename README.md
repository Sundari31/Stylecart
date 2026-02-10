# 🛍️ StyleCart – MERN Stack E-Commerce Website

StyleCart is a full-stack e-commerce web application built using the **MERN stack** with secure authentication, product management, cart, wishlist, and online payment integration.

---

## 🚀 Features

### 👤 User
- User registration & login (JWT authentication)
- View and update account details
- Wishlist management
- Order history

### 🛒 Shopping
- Browse products by category
- Add/remove products to cart
- Quantity management
- Checkout flow

### 💳 Payments
- Razorpay payment gateway integration
- Secure order placement
- Order success confirmation

### 📦 Admin / Backend
- REST APIs using Express
- MongoDB database with Mongoose
- Protected routes with middleware
- Image upload support

---

## 🧰 Tech Stack

### Frontend
- React.js (Vite)
- React Router
- Context API
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Razorpay API

---

## 📂 Project Structure

```bash
Stylecart/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/<your-username>/Stylecart.git
cd Stylecart

2️⃣ Backend setup
cd backend
npm install
npm run dev


Create .env:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

3️⃣ Frontend setup
cd frontend
npm install
npm run dev