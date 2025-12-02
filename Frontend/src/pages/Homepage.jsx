import React from "react";
import ReviewSlider from "../components/ReviewSlider";


export default function Homepage() {
  return (
    <div>

      {/* HERO BANNER */}
      <section
        style={{
          padding: "150px 20px",
          background: `
            linear-gradient(rgba(11,42,85,0.85), rgba(11,42,85,0.85)),
            url('/path-to-your-image.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "15px",
            fontWeight: "700"
          }}
        >
          Bharat Rolling Shutters & Engineering Works
        </h1>

        <p style={{ fontSize: "22px", opacity: 0.92 }}>
          Trusted Shutter Manufacturers & Automatic Gate Specialists Since 1998
        </p>
      </section>

      <div className="container">

        {/* BUSINESS STORY */}
        <section>
          <h2 className="section-title">Our Journey</h2>
          <p style={{ lineHeight: "1.7", fontSize: "18px" }}>

            For over <strong>25 years</strong>, <strong>Bharat Rolling Shutters</strong> has been a trusted name 
            in shutter manufacturing, installation, and automatic gate solutions across Andhra Pradesh and Telangana. 
            What began in 1998 as a small workshop has today grown into a reliable and respected brand, serving 
            thousands of happy customers.

            <br /><br />

            We take pride in delivering strong, long-lasting, and secure shutter solutions to a wide range of towns, including 
            <strong>
              {" "}
              Giddaluru, Ganapavaram, Markapuram, Yerragondapalem, Vinukonda, Darsi, Podili, Kanigiri, 
              Macherla, Bapatla, Chirala, Narasaraopeta, Tenali, Ongole, Tadipatri, 
              Nellore–Krishnapatnam Port, Tripurantakam, Chilakaluripeta, Machilipatnam, 
              Tiruvuru, Tadepalligudem, Jaggayyapeta, Eluru, Palakollu, Amalapuram, 
              Rajahmundry, Nidumukkala
            </strong> 
            {" "}and many more surrounding regions.

            <br /><br />

            Every project—whether it’s a small shop shutter or a heavy-duty industrial gate—is delivered with 
            premium materials, expert installation, and complete trust. Our customers choose us for honesty, 
            timely service, durable workmanship, and reliable after-service support.

            <br /><br />

            <strong>Bharat Rolling Shutters — Where Quality Meets Trust.</strong>
          </p>
        </section>

        {/* WHY CHOOSE US */}
        <section>
          <h2 className="section-title">Why Customers Trust Us</h2>

          <ul style={{ lineHeight: "1.9", fontSize: "18px" }}>
            <li>25+ Years of Industrial Experience</li>
            <li>Strong, Long-Lasting & Weather-Proof Materials</li>
            <li>Fast Installation & Reliable Maintenance Support</li>
            <li>Professional Workmanship with Trusted Reviews</li>
            <li>Thousands of Successful Installations</li>
          </ul>
        </section>
        <ReviewSlider />


        

         

      </div>
    </div>
  );
}
