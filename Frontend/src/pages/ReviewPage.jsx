import { useState, useEffect } from "react";
import { getApiBase, parseListResponse, parseAddResponse } from "../utils/apiHelpers.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

  const responsive = {
    desktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  const ButtonGroup = ({ next, previous }) => (
    <>
      <button className="carousel-btn left" onClick={previous} aria-label="Previous">‹</button>
      <button className="carousel-btn right" onClick={next} aria-label="Next">›</button>
    </>
  );

  useEffect(() => {
    const API_BASE = getApiBase();
    fetch(`${API_BASE}/media/all`)
      .then(res => parseListResponse(res))
      .then(data => setMedia(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load media"));
  }, []);

  const submitReview = async () => {
    if (!name || !location || !type || rating === 0) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      const API_BASE = getApiBase();
      const res = await fetch(`${API_BASE}/reviews/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, type, count, rating, message }),
      });

      const parsed = await parseAddResponse(res);
      if (parsed.ok) {
        toast.success("Review submitted successfully!");
        setShowForm(false);
        navigate("/");
      } else toast.error("Failed to submit review");
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <main className="review-page">

      <header className="review-header">
        <h1>Completed Shutter Projects & Automatic Sliding Gates</h1>
        <p>
          Explore real project photos, installation videos, and genuine customer
          reviews from across Andhra Pradesh.
        </p>

        <button className="review-btn" onClick={() => setShowForm(true)}>
          Write a Review
        </button>
      </header>

      {/* PROJECT PHOTOS */}
      <section aria-labelledby="project-photos">
        <h2 id="project-photos" className="section-title">Project Photos</h2>
        <div className="carousel-shell">
          <Carousel
            responsive={responsive}
            infinite
            arrows={false}
            renderButtonGroupOutside
            customButtonGroup={<ButtonGroup />}
            partialVisible={false}
          >
            {media.filter(m => m.type === "photo").map((item, i) => (
              <article className="project-card" key={i}>
                <div className="project-media">
                  <img src={item.url} alt={`${item.location} shutter installation`} loading="lazy" />
                </div>
                <div className="project-text">
                  <h3>{item.location}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      {/* PROJECT VIDEOS */}
      <section aria-labelledby="project-videos">
        <h2 id="project-videos" className="section-title">Project Videos</h2>
        <div className="carousel-shell">
          <Carousel
            responsive={responsive}
            infinite
            arrows={false}
            renderButtonGroupOutside
            customButtonGroup={<ButtonGroup />}
            partialVisible={false}
          >
            {media.filter(m => m.type === "video").map((item, i) => (
              <article className="project-card" key={i}>
                <div className="project-media video-wrapper">
                  <video controls playsInline poster={item.thumbnail || ""}>
                    <source src={item.url} />
                  </video>
                </div>
                <div className="project-text">
                  <h3>{item.location}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      {/* REVIEW FORM */}
      {showForm && (
        <div className="review-overlay">
          <div className="review-popup">
            <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            <h2>Submit Your Review</h2>

            <input placeholder="Your Name *" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Your Location *" value={location} onChange={e => setLocation(e.target.value)} />
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">Select Type *</option>
              <option value="New Installation">New Installation</option>
              <option value="Repaired">Repaired</option>
              <option value="Both">Both</option>
            </select>

            <div className="rating-stars">
              {[1,2,3,4,5].map(star => (
                <span key={star} onClick={() => setRating(star)} className={rating >= star ? "active" : ""}>★</span>
              ))}
            </div>

            <textarea placeholder="Message (optional)" value={message} onChange={e => setMessage(e.target.value)} />
            <button className="submit-btn" onClick={submitReview}>Submit Review</button>
          </div>
        </div>
      )}

    </main>
  );
}

export default ReviewPage;
