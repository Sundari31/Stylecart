import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import Checkout from './pages/Checkout'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import Wishlist from './pages/Wishlist'
import Account from './pages/Account'
import OrderSuccess from './pages/OrderSuccess'

function App() {

  return (
    <>
     <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      <Footer />
     </Router>
    </>
  )
}

export default App
