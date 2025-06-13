import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";


function Footer() {
    return (
      <footer className="custom-footer py-4 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0">© 2025 Aromeo. Все права защищены.</p>
            </div>
  
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-1">Контакты: +79898618898</p>
              <p className="mb-1">Email: infoaromeo@gmail.com</p>
              <p className="mb-3">Адрес: Москва, Россия</p>
  
              {/* Mygtukai į Telegram ir WhatsApp */}
              <div className="d-flex justify-content-center justify-content-md-end gap-2">
              <a
                href="https://t.me/aromeo_info"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-telegram d-flex align-items-center gap-2"
                title="Написать в Telegram"
            >
            <FaTelegramPlane size={18} />
            Написать в Telegram
            </a>

            <a
                href="https://wa.me/37064855934"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp d-flex align-items-center gap-2"
                title="Написать в WhatsApp"
            >
            <FaWhatsapp size={18} />
            Написать в WhatsApp
            </a>
              </div>
  
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  