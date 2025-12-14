import React, { useState } from "react";

export default function Contactpage() {
  
  // Form states
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

    const adminNumber = "+919398475175"; // YOUR BUSINESS WHATSAPP NUMBER

    const text =
      `*New Customer Inquiry*\n\n` +
      `*Name:* ${name}\n` +
      (email ? `*Email:* ${email}\n` : "") +
      `*Phone:* ${phone}\n` +
      (message ? `*Message:* ${message}` : "");

    const url = `https://wa.me/${9398475175}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>

      {/* PAGE TITLE */}
      <h1 className="section-title" style={{ marginBottom: "20px" }}>
        Contact Us
      </h1>

      <p style={{ fontSize: "18px", maxWidth: "700px" }}>
        Have a question? Need a shutter installation or gate automation?
        We are here to assist you anytime.  
        Reach out to us using the details below or send a direct message.
      </p>

      {/* CONTACT GRID */}
      <div className="contact-grid">

        {/* LEFT SIDE — Contact Info */}
        <div>
          <h2 className="section-title">Get in Touch</h2>

          <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
            <strong>Phone:</strong> <br />
            <a href="tel:+919959813514" style={{ color: "#0B2A55", fontWeight: "600" }}>
              +91 9959813514
            </a>
            <br /><br />

            <strong>WhatsApp:</strong> <br />
            <a 
              href="https://wa.me/919398475175"
              target="_blank"
              style={{ color: "#0B2A55", fontWeight: "600" }}
            >
              Chat on WhatsApp
            </a>
            <br /><br />

            <strong>Email:</strong> <br />
            <a href="mailto:khasimbharat111@gmail.com" style={{ color: "#0B2A55" }}>
              khasimbharat111@gmail.com
            </a>
            <br /><br />

            <strong>Office Address:</strong> <br />
            Bharat Rolling Shutters & Engineering Works <br />
            Jani Nityananda nagar 1 line Shop No-2 Ponnur Road (522003) <br />
            Guntur, Andhra Pradesh
          </p>
        </div>

        {/* RIGHT SIDE — WhatsApp Form */}
        <div>
          <h2 className="section-title">Send a Message</h2>

          <form 
            onSubmit={sendToWhatsApp}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              placeholder="Your Name"
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
              type="text"
              placeholder="Phone Number"
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
            ></textarea>

            <button
              type="submit"
              className="msg-btn"
            >
              Send on WhatsApp
            </button>
          </form>
        </div>

      </div>
      {/* GOOGLE MAP */}
          <div className = "map-container">
            <iframe
              title="map"
              src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.001521535912!2d80.467234274604!3d16.268881834063187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a0b58a2fcd90d%3A0xb2bd6421d1315263!2sBHARAT%20ROLLING%20SHUTTERS!5e1!3m2!1sen!2sin!4v1765705843843!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
    </div>
  );
}
