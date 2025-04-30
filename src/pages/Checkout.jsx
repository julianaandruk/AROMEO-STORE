import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const onlyLetters = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
      setForm((prev) => ({ ...prev, [name]: onlyLetters }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Введите имя";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    }

    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = "Введите номер WhatsApp";
    }

    if (!form.email.trim()) {
      newErrors.email = "Введите Email";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Введите корректный Email";
    }

    if (!form.address.trim()) {
      newErrors.address = "Введите адрес доставки";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    localStorage.setItem("orderInfo", JSON.stringify(form));
    navigate("/confirm");
  };

  return (
    <section className="form-section mt-7">
      <div className="container">
        <div className="form-card mx-auto mt-5 p-4 p-md-5">
          <h2 className="text-center text-brown fw-bold mb-4">ОФОРМЛЕНИЕ ЗАКАЗА</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Имя *</label>
              <input
                type="text"
                name="name"
                className="form-control rounded-3 border-brown"
                placeholder="Ваше имя"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">Телефон *</label>
              <div className="phone-input-group">
                <PhoneInput
                  country={'ru'}
                  preferredCountries={['ru', 'kz', 'by']}
                  value={form.phone}
                  onChange={(phone) => setForm(prev => ({ ...prev, phone }))}
                  inputProps={{ name: 'phone' }}
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
                  country={'ru'}
                  preferredCountries={['ru', 'kz', 'by']}
                  value={form.whatsapp}
                  onChange={(whatsapp) => setForm(prev => ({ ...prev, whatsapp }))}
                  inputProps={{ name: 'whatsapp' }}
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
                className="form-control rounded-3 border-brown"
                placeholder="email@example.ru"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">Адрес *</label>
              <input
                type="text"
                name="address"
                className="form-control rounded-3 border-brown"
                placeholder="Ваш адрес"
                value={form.address}
                onChange={handleChange}
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>

            <div className="mb-4">
              <label className="form-label">Комментарий</label>
              <textarea
                name="comment"
                className="form-control rounded-3 border-brown"
                rows="2"
                placeholder="Комментарий к заказу"
                value={form.comment}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="text-center">
              <button type="submit" className="btn-submit">
                Подтвердить
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
