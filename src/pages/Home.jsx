import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Helmet } from "react-helmet";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    description: "",
    comment: "",
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const successRef = useRef(null);

  useEffect(() => {
    if (success) {
      successRef.current?.scrollIntoView({ behavior: "smooth" });
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Введите номер WhatsApp";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Введите Email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный Email";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Введите описание заказа";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await fetch("https://aromeo-backend.onrender.com/api/send-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          whatsapp: "",
          email: "",
          description: "",
          comment: "",
        });
      } else {
        alert("Ошибка при отправке формы");
      }
    } catch (err) {
      console.error("Ошибка при отправке формы:", err);
      alert("Ошибка соединения с сервером");
    }
  };

  return (
    <>
      <Helmet>
        <title>AROMEO — Парфюмерия, флаконы и масла оптом</title>
        <meta name="description" content="Качественная парфюмерная продукция и флаконы оптом от AROMEO. Доставка по всей России. Лучшее качество и выгодные цены!" />
        <meta property="og:title" content="AROMEO — Флаконы и парфюмерная основа оптом" />
        <meta property="og:description" content="Широкий ассортимент флаконов, масел и парфюмерной основы. Индивидуальный подход. Быстрая доставка по России." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="hero-container">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Добро пожаловать в <span className="brand">Aromeo</span></h1>
            <p>
            Aromeo — это бренд, специализирующийся на продаже флаконов 
            и парфюмерной воды высочайшего качества. Мы также являемся производителями духов,
            работаем напрямую с заводами и являемся прямыми дистрибьюторами, 
            что позволяет нам предлагать продукцию, соответствующую самым строгим стандартам.
            </p>
            <div className="buttons">
  <Link to="/flakony" className="hero-btn hero-btn-primary">Флаконы</Link>
  
  <div className="hero-btn-outline-group">
    <Link to="/masla" className="hero-btn hero-btn-outline">Масла</Link>
    <Link to="/parfyumeriya" className="hero-btn hero-btn-outline">Парфюмерная основа</Link>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Apie parduotuvę */}
      <section className="pt-5 pb-5 bg-sand text-brown">
  <div className="container text-center">
    <h2 className="display-5 fw-bold mb-5">О нас</h2>

    <p className="lead mb-4">
      <span className="fw-semibold">Aromeo</span> более 5 лет на рынке и сотрудничает с топовыми селлерами на Wildberries и Ozon.
      Мы обслуживаем клиентов по всей России, и наша продукция уже завоевала доверие тысяч покупателей.
    </p>

    <p className="lead mb-5">
      Мы гордимся тем, что всегда поддерживаем высокий уровень качества и сервиса.
    </p>

    <h4 className="fw-bold mb-4">Почему стоит выбрать Aromeo?</h4>

    {/* Sąrašas su ryškesnėmis varnelėmis, bet viskas centruota */}
    <div className="d-flex justify-content-center mb-5">
      <ul className="list-unstyled text-center" style={{ maxWidth: "600px" }}>
        <li className="mb-3 d-flex flex-column align-items-center">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-patch-check-fill" style={{ color: "#5c4033", fontSize: "1.8rem" }}></i>
            <span className="lead">Лучшее качество флаконов и парфюмерной воды.</span>
          </div>
        </li>
        <li className="mb-3 d-flex flex-column align-items-center">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-patch-check-fill" style={{ color: "#5c4033", fontSize: "1.8rem" }}></i>
            <span className="lead">Прямое сотрудничество с производителями — контроль качества.</span>
          </div>
        </li>
        <li className="mb-3 d-flex flex-column align-items-center">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-patch-check-fill" style={{ color: "#5c4033", fontSize: "1.8rem" }}></i>
            <span className="lead">Индивидуальный подход к каждому клиенту.</span>
          </div>
        </li>
        <li className="mb-3 d-flex flex-column align-items-center">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-patch-check-fill" style={{ color: "#5c4033", fontSize: "1.8rem" }}></i>
            <span className="lead">Доступные цены при высоком качестве.</span>
          </div>
        </li>
      </ul>
    </div>

    <p className="lead">
      Независимо от того, ищете ли вы идеальные флаконы для вашего парфюма
      или хотите создать уникальную композицию — мы предлагаем широкий ассортимент и гарантируем полное удовлетворение!
      Сделайте правильный выбор — выберите <span className="fw-semibold">Aromeo</span>, и мы позаботимся о каждой детали!
    </p>
  </div>
</section>


      {/* Užsakymo forma */}
      <section className="form-section">
        <div className="container">
          <div className="form-card mx-auto p-4 p-md-5">
            <h2 className="text-center text-brown fw-bold mb-4">ОСТАВИТЬ ЗАЯВКУ</h2>
            <p className="text-center mb-4">Заполните форму и наш менеджер свяжется с вами</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Имя *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control rounded-3 border-brown"
                  placeholder="Ваше имя"
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Телефон *</label>
                <div className="phone-input-group">
                  <PhoneInput
                    country="ru"
                    preferredCountries={["ru", "kz", "by"]}
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value })}
                    containerClass="w-100"
                    inputClass="form-control"
                    dropdownStyle={{ zIndex: 9999 }}
                  />
                </div>
                {errors.phone && <small className="text-danger">{errors.phone}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">WhatsApp *</label>
                <div className="phone-input-group">
                  <PhoneInput
                    country="ru"
                    preferredCountries={["ru", "kz", "by"]}
                    value={formData.whatsapp}
                    onChange={(value) => setFormData({ ...formData, whatsapp: value })}
                    containerClass="w-100"
                    inputClass="form-control"
                    dropdownStyle={{ zIndex: 9999 }}
                  />
                </div>
                {errors.whatsapp && <small className="text-danger">{errors.whatsapp}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control rounded-3 border-brown"
                  placeholder="email@example.ru"
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Описание заказа *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control rounded-3 border-brown"
                  rows="3"
                ></textarea>
                {errors.description && <small className="text-danger">{errors.description}</small>}
              </div>

              <div className="mb-4">
                <label className="form-label">Комментарии к заказу</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="form-control rounded-3 border-brown"
                  rows="2"
                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn-submit">
                  Отправить
                </button>
              </div>

              {success && (
                <div ref={successRef} className="alert alert-success mt-4 text-center">
                  Заявка успешно отправлена. Мы скоро свяжемся с вами.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
