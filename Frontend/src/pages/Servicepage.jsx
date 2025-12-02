import React from "react";

export default function Servicepage() {
  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1 className="section-title">Our Services</h1>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        We offer a wide range of shutter and gate solutions with high-quality materials,
        advanced mechanisms, and professional installation.
      </p>

      <div className="services-grid">

        <div className="service-card">
          <h3>Rolling Shutter Manufacturing</h3>
          <p>Heavy-duty, long-lasting rolling shutters for commercial & industrial use.</p>
        </div>

        <div className="service-card">
          <h3>Automatic Sliding Gates</h3>
          <p>Motorized gates with remote, gear, and sensor-based automation.</p>
        </div>

        <div className="service-card">
          <h3>Automatic , Manual & Gear Shutters</h3>
          <p>Smooth, durable, and cost-efficient for shops & small businesses.</p>
        </div>

        <div className="service-card">
          <h3>Custom Pattern Designs</h3>
          <p>Design shutters & gates to match your building’s style.</p>
        </div>

        <div className="service-card">
          <h3>Maintenance & Repairs</h3>
          <p>Fast shutter repair and replacement services with reliable support.</p>
        </div>

      </div>
    </div>
  );
}
