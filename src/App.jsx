import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import About from './pages/About'
import RefundPolicy from './pages/RefundPolicy'
import ShippingPolicy from './pages/ShippingPolicy'

function WithLayout({ children, cartCount }) {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Nav cartCount={cartCount} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product, size) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size)
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, size, quantity: 1 }]
    })
  }

  const updateQuantity = (id, size, delta) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <WithLayout cartCount={cartCount}>
              <Home onAddToCart={addToCart} />
            </WithLayout>
          }
        />
        <Route
          path="/category/:slug"
          element={
            <WithLayout cartCount={cartCount}>
              <Category onAddToCart={addToCart} />
            </WithLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <WithLayout cartCount={cartCount}>
              <ProductDetail onAddToCart={addToCart} />
            </WithLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <WithLayout cartCount={cartCount}>
              <Cart cart={cart} onUpdateQuantity={updateQuantity} />
            </WithLayout>
          }
        />
        <Route
          path="/about"
          element={
            <WithLayout cartCount={cartCount}>
              <About />
            </WithLayout>
          }
        />
        <Route
          path="/refund-policy"
          element={
            <WithLayout cartCount={cartCount}>
              <RefundPolicy />
            </WithLayout>
          }
        />
        <Route
          path="/shipping-policy"
          element={
            <WithLayout cartCount={cartCount}>
              <ShippingPolicy />
            </WithLayout>
          }
        />
        {/* Checkout and confirmation: no full nav, logo only */}
        <Route
          path="/checkout"
          element={<Checkout cart={cart} onClearCart={clearCart} />}
        />
        <Route
          path="/confirmation"
          element={<OrderConfirmation />}
        />
      </Routes>
    </BrowserRouter>
  )
}
