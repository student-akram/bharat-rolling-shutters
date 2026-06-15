import React, { useState } from "react";

export default function Contactpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendToWhatsApp = (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please enter your Name and Phone Number");
      return;
    }

    const text =
      `New Customer Inquiry\n\n` +
      `Name: ${name}\n` +
      (email ? `Email: ${email}\n` : "") +
      `Phone: ${phone}\n` +
      (message ? `Message: ${message}` : "");

    window.open(
      `https://wa.me/919398475175?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <main className="container contact-page">

      {/* PAGE HEADER */}
      <header className="contact-header">
        <h1 className="section-title">
          Contact Bharat Rolling Shutters & Engineering Works
        </h1>
        <p className="contact-intro">
          Looking for rolling shutter installation, automatic gate services, or
          shutter repairs in Andhra Pradesh? Get in touch with us today.
        </p>
      </header>

      {/* CONTACT GRID */}
      <section className="contact-grid">

        {/* CONTACT DETAILS */}
        <address className="contact-details">
          <h2 className="section-title">Get in Touch</h2>

          <p>
            <strong>Phone:</strong><br />
            <a href="tel:+919959813514">+91 99598 13514</a>
          </p>

          <p>
            <strong>WhatsApp:</strong><br />
            <a href="https://wa.me/919398475175" target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </p>

          <p>
            <strong>Email:</strong><br />
            <a href="mailto:khasimbharat111@gmail.com">
              khasimbharat111@gmail.com
            </a>
          </p>

          <p>
            <strong>Office Address:</strong><br />
            Bharat Rolling Shutters & Engineering Works<br />
            Jani Nityananda Nagar, Shop No-2<br />
            Ponnur Road, Guntur – 522003<br />
            Andhra Pradesh, India
          </p>
        </address>

        {/* CONTACT FORM */}
        <div className="contact-form">
          <h2 className="section-title">Send a Message</h2>

          <form onSubmit={sendToWhatsApp} className="form-stack">
            <input
              type="text"
              placeholder="Your Name *"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Your Email (optional)"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number *"
              className="input-box"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <textarea
              rows="5"
              placeholder="Your Message (optional)"
              className="input-box"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="msg-btn">
              Send on WhatsApp
            </button>
          </form>
        </div>

      </section>

      {/* MAP */}
      <section className="map-container" aria-label="Office location map">
        <iframe
          title="Bharat Rolling Shutters Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.001521535912!2d80.467234274604!3d16.268881834063187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a0b58a2fcd90d%3A0xb2bd6421d1315263!2sBHARAT%20ROLLING%20SHUTTERS!5e1!3m2!1sen!2sin!4v1765705843843!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen
        />
      </section>

    </main>
  );
}
