import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import DejaVuSans from "../fonts/DejaVuSans-normal.js";

function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const state = location.state;
    if (state) {
      setName(state.name);
      setOrderData(state.orderData);
      setCart(state.cart);
    }

    setTimeout(() => setShow(true), 100);
  }, []);

  const handleGoHome = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.addFileToVFS("DejaVuSans.ttf", DejaVuSans.normal);
    doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
    doc.setFont("DejaVuSans");

    let y = 20;
    doc.setFontSize(24);
    doc.setTextColor(139, 69, 19);
    doc.text("AROMEO", 105, y, { align: "center" });

    y += 15;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);

    if (orderData) {
      doc.text(`Заказ от: ${orderData.name || "-"}`, 20, y += 10);
      doc.text(`Email: ${orderData.email || "-"}`, 20, y += 10);
      doc.text(`Телефон: ${orderData.phone || "-"}`, 20, y += 10);
      doc.text(`Комментарий: ${orderData.comment || "-"}`, 20, y += 10);
      doc.text(`Дата заказа: ${new Date().toLocaleString()}`, 20, y += 15);
    }

    doc.text("Товары:", 20, y += 10);

    cart.forEach((item, index) => {
      const itemName = item.name || "-";
      const quantity = item.quantity || 1;
      const price = typeof item.price === "number" ? `${item.price} rub.` : "индивидуально";
      const text = `${index + 1}) ${itemName} | ${quantity} шт. | ${price}`;
      doc.text(text, 20, y += 10);

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    const total = cart.reduce((sum, item) => {
      if (typeof item.price === "number") {
        return sum + item.price * (item.quantity || 1);
      }
      return sum;
    }, 0);

    y += 15;
    doc.setFontSize(16);
    doc.setTextColor(0, 128, 0);
    doc.text(`Итого: ${total} rub.`, 20, y);

    const hasIndividualPrice = cart.some(item => typeof item.price !== "number");
    if (hasIndividualPrice) {
      doc.text(`+ индивидуально`, 20, y + 10);
    }

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    const formattedTime = now.toTimeString().slice(0, 5).replace(':', '');
    const filename = `заказ-${formattedDate}-${formattedTime}.pdf`;

    doc.save(filename);
    setTimeout(() => localStorage.clear(), 500); // išvalom po PDF
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div
        className={`p-5 bg-white rounded-4 shadow-lg text-center border transition-opacity ${
          show ? "opacity-100 translate-up" : "opacity-0"
        }`}
        style={{
          maxWidth: "500px",
          transition: "all 0.6s ease",
          transform: show ? "translateY(0)" : "translateY(20px)",
          borderColor: "#FFA500"
        }}
      >
        <div className="checkmark-container mb-4">
          <div className="checkmark">&#10004;</div>
        </div>

        <h2 className="fw-bold mb-3" style={{ color: "#333", fontSize: "1.8rem" }}>
          Спасибо за заказ{ name && `, ${name}` }!
        </h2>

        <p className="text-muted mb-4 fs-5">
          Ваша заявка успешно отправлена. <br /> Мы скоро свяжемся с вами.
        </p>

        <div className="d-flex flex-column gap-3">
          <button
            onClick={handleDownloadPDF}
            className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold shadow-sm"
          >
            Скачать заказ в PDF
          </button>

          <button
            onClick={handleGoHome}
            className="btn btn-warning px-4 py-2 rounded-pill fw-bold shadow-sm text-white"
          >
            Вернуться на главную
          </button>
        </div>
      </div>

      <style>
        {`
          .checkmark-container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .checkmark {
            font-size: 3rem;
            color: #28a745;
            animation: pop 0.6s ease forwards;
          }
          @keyframes pop {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default Success;

