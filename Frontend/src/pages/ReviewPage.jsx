import { useState, useEffect } from "react";
import { getApiBase, parseListResponse, parseAddResponse } from "../utils/apiHelpers.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const mediaCarouselResponsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const MediaButtonGroup = ({ next, previous }) => (
  <>
    <button className="carousel-btn left" onClick={previous} aria-label="Previous">
      ‹
    </button>
    <button className="carousel-btn right" onClick={next} aria-label="Next">
      ›
    </button>
  </>
);


  useEffect(() => {
    const API_BASE = getApiBase();
    fetch(`${API_BASE}/media/all`)
      .then(res => parseListResponse(res))
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
      .catch(err => {
        console.error("Media Fetch Error:", err);
        toast.error("Failed to load media. Please check the console or try again later.");
      });
  }, []);

  const submitReview = async () => {
    if (!name || !location || !type || !count || rating === 0) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      const API_BASE = getApiBase();
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

      const resParsed = await parseAddResponse(response);
      const data = resParsed.data;

      if (resParsed.ok && (data && (data.success || data.review))) {
        toast.success("Review submitted successfully!");

        setShowForm(false);
        // reset fields
        setName("");
        setLocation("");
        setType("");
        setCount(1);
        setMessage("");
        setRating(0);
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
        aria-label="Write a review"
      >
        Write a Review
      </button>

      {/* ----------------------- PHOTO SWIPER ----------------------- */}
      <h2 style={sectionTitle}>Project Photos</h2>
      <div className="carousel-shell">
        <Carousel
          responsive={mediaCarouselResponsive}
          infinite
          arrows={false}
          renderButtonGroupOutside
          customButtonGroup={<MediaButtonGroup />}
          partialVisible={false}
          centerMode={false}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {media
            .filter(item => item.type === "photo")
            .map((item, index) => (
              <div className="project-card" key={item._id || index}>
                <div className="project-media">
                  <img
                    src={item.url}
                    loading="lazy"
                    alt={`${item.location || "project"} - photo`}
                  />
                </div>
                <div className="project-text">
                  <h3 className="project-location">{item.location}</h3>
                  <p className="project-desc">{item.description}</p>
                </div>
              </div>
            ))}
        </Carousel>
      </div>


      {/* ----------------------- VIDEO SWIPER ----------------------- */}
      <h2 style={sectionTitle}>Project Videos</h2>
      <div className="carousel-shell">
        <Carousel
          responsive={mediaCarouselResponsive}
          infinite
          arrows={false}
          renderButtonGroupOutside
          customButtonGroup={<MediaButtonGroup />}
          partialVisible={false}
          centerMode={false}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {media
            .filter(item => item.type === "video")
            .map((item, index) => (
              <div className="project-card" key={item._id || index}>
                <div className="project-media">
                  <video controls playsInline poster={item.thumbnail || ""}>
                    <source src={item.url} />
                  </video>
                </div>
                <div className="project-text">
                  <h3 className="project-location">{item.location}</h3>
                  <p className="project-desc">{item.description}</p>
                </div>
              </div>
            ))}
        </Carousel>
      </div>

      {/* ----------------------- REVIEW POPUP ----------------------- */}
      {showForm && (
        <div style={overlay}>
          <div style={popup}>

            <button onClick={() => { setShowForm(false); setName(""); setLocation(""); setType(""); setCount(1); setMessage(""); setRating(0); }} style={closeBtn} aria-label="Close review form">✕</button>

            <h2 style={formTitle}>Write Your Review</h2>

            <input placeholder="Your Name *" style={input}
              value={name}
              onChange={(e) => setName(e.target.value)} />

            <input placeholder="Your Location *" style={input}
              value={location}
              onChange={(e) => setLocation(e.target.value)} />

            <input placeholder="How many shutters? *" style={input}
              type="number" min={1}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))} />

            <select style={input} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select Type *</option>
              <option value="New Installation">New Installation</option>
              <option value="Repaired">Repaired</option>
              <option value="Both">Both</option>
            </select>

            <div role="radiogroup" aria-label="Rating" style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  role="radio"
                  tabIndex={0}
                  aria-checked={rating === star}
                  style={{
                    fontSize: "28px",
                    margin: "0 5px",
                    cursor: "pointer",
                    color: rating >= star ? "#FFD700" : "#ccc",
                    outline: rating === star ? "2px solid rgba(255,215,0,0.2)" : "none",
                    borderRadius: "4px",
                    padding: "2px",
                  }}
                  onClick={() => setRating(star)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setRating(star);
                    }
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea placeholder="Your Message (optional)" style={textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)} />

            <button
              onClick={submitReview}
              style={( !name || !location || !type || !count || rating === 0) ? { ...submitBtn, opacity: 0.6, cursor: 'not-allowed' } : submitBtn }
              disabled={!name || !location || !type || !count || rating === 0}
              aria-disabled={!name || !location || !type || !count || rating === 0}
            >
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
  height: "clamp(180px, 24vh, 320px)",
  objectFit: "cover",
  borderRadius: "12px 12px 0 0",
  display: "block",
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
