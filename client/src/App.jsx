import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { WhatsAppFab, usePageTitle } from "./components/Shared.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import {
  MobileBar,
  Preloader,
  ScrollProgress,
} from "./components/Extras.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="section not-found">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>This page doesn't exist.</h1>
        <Link to="/" className="btn btn--accent">
          Back to home
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Preloader />
      <ScrollToTop />
      <Header />
      <ScrollProgress />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileBar />
    </>
  );
}
