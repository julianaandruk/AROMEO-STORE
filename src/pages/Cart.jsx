import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, amount) => {
    const updatedCart = [...cart];
    const currentQty = parseInt(updatedCart[index].quantity) || 1;
    updatedCart[index].quantity = Math.max(1, currentQty + amount);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleManualQuantity = (index, value) => {
    const updatedCart = [...cart];
    const newQuantity = Math.max(1, parseInt(value) || 1);
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const total = cart.reduce((sum, item) => {
    return sum + (typeof item.price === "number" ? item.price * (item.quantity || 1) : 0);
  }, 0);

  const hasIndividualPrice = cart.some((item) => typeof item.price !== "number");

  if (cart.length === 0) {
    return (
      <main
        className="cart-wrapper d-flex flex-column justify-content-center align-items-center text-center"
        style={{ flexGrow: 1, minHeight: "calc(100vh - 200px)" }} // 👈 pridėta čia
      >
        <h2 className="fw-bold mb-4" style={{ color: "#5c4033" }}>Ваша корзина пуста</h2>
        <button
          onClick={() => navigate("/flakony")}
          className="btn btn-orange px-5 py-3 rounded-pill text-white fw-bold shadow"
        >
          Перейти в каталог
        </button>
      </main>
    );
  }
  

  return (
    <main className="cart-wrapper">
      <div className="container py-5">
        <h2 className="text-brown fw-bold mt-5 mb-4 display-5 text-center">Корзина</h2>

        <ul className="list-group mb-4 cart-list">
          {cart.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-img"
              />

              <div className="flex-grow-1">
                <h5 className="mb-1">{item.name}</h5>
                {item.code && (
                  <small className="text-muted">Код: {item.code}</small>
                )}
              </div>

              <div className="cart-qty-controls">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => updateQuantity(index, -1)}
                >
                  −
                </button>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  style={{ width: "60px" }}
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) => handleManualQuantity(index, e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => updateQuantity(index, 1)}
                >
                  +
                </button>
              </div>

              <strong className="text-orange text-nowrap">
                {typeof item.price === "number"
                  ? (item.price * (item.quantity || 1)).toFixed(2) + " ₽"
                  : "индивидуально"}
              </strong>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeItem(index)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="d-flex flex-column gap-2 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <p className="fs-4 fw-bold text-brown">Итого: {total.toFixed(2)} ₽</p>
            <button
              onClick={clearCart}
              className="btn btn-outline-danger px-4 py-2 rounded-pill"
            >
              Очистить корзину
            </button>
          </div>
          {hasIndividualPrice && (
            <p className="text-brown text-center mt-2 fs-5">
              Для некоторых товаров цена рассчитывается индивидуально.
            </p>
          )}
        </div>

        <div className="cart-actions">
          <button
            onClick={() => navigate("/checkout")}
            className="btn btn-orange px-4 py-2 rounded-pill fw-bold"
          >
            Оформить заказ
          </button>
          <button
            onClick={() => navigate("/flakony")}
            className="btn btn-outline-secondary px-4 py-2 rounded-pill"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    </main>
  );
}

export default Cart;
