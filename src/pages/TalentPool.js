// import illustrations
import logo from "../img/logo.png";
//import hero from "./illustration/01_illustrarions/world web.svg";
import hero from "../img/hero_image2.png";
import image1 from "../illustration/01_illustrarions/01bra.svg";
import image2 from "../illustration/01_illustrarions/03.svg";
import image3 from "../illustration/01_illustrarions/02bra.svg";
import image4 from "../illustration/man_image.svg";
import userSvg from "../svg/User.svg";
import dev1 from "../img/developers/dev1.png";

// import icons
import icon1 from "../icons/Bolo-01.svg";
import whyBoloIcon1 from "../icons/Why-bolo-icon-1.png";
import whyBoloIcon2 from "../icons/Why-bolo-icon-2.png";
import whyBoloIcon3 from "../icons/Why-bolo-icon-3.png";
import whyBoloIcon4 from "../icons/Why-bolo-icon-4.png";
import whyBoloIcon5 from "../icons/Why-bolo-icon-5.png";
import whyBoloIcon6 from "../icons/Why-bolo-icon-6.png";

import webTechIcon1 from "../icons/web-tech-icon-1.png";
import featuresIcon1 from "../icons/features-icon-1.png";
import featuresIcon2 from "../icons/features-icon-2.png";
import featuresIcon3 from "../icons/features-icon-3.png";
import startYourPlaneIcon from "../icons/start-your-plan-icon.png";

import { BiListUl } from "react-icons/bi";
import {
  FaTwitter,
  FaPinterest,
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

// import external packages
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import { Link, Outlet } from "react-router-dom";

// import components
import { DeveloperCard } from "../components/DevelopersCard";
import { ScrollingText } from "../components/ScrollingText";

import DevelopersList from "../components/DevelopersList";
const TalentPool = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(window.pageYOffset);
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div>
      <header
        id="header"
        className={`fixed-top d-flex align-items-center header-transparent ${
          offset > 100 && "header-scrolled shadow-sm"
        }`}
      >
        <div
          id="navbar-container"
          className="container d-flex justify-content-between align-items-center"
        >
          <div className="logo">
            <img src={logo} />
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link key={"home"} className="active " to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link key={"whyus"} to="#">
                  Why us
                </Link>
              </li>
              <li>
                <Link key={"vetting"} to="#">
                  Vetting process
                </Link>
              </li>
              <li>
                <Link key={"talent"} to="/talent-pool">
                  Talent pool
                </Link>
              </li>
              <li>
                <Link key={"company"} to="#">
                  Company
                </Link>
              </li>
              <li className="btn-login-wrapper">
                <Link key={"btn-login"} className="btn-login" to="#">
                  Login
                </Link>
              </li>
            </ul>
            <BiListUl className="mobile-nav-toggle" />
          </nav>
        </div>
      </header>
      <section id="hero-no-slider" className="d-flex align-items-center">
        <div
          id="hero-container"
          className="container"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="row">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-lg-0" /* order-2 order-lg-1 */
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1>
                Hire{" "}
                <span
                  className="purple-word"
                  style={{ display: "inline-block" }}
                >
                  talents
                  {/* <ScrollingText style={{ display: "inline-block" }} /> */}
                </span>
              </h1>
              <p>
                Your Team helps tech companies extend their engineering teams by
                leveraging a network of 20,000+ vetted contractors from hundreds
                of development agencies across the world.
              </p>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <a href="#about" className="btn-hire-developer scrollto">
                  Hire developers
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 hero-img" /* order-1 order-lg-2  */
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img src={hero} className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>
      <DevelopersList />
      <footer
        id="footer"
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-duration="500"
      >
        <div className="footer-top">
          <div id="navbar-container" className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 footer-info">
                <div className="logo">
                  <img src={logo} />
                </div>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that.
                </p>
                <div className="social-links mt-3">
                  <FaFacebookF color="#1e4356" className="social-icons" />
                  <FaTwitter color="#4e9eee" className="social-icons" />
                  <FaPinterest color="#1e4356" className="social-icons" />
                  <FaLinkedin color="#1e4356" className="social-icons" />
                  <FaInstagram color="#1e4356" className="social-icons" />
                </div>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Link</h4>
                <ul>
                  <li>
                    <a href="#">Developer</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Investor</a>
                  </li>
                  <li>
                    <a href="#">Sitemap</a>
                  </li>
                  <li>
                    <a href="#">Jobs</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>{"Help & Suport"}</h4>
                <ul>
                  <li>
                    <a href="#">Help aand Contact</a>
                  </li>
                  <li>
                    <a href="#">Fees</a>
                  </li>
                  <li>
                    <a href="#">Security</a>
                  </li>
                  <li>
                    <a href="#">App</a>
                  </li>
                  <li>
                    <a href="#">Shop</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Privacy Contact</h4>
                <ul>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Legal Agreement</a>
                  </li>
                  <li>
                    <a href="#">Feedback</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id="copyright-container">
          <div className="container">
            <div className="copyright">
              Copyright &copy; Bolo 2022 Desing by assem elshukfy
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TalentPool;
