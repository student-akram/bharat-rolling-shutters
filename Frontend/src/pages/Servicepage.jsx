import React from "react";

export default function Servicepage() {
  return (
    <main className="container service-page">
      <h1 className="section-title">
        Rolling Shutter & Automatic Gate Services
      </h1>

      <p className="service-intro">
        Bharat Shutters & Engineering Works provides professional rolling shutter
        manufacturing, automatic gate installation, and shutter repair services
        across Andhra Pradesh and Telangana. We use high-quality materials,
        advanced mechanisms, and expert workmanship to deliver long-lasting solutions.
      </p>

      <div className="services-grid">

        <div className="service-card">
          <h3>Rolling Shutter Manufacturing</h3>
          <p>
            Heavy-duty rolling shutters designed for shops, warehouses, godowns,
            and industrial buildings. Built for strength, security, and durability.
          </p>
        </div>

        <div className="service-card">
          <h3>Automatic Sliding Gates</h3>
          <p>
            Motorized sliding gates with remote control, gear systems, and
            sensor-based automation for residential and commercial properties.
          </p>
        </div>

        <div className="service-card">
          <h3>Automatic, Manual & Gear Shutters</h3>
          <p>
            Smooth-operating shutters available in automatic, manual, and gear
            mechanisms—ideal for shops, showrooms, and small businesses.
          </p>
        </div>

        <div className="service-card">
          <h3>Custom Pattern & Design Shutters</h3>
          <p>
            Custom-designed shutters and gates tailored to match your building’s
            architecture, branding, and security requirements.
          </p>
        </div>

        <div className="service-card">
          <h3>Shutter Maintenance & Repairs</h3>
          <p>
            Fast and reliable shutter repair, maintenance, and part replacement
            services to keep your shutters operating safely and smoothly.
          </p>
        </div>

      </div>
    </main>
  );
}
