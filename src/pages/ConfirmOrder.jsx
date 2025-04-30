import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmOrder() {
  const [orderInfo, setOrderInfo] = useState({});
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("orderInfo"));
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setOrderInfo(info || {});
    setCart(cartItems);
  }, []);

  const total = cart.reduce((sum, item) => {
    if (item.price === "индивидуально") {
      return sum;
    }
    return sum + item.price * (item.quantity || 1);
  }, 0);

  
const handleConfirm = async () => {
  try {
    const response = await fetch("https://aromeo-backend.onrender.com/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: orderInfo.name,
        email: orderInfo.email,
        phone: orderInfo.phone,
        whatsapp: orderInfo.whatsapp,
        address: orderInfo.address,
        comment: orderInfo.comment,
        cartItems: cart,
      }),
    });

    const data = await response.json();
    if (data.success) {
      navigate("/success", {
        state: {
          name: orderInfo.name,
          orderData: orderInfo,
          cart: cart,
        },
      });
      localStorage.removeItem("cart");
    } else {
      alert("Ошибка при отправке письма");
    }
  } catch (error) {
    console.error("Ошибка отправки:", error);
    alert("Ошибка при соединении с сервером");
  }
};


  return (
    <div className="container py-5">
      <h2 className="text-brown fw-bold mb-4 display-5 text-center">
        Подтверждение заказа
      </h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="h5 fw-bold mb-3">Контактная информация</h3>
        <p><strong>Имя:</strong> {orderInfo.name}</p>
        <p><strong>Email:</strong> {orderInfo.email}</p>
        <p><strong>Телефон:</strong> {orderInfo.phone}</p>
        <p><strong>WhatsApp:</strong> {orderInfo.whatsapp}</p>
        <p><strong>Адрес:</strong> {orderInfo.address}</p>
        <p><strong>Комментарий:</strong> {orderInfo.comment}</p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="h5 fw-bold mb-3">Товары</h3>
        <ul className="list-group mb-3">
          {cart.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center gap-3"
            >
              <div className="d-flex align-items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                  }}
                />
                <div>
                  <div className="fw-semibold">{item.name}</div>
                  {item.code && (
                    <small className="text-muted">Код: {item.code}</small>
                  )}
                  <div className="text-muted small">
                    Количество: {item.quantity || 1}
                  </div>
                </div>
              </div>

              <div className="text-end">
                {item.price === "индивидуально" ? (
                  <>
                    <div className="text-orange fw-bold">индивидуально</div>
                    <small className="text-muted">цена договорная</small>
                  </>
                ) : (
                  <>
                    <div>{item.price} ₽</div>
                    <small className="text-muted">
                      {(item.price * (item.quantity || 1)).toFixed(2)} ₽
                    </small>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="text-end fs-5 fw-bold text-brown">
          Итого: {total.toFixed(2)} ₽
        </p>

        {cart.some(item => item.price === "индивидуально") && (
          <p className="text-brown text-end mt-2 fs-6">
            Для некоторых товаров цена рассчитывается индивидуально.
          </p>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <button
          onClick={() => navigate("/flakony")}
          className="btn btn-outline-secondary rounded-pill px-4"
        >
          Вернуться в каталог
        </button>
        <button
          onClick={handleConfirm}
          className="btn btn-orange text-white rounded-pill px-4 fw-bold"
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
}

export default ConfirmOrder;
