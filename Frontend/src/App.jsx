import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Homepage from "./pages/Homepage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import Servicepage from "./pages/Servicepage.jsx";
import Contactpage from "./pages/Contactpage.jsx";

import Header from "./components/Headero.jsx";
import ReviewSlider from "./components/ReviewSlider.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/reviewsdetail" element={<ReviewPage />} />

        <Route path="/services" element={<Servicepage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/reviews" element={<ReviewSlider />} />
        <Route path="/*" element={<PageNotFound />} />

      </Routes>
       <ToastContainer
  position="top-center"
  autoClose={2000}
  toastStyle={{
    backgroundColor: "#0A2342",
    color: "white",
    fontSize: "16px",
    borderRadius: "8px",
  }}
/>
    </>
  );
}

export default App;
