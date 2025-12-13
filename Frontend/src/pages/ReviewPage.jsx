import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function ReviewPage() {
  const navigate = useNavigate();

  const [media, setMedia] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [count, setCount] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.API_BASE_URL || '';
    fetch(`${API_BASE}/media/all`)
      .then(async (res) => {
        // Defensive parsing: backend may return either raw array or an object wrapper
        // Example valid responses:
        // 1) [ { ... }, { ... } ]
        // 2) { success: true, media: [ ... ] }
        // 3) { success: true, data: [ ... ] }
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Media fetch failed: ${res.status} ${res.statusText} - ${txt}`);
        }
        const data = await res.json().catch(() => null);
        return data;
      })
      .then((data) => {
        if (!data) {
          setMedia([]);
          return;
        }

        // normalize to an array of media objects
        let items = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (Array.isArray(data.media)) {
          items = data.media;
        } else if (Array.isArray(data.data)) {
          items = data.data;
        } else if (Array.isArray(data.reviews)) {
          // if we accidentally received the reviews endpoint, ignore (or transform)
          items = data.reviews; // optional: you could map to UI shape if desired
        } else {
          console.warn("Unexpected media / reviews API response shape", data);
        }

        setMedia(items);
      })
      .catch(err => console.log("Media Fetch Error:", err));
  }, []);

  const submitReview = async () => {
    if (!name || !location || !type || !count || rating === 0) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.API_BASE_URL || '';
      const response = await fetch(`${API_BASE}/reviews/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          location,
          type,
          count: Number(count),
          rating,
          message
        })
      });

      const data = await response.json();

      if (response.ok && (data.success || data.review)) {
        toast.success("Review submitted successfully!");

        setShowForm(false);

        setTimeout(() => {
          navigate("/");
        }, 1200);
      } else {
        toast.error("Failed to submit review");
      }

    } catch (error) {
      toast.error("Backend error occurred");
      console.log(error);
    }
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Our Completed Projects</h1>
      <p style={subtitleStyle}>Photos and videos of shutters installed across AP</p>

      <button
        onClick={() => setShowForm(true)}
        style={reviewButton}
      >
        Write a Review
      </button>

      {/* ----------------------- PHOTO SWIPER ----------------------- */}
      <h2 style={sectionTitle}>Project Photos</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        style={{ padding: "20px", maxWidth: "1000px" }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {media.filter(item => item.type === "photo").map((item, index) => (
          <SwiperSlide key={index}>
            <div style={cardStyle}>
              <img src={item.url} style={mediaStyle} alt="project" />
              <div style={textBox}>
                <h3 style={locationText}>{item.location}</h3>
                <p style={descText}>{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ----------------------- VIDEO SWIPER ----------------------- */}
      <h2 style={sectionTitle}>Project Videos</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        style={{ padding: "20px", maxWidth: "1000px" }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {media.filter(item => item.type === "video").map((item, index) => (
          <SwiperSlide key={index}>
            <div style={cardStyle}>
              <video controls style={mediaStyle}>
                <source src={item.url} />
              </video>
              <div style={textBox}>
                <h3 style={locationText}>{item.location}</h3>
                <p style={descText}>{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ----------------------- REVIEW POPUP ----------------------- */}
      {showForm && (
        <div style={overlay}>
          <div style={popup}>

            <button onClick={() => setShowForm(false)} style={closeBtn}>✕</button>

            <h2 style={formTitle}>Write Your Review</h2>

            <input placeholder="Your Name *" style={input}
              onChange={(e) => setName(e.target.value)} />

            <input placeholder="Your Location *" style={input}
              onChange={(e) => setLocation(e.target.value)} />

            <input placeholder="How many shutters? *" style={input}
              onChange={(e) => setCount(e.target.value)} />

            <select style={input} onChange={(e) => setType(e.target.value)}>
              <option value="">Select Type *</option>
              <option value="New Installation">New Installation</option>
              <option value="Repaired">Repaired</option>
              <option value="Both">Both</option>
            </select>

            <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  style={{
                    fontSize: "30px",
                    margin: "0 5px",
                    cursor: "pointer",
                    color: rating >= star ? "#FFD700" : "#ccc"
                  }}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea placeholder="Your Message (optional)" style={textarea}
              onChange={(e) => setMessage(e.target.value)} />

            <button onClick={submitReview} style={submitBtn}>
              Submit Review
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;

/* ---------------------- STYLES ---------------------- */

const pageStyle = { padding: "20px", textAlign: "center" };
const titleStyle = { fontSize: "34px", fontWeight: "700", color: "#0A2342" };
const subtitleStyle = { fontSize: "16px", marginBottom: "20px", color: "#555" };

const sectionTitle = { fontSize: "26px", fontWeight: "700", marginTop: "40px", color: "#0A2342" };

const reviewButton = {
  backgroundColor: "#0A2342",
  color: "white",
  padding: "12px 25px",
  borderRadius: "6px",
  fontSize: "18px",
  cursor: "pointer",
  border: "none",
  margin: "20px 0",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  paddingBottom: "10px",
  overflow: "hidden",
  borderTop: "4px solid #0A2342",
};

const mediaStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "12px 12px 0 0",
};

const textBox = { padding: "10px 15px" };
const locationText = { fontSize: "18px", fontWeight: "700", color: "#0A2342" };
const descText = { fontSize: "15px", color: "#444" };

const overlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex", justifyContent: "center", alignItems: "center",
  zIndex: 999,
};

const popup = {
  background: "#fff",
  padding: "30px",
  width: "90%",
  maxWidth: "400px",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  position: "relative",
};

const closeBtn = {
  position: "absolute", right: "10px", top: "10px",
  background: "none", border: "none", fontSize: "22px",
  cursor: "pointer", color: "#333"
};

const formTitle = { fontSize: "22px", color: "#0A2342", marginBottom: "15px" };

const input = {
  width: "100%", padding: "10px",
  marginBottom: "10px", borderRadius: "6px",
  border: "1px solid #ccc"
};

const textarea = {
  width: "100%", height: "80px",
  padding: "10px", borderRadius: "6px",
  border: "1px solid #ccc"
};

const submitBtn = {
  width: "100%", padding: "12px",
  backgroundColor: "#0A2342",
  color: "white", border: "none",
  borderRadius: "6px", cursor: "pointer"
};
