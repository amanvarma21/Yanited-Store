import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import "./App.css";
import AuthProvider from "./Context/AuthContext";
import ProductDetails from "./pages/ProductDetails";
import CartProvider from "./Context/CartContext";
import SearchProvider from "./Context/SearchContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
            <Footer />
          </div>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
