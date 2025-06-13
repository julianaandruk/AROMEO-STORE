import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>AROMEO — Парфюмерия, флаконы и масла оптом</title>
        <meta
          name="description"
          content="Качественная парфюмерная продукция и флаконы оптом от AROMEO. Доставка по всей России. Лучшее качество и выгодные цены!"
        />
        <meta
          property="og:title"
          content="AROMEO — Флаконы и парфюмерная основа оптом"
        />
        <meta
          property="og:description"
          content="Широкий ассортимент флаконов, масел и парфюмерной основы. Индивидуальный подход. Быстрая доставка по России."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <div className="hero-container">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>
              Добро пожаловать в <span className="brand">Aromeo</span>
            </h1>
            <p>
              Aromeo — это бренд, специализирующийся на продаже флаконов и
              парфюмерной воды высочайшего качества. Мы также являемся
              производителями духов, работаем напрямую с заводами и являемся
              прямыми дистрибьюторами, что позволяет нам предлагать продукцию,
              соответствующую самым строгим стандартам.
            </p>
            <div className="buttons">
              <Link to="/flakony" className="hero-btn hero-btn-primary">
                Флаконы
              </Link>
              <Link to="/masla" className="hero-btn hero-btn-primary">
                Масла
              </Link>
              <Link to="/parfyumeriya" className="hero-btn hero-btn-primary">
                Парфюмерная основа
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Naujas informacinis blokas apie tiekimą */}
      <section className="pt-5 pb-5 bg-sand text-brown">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-4">
            Aromeo — надёжный поставщик сырья для парфюмерии
          </h2>
          <p className="lead">
            Флаконы 3–20 мл, масла из Франции, Турции и Швейцарии, два вида
            парфюмерной воды — всё для тех, кто создаёт и продаёт ароматы.
          </p>
        </div>
      </section>

      {/* Kodėl renkasi mus – kortelė */}
      <section className="py-4">
  <div className="container d-flex justify-content-center">
    <div
      className="card shadow border-0 rounded-4 p-4"
      style={{
        maxWidth: "720px",
        backgroundColor: "#fdf7f0", // švelnesnis nei baltas
      }}
    >
      <h4 className="fw-bold text-center text-brown mb-4">Почему выбирают нас:</h4>
      <ul className="list-unstyled mb-0">
        <li className="mb-3 d-flex">
          <i className="bi bi-check-circle-fill me-3" style={{ color: "#5c4033", fontSize: "1.3rem" }}></i>
          <span>Чистое B2B — работаем только с производителями, студиями и маркетплейсами.</span>
        </li>
        <li className="mb-3 d-flex">
          <i className="bi bi-check-circle-fill me-3" style={{ color: "#5c4033", fontSize: "1.3rem" }}></i>
          <span>Широкий ассортимент: от флаконов до сырья — всё в одном месте.</span>
        </li>
        <li className="mb-3 d-flex">
          <i className="bi bi-check-circle-fill me-3" style={{ color: "#5c4033", fontSize: "1.3rem" }}></i>
          <span>Гибкий вход: от 100 единиц, без лишних условий.</span>
        </li>
        <li className="mb-3 d-flex">
          <i className="bi bi-check-circle-fill me-3" style={{ color: "#5c4033", fontSize: "1.3rem" }}></i>
          <span>Помогаем упаковать и продать: подбор, брендинг, быстрая отгрузка.</span>
        </li>
        <li className="d-flex">
          <i className="bi bi-check-circle-fill me-3" style={{ color: "#5c4033", fontSize: "1.3rem" }}></i>
          <span>Прямые поставки — никаких посредников, только проверенное качество.</span>
        </li>
      </ul>
    </div>
  </div>
</section>



      {/* Kontaktų mygtukai vietoje formos */}
      <section className="contact-buttons-section bg-sand text-center py-5">
  <h2 className="fw-bold text-brown mb-4">Связаться с нами</h2>
  <p className="lead mb-4">
    Вы можете написать нам напрямую через мессенджеры
  </p>
  <div className="d-flex justify-content-center gap-4 flex-wrap">
    <a
      href="https://wa.me/79898618898"
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-lg d-flex align-items-center gap-2 px-4 py-2 shadow rounded-pill whatsapp-btn"
    >
      <i className="bi bi-whatsapp" style={{ fontSize: "1.4rem" }}></i>
      Написать в WhatsApp
    </a>

    <a
      href="https://t.me/aromeo_info"
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-lg d-flex align-items-center gap-2 px-4 py-2 shadow rounded-pill telegram-btn"
    >
      <i className="bi bi-telegram" style={{ fontSize: "1.4rem" }}></i>
      Написать в Telegram
    </a>
  </div>
</section>


    </>
  );
}

export default Home;
