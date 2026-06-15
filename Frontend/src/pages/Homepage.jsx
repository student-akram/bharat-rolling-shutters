import React from "react";
import ReviewSlider from "../components/ReviewSlider";

export default function Homepage() {
  return (
    <main>

      {/* HERO BANNER */}
      <section className="hero" aria-label="Rolling Shutter Manufacturers in Andhra Pradesh">
        <h1 className="hero-title">
          Bharat Rolling Shutters & Engineering Works
        </h1>

        <p className="hero-sub">
          Trusted Rolling Shutter Manufacturers & Automatic Gate Specialists Since 1998
        </p>
      </section>

      <div className="container">

        {/* BUSINESS STORY */}
        <section aria-labelledby="our-journey">
          <h2 id="our-journey" className="section-title">
            Our Journey
          </h2>

          <p className="story-text">
            For over <strong>25 years</strong>, <strong>Bharat Rolling Shutters & Engineering Works</strong> has been a trusted name
            in <strong>rolling shutter manufacturing, installation, and automatic gate solutions</strong> across
            <strong> Andhra Pradesh and Telangana</strong>.
            What began in 1998 as a small workshop has today grown into a reliable and respected brand,
            serving thousands of satisfied customers.
          </p>

          <p className="story-text">
            We specialize in <strong>shop shutters, industrial shutters, godown shutters, and automatic gates</strong>,
            delivering durable and secure solutions to towns such as{" "}
            <strong>
              Giddaluru, Ganapavaram, Markapuram, Yerragondapalem, Vinukonda, Darsi, Podili,
              Kanigiri, Macherla, Bapatla, Chirala, Narasaraopeta, Tenali, Ongole,
              Tadipatri, Nellore–Krishnapatnam Port, Tripurantakam, Chilakaluripeta,
              Machilipatnam, Tiruvuru, Tadepalligudem, Jaggayyapeta, Eluru, Palakollu,
              Amalapuram, Rajahmundry, Nidumukkala
            </strong>{" "}
            and surrounding regions.
          </p>

          <p className="story-text">
            Every project—whether a small shop shutter or a heavy-duty industrial installation—is completed using
            premium materials, expert workmanship, and reliable after-service support.
          </p>

          <p className="story-text">
            <strong>Bharat Rolling Shutters — Where Quality Meets Trust.</strong>
          </p>
        </section>

        {/* WHY CHOOSE US */}
        <section aria-labelledby="why-choose-us">
          <h2 id="why-choose-us" className="section-title">
            Why Customers Trust Us
          </h2>

          <ul className="trust-list">
            <li>25+ Years of Rolling Shutter Industry Experience</li>
            <li>Strong, Weather-Proof & Long-Lasting Materials</li>
            <li>Fast Installation & Reliable Maintenance Support</li>
            <li>Professional Workmanship with Verified Customer Reviews</li>
            <li>Thousands of Successful Installations Across Andhra Pradesh</li>
          </ul>
        </section>

        {/* CUSTOMER REVIEWS */}
        <section aria-label="Customer Reviews">
          <ReviewSlider />
        </section>

      </div>
    </main>
  );
}
