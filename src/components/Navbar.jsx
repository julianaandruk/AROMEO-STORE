import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isActive = (path) =>
    location.pathname === path ? "nav-link active-link" : "nav-link";

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  
    const interval = setInterval(() => {
      const updatedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(updatedCartItems.length);
    }, 1000); // kas sekundę atnaujinam skaičių
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <nav className="custom-navbar py-3 shadow-sm fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="logo-text" style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "32px",
          letterSpacing: "2px",
          textTransform: "lowercase",
          color: "#fff",
          textDecoration: "none"
        }}>
          aromeo
        </Link>

        {/* Burger icon for small screens */}
        <button
          className="burger-btn d-lg-none border-0 bg-transparent"
          onClick={toggleMenu}
        >
          <div className={`burger-icon ${menuOpen ? "open" : ""}`}></div>
        </button>

        {/* Navigation links */}
        <div className={`nav-links ${menuOpen ? "d-block" : "d-none"} d-lg-flex`}>
          <Link to="/" className={isActive("/")} onClick={() => setMenuOpen(false)}>
            Главная
          </Link>
          <Link to="/flakony" className={isActive("/flakony")} onClick={() => setMenuOpen(false)}>
            Флаконы
          </Link>
          <Link to="/masla" className={isActive("/masla")} onClick={() => setMenuOpen(false)}>
            Масла
          </Link>
          <Link to="/parfyumeriya" className={isActive("/parfyumeriya")} onClick={() => setMenuOpen(false)}>
            Парфюмерная основа
          </Link>
          <Link to="/cart" className={isActive("/cart")} onClick={() => setMenuOpen(false)} style={{ position: "relative" }}>
            Корзина
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-12px",
                  backgroundColor: "#FFC107",
                  color: "#6C3B18",
                  borderRadius: "50%",
                  padding: "4px 8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  lineHeight: "1",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          {/* Ikonėlės – DESKTOP */}
  <div className="d-none d-lg-flex align-items-center gap-2 ms-3">
    <a
      href="https://t.me/aromeo_info"
      target="_blank"
      rel="noopener noreferrer"
      title="Telegram"
      className="text-white"
      style={{ fontSize: "20px" }}
    >
      <FaTelegramPlane />
    </a>
    <a
      href="https://wa.me/37064855934"
      target="_blank"
      rel="noopener noreferrer"
      title="WhatsApp"
      className="text-white"
      style={{ fontSize: "20px" }}
    >
      <FaWhatsapp />
    </a>
  </div>

  {/* Ikonėlės – MOBILE */}
  <div className="d-flex d-lg-none justify-content-end pe-3 mt-2">
    <a
      href="https://t.me/aromeo_info"
      target="_blank"
      rel="noopener noreferrer"
      title="Telegram"
      className="text-white me-3"
      style={{ fontSize: "20px" }}
    >
      <FaTelegramPlane />
    </a>
    <a
      href="https://wa.me/37064855934"
      target="_blank"
      rel="noopener noreferrer"
      title="WhatsApp"
      className="text-white"
      style={{ fontSize: "20px" }}
    >
      <FaWhatsapp />
    </a>
  </div>
</div>

        </div>
    </nav>
  );
}

export default Navbar;
