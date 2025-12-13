import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getApiBase, parseListResponse } from "../utils/apiHelpers.js";

const staticReviews = [
  { name: "Chanti", location: "Giddaluru", review: "Excellent shutter work!", rating: 5 },
  { name: "Prasad Reddy", location: "Markapuram", review: "Perfect finishing & fast delivery.", rating: 5 },
  { name: "DHANA LAKSHMI OIL AGENCIES", location: "Ganapavaram", review: "Very professional service.", rating: 4 },
  { name: "Kiran", location: "Nidumukkala", review: "Very satisfied with installation.", rating: 5 }
];

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1
  }
};

/* ✅ Proper button group (library-supported) */
const ButtonGroup = ({ next, previous }) => {
  return (
    <>
      <button className="carousel-btn left" onClick={previous} aria-label="Previous">
        ‹
      </button>
      <button className="carousel-btn right" onClick={next} aria-label="Next">
        ›
      </button>
    </>
  );
};

export default function ReviewsSlider() {
  const [reviews, setReviews] = useState(staticReviews);

  useEffect(() => {
    const API_BASE = getApiBase();
    fetch(`${API_BASE}/reviews/all`)
      .then(res => parseListResponse(res))
      .then(data => {
        const raw = Array.isArray(data) ? data : [];
        setReviews([...staticReviews, ...raw]);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="review-slider-wrapper">
      <h2 className="section-title" style={{ textAlign: "center" }}>
        Customer Reviews
      </h2>

      <div className="carousel-shell">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={2500}
          arrows={false}                 // disable default arrows
          renderButtonGroupOutside
          customButtonGroup={<ButtonGroup />}
          partialVisible={false}
          centerMode={false}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {reviews.map((r, i) => (
            <div className="review-card" key={i}>
              <h3>{r.name}</h3>
              <p>{r.location}</p>
              <p>{r.review || "No message provided"}</p>
              <p>{"⭐".repeat(Number(r.rating) || 0)}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
