import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ConfirmOrder from "./pages/ConfirmOrder";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-sand text-brown font-sans">
        <Navbar />
        <main className="flex-grow-1 pt-5 pt-md-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parfyumeriya" element={<Products type="osnova" />} />
            <Route path="/flakony" element={<Products type="flakon" />} />
            <Route path="/masla" element={<Products type="maslo" />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirm" element={<ConfirmOrder />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
