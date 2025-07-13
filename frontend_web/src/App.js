import React, { useState, useEffect } from "react";
import "./App.css";

// Demo image data
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", alt: "Nature 1" },
  { src: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=600", alt: "Nature 2" },
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600", alt: "Workspace" },
  { src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600", alt: "Teamwork" },
  { src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600", alt: "Inspiration" }
];

// PUBLIC_INTERFACE
function App() {
  // Theme management
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // Image gallery state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  // PUBLIC_INTERFACE
  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // PUBLIC_INTERFACE
  function handleFormSubmit(e) {
    e.preventDefault();
    // In real app, send data to backend/API
    setFormStatus("Thank you for reaching out!");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setFormStatus(""), 3000);
  }

  // PUBLIC_INTERFACE
  function openModal(idx) {
    setActiveIndex(idx);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  // PUBLIC_INTERFACE
  function closeModal() {
    setModalOpen(false);
    document.body.style.overflow = "";
  }

  // PUBLIC_INTERFACE
  function nextImage() {
    setActiveIndex((idx) => (idx + 1) % galleryImages.length);
  }
  // PUBLIC_INTERFACE
  function prevImage() {
    setActiveIndex((idx) => (idx - 1 + galleryImages.length) % galleryImages.length);
  }

  return (
    <div className="App">
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      {/* HERO SECTION */}
      <section className="section hero-section">
        <div className="container">
          <h1 className="hero-title">Welcome to Stellar Innovations</h1>
          <p className="hero-desc">
            Empowering businesses with creative technology solutions. Explore our work and get to know our passionate team.
          </p>
          <a href="#contact" className="btn-primary hero-btn">Contact Us</a>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="section gallery-section" id="gallery">
        <div className="container">
          <h2 className="section-title">Showcase Gallery</h2>
          <div className="gallery-grid">
            {galleryImages.map((img, idx) => (
              <div
                key={img.src}
                className="gallery-thumb"
                tabIndex={0}
                aria-label={`View ${img.alt}`}
                onClick={() => openModal(idx)}
                onKeyDown={(e) => e.key === "Enter" && openModal(idx)}
                style={{ backgroundImage: `url('${img.src}')` }}
              >
                <div className="overlay">
                  <span>View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal */}
        {modalOpen && (
          <div className="modal-bg" onClick={closeModal} tabIndex={-1} aria-modal="true" role="dialog">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={galleryImages[activeIndex].src} alt={galleryImages[activeIndex].alt} />
              <button className="modal-close" onClick={closeModal} aria-label="Close">&times;</button>
              <button className="modal-prev" onClick={prevImage} aria-label="Previous image">&#8592;</button>
              <button className="modal-next" onClick={nextImage} aria-label="Next image">&#8594;</button>
            </div>
          </div>
        )}
      </section>

      {/* ABOUT SECTION */}
      <section className="section about-section" id="about">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="about-text">
            Stellar Innovations specializes in modern digital products and design. With expertise in web development, mobile apps, and innovative UI/UX, our team delivers impactful solutions for clients in diverse industries.
            Our philosophy: blend creativity with technical excellence, keeping a minimal and user-first approach.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <form className="contact-form" onSubmit={handleFormSubmit} autoComplete="off">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleFormChange}
              required
              aria-label="Your Name"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleFormChange}
              required
              aria-label="Your Email"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleFormChange}
              required
              aria-label="Your Message"
              rows={5}
            />
            <button type="submit" className="btn-primary">
              Send Message
            </button>
            {formStatus && <p className="form-status">{formStatus}</p>}
          </form>
        </div>
      </section>

      {/* Minimalistic Footer */}
      <footer className="footer">
        <div className="container">
          <small>© {new Date().getFullYear()} Stellar Innovations. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
