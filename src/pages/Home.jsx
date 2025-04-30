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

      {/* ... hero section ir "О нас" praleidžiam ... */}

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
