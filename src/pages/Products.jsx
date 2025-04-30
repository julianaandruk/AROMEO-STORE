import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const allProducts = [
  {
    id: 1,
    name: "Флакон 3 мл резьбовой",
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
  },
  {
    id: 2,
    name: "Флакон 5 мл резьбовой",
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
  },
  {
    id: 3,
    name: "Флакон 10 мл резьбовой",
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
  },
  {
    id: 4,
    name: "Флакон 10 мл резьбовой",
    price: 60,
    type: "flakon",
    image: "/10ml-new.png",
    discountPrices: {
      25: 60,
      50: 55,
      100: 50,
    },
  },
  {
    id: 5,
    name: "Флакон 15 мл резьбовой",
    price: 70,
    type: "flakon",
    image: "/15ml-new.png",
    discountPrices: {
      25: 70,
      50: 65,
      100: 60,
    },
  },
  {
    id: 6,
    name: "Флакон 20 мл резьбовой",
    price: 65,
    type: "flakon",
    image: "/20ml.png",
    discountPrices: {
      10: 65,
      25: 60,
      50: 55,
      100: 50,
    },
  },
  {
    id: 7,
    name: "Флакон 30 мл резьбовой",
    price: 90,
    type: "flakon",
    image: "/30ml-plonesnis-new.png",
    discountPrices: {
      10: 90,
      25: 85,
      50: 80,
      100: 75,
    },
  },
  {
    id: 8,
    name: "Флакон 30 мл резьбовой (квадр. золото, серебро)",
    price: 90,
    type: "flakon",
    image: "/30ml.png",
    discountPrices: {
      10: 90,
      25: 85,
      50: 80,
      100: 75,
    },
  },
  {
    id: 9,
    name: "Флакон 30 мл штамповка",
    price: 105,
    type: "flakon",
    image: "/30ml-new.png",
    discountPrices: {
      10: 105,
      25: 100,
      50: 95,
      100: 85,
    },
  },
  {
    id: 10,
    name: "Флакон 50 мл штамповка",
    price: 110,
    type: "flakon",
    image: "/50ml-new.png",
    discountPrices: {
      10: 110,
      25: 105,
      50: 100,
      100: 90,
    },
  },
  {
    id: 11,
    name: "Флакон 100 мл штамповка",
    price: 175,
    type: "flakon",
    image: "/100ml-new.png",
    discountPrices: {
      5: 175,
      25: 165,
      50: 155,
    },
  },
  {
    id: 12,
    name: "Авто флакон 7 мл",
    price: 30,
    type: "flakon",
    image: "/7ml-kvadrat.png",
    discountPrices: {
      50: 30,
      480: 27,
      2400: 25,
    },
  },
  {
    id: 13,
    name: "Авто флакон 6 мл",
    price: 25,
    type: "flakon",
    image: "/6ml-kruglyj.png",
    discountPrices: {
      50: 25,
      480: 22,
      2400: 20,
    },
  },
  {
    id: 14,
    name: "Масло для духов",
    price: 0,
    type: "maslo",
    image: "/maslo-new.png",
  },
  {
    id: 15,
    name: "Парфюмерная основа",
    price: 650,
    type: "osnova",
    image: "/osnova.png",
  }
];

function Products({ type }) {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setFilter("all"); // kai pasikeičia puslapio tipas, išvalom filtrą
  }, [type]);

  const filteredProducts = allProducts.filter((p) => {
    if (p.type !== type) return false;

    if (filter === "rezbovye") {
      return p.name.toLowerCase().includes("резьбовой");
    }
    if (filter === "stampovka") {
      return p.name.toLowerCase().includes("штамповка");
    }
    if (filter === "avtoflakony") {
      return p.name.toLowerCase().includes("авто");
    }
    return true;
  });

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину");
  };

  // ✅ Dinaminiai SEO tekstai pagal puslapį
  const pageTitles = {
    flakon: "Купить флаконы для духов оптом — AROMEO",
    maslo: "Купить масла для духов оптом — AROMEO",
    osnova: "Парфюмерная основа оптом — AROMEO",
  };

  const pageDescriptions = {
    flakon: "Флаконы для духов оптом от AROMEO. Большой выбор: резьбовые, штамповка, автофлаконы. Качество и доставка по России.",
    maslo: "Высококачественные масла для создания парфюмерии. Оптовые цены и быстрая доставка от AROMEO.",
    osnova: "Парфюмерная вода (основа) по стандарту IFRA для создания духов. Заказать оптом в компании AROMEO.",
  };

  return (
    <div className="container py-5">
      {/* SEO Helmet */}
      <Helmet>
        <title>{pageTitles[type]}</title>
        <meta name="description" content={pageDescriptions[type]} />
        <meta property="og:title" content={pageTitles[type]} />
        <meta property="og:description" content={pageDescriptions[type]} />
      </Helmet>

      <h2 className="text-center text-brown mt-5 mb-5 display-5 fw-bold">
        {type === "flakon" && "Флаконы"}
        {type === "maslo" && "Масла"}
        {type === "osnova" && "Парфюмерная основа"}
      </h2>

      {/* Kategorijų mygtukai tik flakonams */}
      {type === "flakon" && (
        <div className="d-flex justify-content-center mb-5 gap-3 flex-wrap">
          <button onClick={() => setFilter("all")} className={`category-btn ${filter === "all" ? "active" : ""}`}>
            Все
          </button>
          <button onClick={() => setFilter("rezbovye")} className={`category-btn ${filter === "rezbovye" ? "active" : ""}`}>
            Резьба
          </button>
          <button onClick={() => setFilter("stampovka")} className={`category-btn ${filter === "stampovka" ? "active" : ""}`}>
            Штамповка
          </button>
          <button onClick={() => setFilter("avtoflakony")} className={`category-btn ${filter === "avtoflakony" ? "active" : ""}`}>
            Авто флаконы
          </button>
        </div>
      )}

      {/* Produktų kortelės */}
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0 product-card">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top rounded-top bg-white"
                style={{ height: "320px", objectFit: "contain", objectPosition: "center" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-brown fw-semibold mb-2">{product.name}</h5>
                <p className="card-text text-orange fw-bold mb-3">
                  {product.type === "maslo"
                    ? "Индивидуальная цена"
                    : `${product.price} ₽ ${product.type === "osnova" ? "за литр" : ""}`}
                </p>
                
                <Link to={`/product/${product.id}`} className="btn btn-sm btn-orange">
                  Подробнее
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;