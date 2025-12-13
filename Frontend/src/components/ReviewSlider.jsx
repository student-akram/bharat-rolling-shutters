import React, { useEffect, useState } from "react";
import { getApiBase, parseListResponse } from "../utils/apiHelpers";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Swiper modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// STATIC DEFAULT REVIEWS (Your existing ones)
const staticReviews = [
  {
    name: "Chanti",
    location: "Giddaluru",
    review: "Excellent shutter work! Smooth operation and very strong material.",
    rating: 5
  },
  {
    name: "Prasad Reddy",
    location: "Markapuram",
    review: "Installed an automatic gate. Perfect finishing & fast delivery.",
    rating: 5
  },
  {
    name: "DHANA LAKSHMI OIL AGENCIES",
    location: "Ganapavaram",
    review: "Best quality shutters. Service is very professional.",
    rating: 4
  },
  {
    name: "Kiran",
    location: "Nidumukkala",
    review: "Very satisfied with the shutter installation and support.",
    rating: 5
  }
];

export default function ReviewsSlider() {
  const [reviews, setReviews] = useState([]);

  // Fetch dynamic reviews from backend
  useEffect(() => {
    const API_BASE = getApiBase();
    fetch(`${API_BASE}/reviews/all`)
      .then(res => parseListResponse(res))
      .then(data => {
        // Convert backend data format into slider-compatible format
        const raw = data;
        const formattedDynamicReviews = raw.map(r => ({
          name: r.name,
          location: r.location,
          review: r.message || "No message provided",
          rating: r.rating
        }));

        // Combine static + dynamic reviews
        setReviews([...staticReviews, ...formattedDynamicReviews]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="review-slider-wrapper" style={{ marginTop: "50px", marginBottom: "50px" }}>
      <h2 className="section-title" style={{ textAlign: "center" }}>
        Customer Reviews
      </h2>

      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 2000 }}
        spaceBetween={40}
        slidesPerView={1}
        style={{ padding: "20px" }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={i}>
            <div
              className="review-card"
              style={{
                background: "#ffffff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderTop: "4px solid #0B2A55"
              }}
            >
              <h3 style={{ marginBottom: "5px", color: "#0B2A55" }}>
                {r.name || "Customer"}
              </h3>

              <p style={{ fontWeight: 500 }}>{r.location}</p>

              <p style={{ fontSize: "15px", marginTop: "10px", lineHeight: "1.6" }}>
                {r.review}
              </p>

              <p style={{ marginTop: "10px", color: "#FFD700" }}>
                {"⭐".repeat(r.rating)}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
