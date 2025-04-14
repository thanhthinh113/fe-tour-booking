import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
import TourDetail from "./pages/TourDetail";
import AboutUs from "./pages/AboutUs";
import BookingForm from "./pages/BookingForm";
import PaymentForm from "./pages/PaymentForm";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
          {/* <Route path="/" element={<SignUp />} /> */}
          {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} /> {/* Trang 404 */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/tourdetail/:id" element={<TourDetail />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/dangky" element={<BookingForm />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/termofservice" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
