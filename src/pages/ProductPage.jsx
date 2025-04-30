import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 


// ČIA tiesiogiai visi produktai
const allProducts = [
  {
    id: 1,
    name: "Флакон 3 мл резьбовой",
    description: "Стеклянный круглый флакон с резьбовым горлышком и пластиковой крышкой.",
    price: 14,
    type: "flakon",
    image: "/3ml-kruglyj-new.png",
    discountPrices: {
      50: 14,
      100: 13,
      300: 12,
      500: 11,
      1000: 9,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 2,
    name: "Флакон 5 мл резьбовой",
    description: "Стеклянный круглый флакон с резьбовым горлышком и пластиковой крышкой.",
    price: 14,
    type: "flakon",
    image: "/5ml-kruglyj-new.png",
    discountPrices: {
      50: 14,
      100: 13,
      300: 12,
      500: 11,
      1000: 10,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 3,
    name: "Флакон 10 мл резьбовой",
    description: "Стеклянный круглый флакон с резьбовым горлышком и пластиковой крышкой.",
    price: 15,
    type: "flakon",
    image: "/10ml-kruglyj-new.png",
    discountPrices: {
      50: 15,
      100: 14,
      300: 13,
      500: 12,
      1000: 11,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 4,
    name: "Флакон 10 мл резьбовой",
    description: "Стеклянный квадратный флакон с резьбовым горлышком и пластиковой крышкой.",
    price: 60,
    type: "flakon",
    image: "/10ml-new.png",
    discountPrices: {
      25: 60,
      50: 55,
      100: 50,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 5,
    name: "Флакон 15 мл резьбовой",
    description: "Стеклянный квадратный флакон с резьбовым горлышком и пластиковой крышкой.",
    price: 70,
    type: "flakon",
    image: "/15ml-new.png",
    discountPrices: {
      25: 70,
      50: 65,
      100: 60,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 6,
    name: "Флакон 20 мл резьбовой",
    description: "Стеклянный квадратный флакон с резьбовым горлышком и пластиковой крышкой.",
    price: 65,
    type: "flakon",
    image: "/20ml.png",
    discountPrices: {
      10: 65,
      25: 60,
      50: 55,
      100: 50,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 7,
    name: "Флакон 30 мл резьбовой",
    description: "Стеклянный квадратный флакон с резьбовым горлышком и пластиковой крышкой.",
    price: 90,
    type: "flakon",
    image: "/30ml-plonesnis-new.png",
    discountPrices: {
      10: 90,
      25: 85,
      50: 80,
      100: 75,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 8,
    name: "Флакон 30 мл резьбовой (квадр. золото, серебро)",
    description: "Стеклянный квадратный флакон с резьбовым горлышком и металлической крышкой.",
    price: 90,
    type: "flakon",
    image: "/30ml.png",
    discountPrices: {
      10: 90,
      25: 85,
      50: 80,
      100: 75,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 9,
    name: "Флакон 30 мл штамповка",
    description: "Стеклянный квадратный флакон с штампованным горлышком и металлической крышкой.",
    price: 105,
    type: "flakon",
    image: "/30ml-new.png",
    discountPrices: {
      10: 105,
      25: 100,
      50: 95,
      100: 85,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 10,
    name: "Флакон 50 мл штамповка",
    description: "Стеклянный квадратный флакон с штампованным горлышком и металлической крышкой.",
    price: 110,
    type: "flakon",
    image: "/50ml-new.png",
    discountPrices: {
      10: 110,
      25: 105,
      50: 100,
      100: 90,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 11,
    name: "Флакон 100 мл штамповка",
    description: "Стеклянный квадратный флакон с штампованным горлышком и металлической крышкой.",
    price: 175,
    type: "flakon",
    image: "/100ml-new.png",
    discountPrices: {
      5: 175,
      25: 165,
      50: 155,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 12,
    name: "Авто флакон 7 мл",
    description: "Стеклянный квадратный флакон с деревянной крышкой.",
    price: 30,
    type: "flakon",
    image: "/7ml-kvadrat.png",
    discountPrices: {
      50: 30,
      480: 27,
      2400: 25,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 13,
    name: "Авто флакон 6 мл",
    description: "Стеклянный круглый флакон с деревянной крышкой.",
    price: 25,
    type: "flakon",
    image: "/6ml-kruglyj.png",
    discountPrices: {
      50: 25,
      480: 22,
      2400: 20,
    },
    additionalInfo: "Для более крупного заказа свяжитесь с нами в Telegram либо WhatsApp, цена рассчитывается индивидуально."
  },
  {
    id: 14,
    name: "Масло для духов",
    description: "Для подробного ознакомления с ассортиментом масел и актуальными ценами, пожалуйста, скачайте полный прайс-лист в формате PDF.",
    price: 25,
    type: "maslo",
    image: "/maslo-new.png",
  },
  {
    id: 15,
    name: "Парфюмерная основа",
    description: "Парфюмерная вода (IFRA стандарт) в канистре 10 литров. Идеально подходит для производства духов. Цена: от 10 л — 650₽ за литр, от 2 канистр — 620₽ за литр (6200₽ за канистру). От 400 л — индивидуальные условия. Свяжитесь с нами для лучшего предложения.",
    price: 650,
    type: "osnova",
    image: "/osnova.png",
    discountPrices: {
      10: 650,      // 1 канистра 10л
      20: 620,      // 2 канистры 20л
      400: "индивидуально" // nuo 400 litrų
    }
  }
  
];


function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id === parseInt(id));
  const [showMessage, setShowMessage] = useState(false);
  const [selectedQty, setSelectedQty] = useState(null);

  const handleGoBack = () => {
    if (product) {
      if (product.type === "flakon") {
        navigate("/flakony");
      } else if (product.type === "maslo") {
        navigate("/masla"); // TAISYTA: masla, ne maslo
      } else if (product.type === "osnova") {
        navigate("/parfyumeriya"); // TAISYTA: parfyumeriya, ne osnova
      } else {
        navigate("/");
      }
    } else {
      navigate(-1); // jeigu nėra produkto (pvz., tiesiog puslapyje), grįžtam atgal
    }
  };
  

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (product.type === "maslo") {
      cart.push({
        ...product,
        price: "индивидуально",
        quantity: 1,
      });
    } else if (product.discountPrices && selectedQty) {
      const price = product.discountPrices[selectedQty];
      cart.push({
        ...product,
        price: price,
        quantity: selectedQty,
      });
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setShowMessage(true);
  };

  if (!product)
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Продукт не найден</h2>
      </div>
    );

    return (
      <div className="container pt-5 pb-5 mt-md-5 position-relative">
        {showMessage && (
          <>
            {/* Fonas */}
            <div
              className="position-fixed top-0 start-0 w-100 h-100"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
            ></div>
    
            {/* Popup langas */}
            <div
              className="popup-message position-fixed top-50 start-50 translate-middle bg-white p-4 rounded-4 shadow-lg text-center"
              style={{ zIndex: 1050, minWidth: "320px" }}
            >
              <h5 className="mb-3 fw-bold text-success">Товар добавлен в корзину!</h5>
              <div className="popup-buttons d-flex justify-content-center gap-3 flex-wrap">
                <button
                  onClick={() => navigate("/cart")}
                  className="btn btn-success rounded-pill px-4"
                >
                  Перейти в корзину
                </button>
                <button
                  onClick={() => navigate("/flakony")}
                  className="btn btn-outline-success rounded-pill px-4"
                >
                  Продолжить покупки
                </button>
              </div>
            </div>
          </>
        )}
    
    <div className="row g-5 align-items-center mt-4">
  <div className="col-md-6 text-center">
    <img
      src={product.image}
      alt={product.name}
      className="img-fluid rounded shadow-sm product-image"
    />
  </div>



    
          <div className="col-md-6 mt-md-4 mt-lg-0">
            <h2 className="text-brown fw-bold mb-2">{product.name}</h2>
    
            {product.description && (
              <p className="text-muted mb-4">{product.description}</p>
            )}
    
            {product.type === "maslo" && (
              <a
                href="/price.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-warning d-inline-flex align-items-center gap-2 mb-3 px-4 py-2 rounded-pill fw-bold"
              >
                <i className="bi bi-file-earmark-pdf-fill"></i> Скачать прайс-лист
              </a>
            )}
    
            <div className="mb-3">
              {product.type === "maslo" ? (
                <p className="text-orange fw-bold fs-5 mb-1">
                  Цена согласовывается индивидуально
                </p>
              ) : (
                <p className="text-orange fw-bold fs-4 mb-1">
                  {product.price} ₽ {product.type === "osnova" && "за литр"}
                </p>
              )}
            </div>
    
            {product.discountPrices && (
              <div className="mb-4">
                <h5 className="text-brown fw-bold mb-3">Цены по количеству:</h5>
                <div className="d-flex flex-column gap-3">
                  {Object.entries(product.discountPrices).map(([qty, price]) => (
                    <div
                      key={qty}
                      className={`d-flex justify-content-between align-items-center p-4 rounded-4 shadow-sm price-card ${
                        selectedQty === qty ? "border border-success" : ""
                      }`}
                      style={{
                        background: "linear-gradient(135deg, #f9f6f2, #f3e9dd)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedQty(qty)}
                    >
                      <div className="text-brown fw-semibold fs-5">
                        от {qty} {product.type === "osnova" ? "л." : "шт."}
                      </div>
                      <div className="text-orange fw-bold fs-5 d-flex align-items-center gap-2">
                        {typeof price === "number" ? `${price} ₽` : price}
                        {selectedQty === qty && (
                          <i className="bi bi-check-circle-fill text-success"></i>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
    
            {product.additionalInfo && (
              <p className="text-muted mt-3">{product.additionalInfo}</p>
            )}
    
            <div className="d-flex justify-content-between align-items-center gap-3 mt-4 flex-wrap">
              {product.type !== "maslo" && (
                <button
                  onClick={handleAddToCart}
                  className="btn btn-orange px-4 py-2 rounded-pill fw-bold flex-grow-1"
                  disabled={product.discountPrices && !selectedQty}
                >
                  Добавить в корзину
                </button>
              )}
    
              {product.type === "maslo" && (
                <button
                  onClick={handleAddToCart}
                  className="btn btn-orange px-4 py-2 rounded-pill fw-bold flex-grow-1"
                >
                  Добавить в корзину для согласования
                </button>
              )}
    
              <button
                onClick={handleGoBack}
                className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-bold flex-grow-1"
              >
                Вернуться в каталог
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    
}

export default ProductPage;
