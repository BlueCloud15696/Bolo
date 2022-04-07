// import illustrations
import logo from "../img/logo.png";
//import hero from "./illustration/01_illustrarions/world web.svg";
import hero from "../img/hero_image.png";
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

import axios from "axios";
import { BASE_URL } from "../constants/constants";

SwiperCore.use([Pagination, Navigation]);

function Home() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(window.pageYOffset);
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [developers, setDevelopers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState({
    state: "success",
    message: "",
  });
  console.log("developers", developers);
  useEffect(() => {
    setLoadingStatus({
      state: "success",
      message: "",
    });
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/developers/`, {
        headers: {
          accessTokenOcr: localStorage.getItem("accessTokenBolo")
            ? localStorage.getItem("accessTokenBolo")
            : null,
        },
      })
      .then((res) => {
        if (!res.data.error) {
          setDevelopers(res.data.results.users);
          setLoadingStatus({
            state: "success",
            message: "Developers loaded successfully!",
          });
          setLoading(false);
          //navigate("/");
        } else {
          setLoadingStatus({
            state: "error",
            message: "Something went wrong while loading developers!",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoadingStatus({
          state: "error",
          message: "Something went wrong while submitting form!",
        });
        setLoading(false);
      });
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
                Instantly add
                <span
                  className="purple-word"
                  style={{ display: "inline-block" }}
                >
                  <ScrollingText style={{ display: "inline-block" }} />
                </span>
                <br />
                developers to your team
              </h1>
              <p>
                YouTeam helps tech companies extend their engineering teams by
                leveraging a network of 20,000+ vetted contractors from hundreds
                of development agencies across the world.
              </p>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <Link
                  to="/hire-developer"
                  className="btn-hire-developer scrollto"
                >
                  Hire developers
                </Link>
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
      <section className="developers pl-4">
        <div id="navbar-container" className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-6 col-8 d-flex flex-column justify-content-center pt-4 pt-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2>Search best developers</h2>
              <p id="title-p">
                Get access to 20,000+ vetted engineers arround world and join to
                your team.
              </p>
            </div>
            <div
              className="col-lg-6 col-4 hero-img"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {/* <img src={hero} className="img-fluid animated" alt="" /> */}
            </div>
          </div>
        </div>
        <Swiper
          /* style={{ paddingLeft: "40px" }} */
          className="slider"
          spaceBetween={20}
          //slidesPerView={"auto"}
          //navigation={true}
          //pagination={{ clickable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            991: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1300: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
          }}
        >
          {developers &&
            /* [0, 2, 3, 4, 3, 5, 4] */ developers.docs.map((value) => {
              return (
                <SwiperSlide>
                  <DeveloperCard
                    avatar={`${BASE_URL}${value.avatar}`}
                    name={value.name}
                    field={value.profession}
                    rating={value.rating}
                    description={value.description}
                    experienceYear={value.experienceYear}
                    field2="Experience Years"
                    langueges={value.languages.map((languege) => {
                      return { name: languege };
                    })}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </section>
      <section className="features">
        <div id="navbar-container" className="container">
          <div
            className="row justify-content-center align-items-between"
            data-aos="fade-up"
          >
            <div className="col-lg-6 img-wrapper">
              <img src={image1} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-8 pt-lg-0">
              <div className="icon-wrapper">
                <img src={featuresIcon1} className="icon-image" alt="" />
              </div>
              <h2>
                Launch the personalized matching
                <br />
                process
              </h2>
              <p>
                Set up a free intro call with our Team Advisor—your
                <br />
                personal contact at YouTeam. They'll ensure the talent
                <br /> we source perfectly matches your needs.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start">
                {/* <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a> */}
                <Link
                  to="/hire-developer"
                  className="btn-hire-developer scrollto"
                >
                  Hire developers
                </Link>
              </div>
            </div>
          </div>

          <div
            className="row justify-content-center align-items-between"
            data-aos="fade-up"
          >
            <div className="col-lg-6 img-wrapper order-1 order-lg-2">
              <img src={image2} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-8 pt-lg-0 order-2 order-lg-1">
              <div className="icon-wrapper">
                <img src={featuresIcon2} className="icon-image" alt="" />
              </div>
              <h2>
                48h to the verified shortlist of
                <br />
                candidates
              </h2>
              <p>
                YouTeam handpicks the best-matched candidates
                <br />
                from its pool of over 20,000 engineers, conducts
                <br />
                personalized pre-screening, then arranges interviews
                <br /> for you.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start">
                {/* <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a> */}
                <Link
                  to="/hire-developer"
                  className="btn-hire-developer scrollto"
                >
                  Hire developers
                </Link>
              </div>
            </div>
          </div>

          <div
            className="row justify-content-center align-items-between"
            data-aos="fade-up"
          >
            <div className="col-lg-6 img-wrapper">
              <img src={image3} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-8 pt-lg-0">
              <div className="icon-wrapper">
                <img src={featuresIcon3} className="icon-image" alt="" />
              </div>
              <h2>Get work started with confidence</h2>
              <p>
                YouTeam automates contract signing and invoicing for
                <br />
                you and the development companies, employers of
                <br />
                your selected engineers. No commitments before this
                <br />
                point.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start">
                {/* <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a> */}
                <Link
                  to="/hire-developer"
                  className="btn-hire-developer scrollto"
                >
                  Hire developers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="why-bolo">
        <div id="navbar-container" className="container">
          <div className="row no-gutters">
            <div className="col-xl-8 ps-0 ps-lg-5 pe-lg-1 d-flex align-items-stretch">
              <div className="content d-flex flex-column justify-content-center">
                <div className="row">
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div class="icon" id="dark-icon">
                      <img src={whyBoloIcon1} />
                    </div>
                    <h4>Time-to-contract 1 week</h4>
                    <p>
                      With YouTeam, there's no need to slow down for
                      recruitment.
                    </p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div class="icon" id="light-icon">
                      <img src={whyBoloIcon2} />
                    </div>
                    <h4>Flexible, efficient scaling</h4>
                    <p>Expand or reduce your remote team size on demand.</p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div class="icon" id="dark-icon">
                      <img src={whyBoloIcon3} />
                    </div>
                    <h4>20,000+ engineers</h4>
                    <p>
                      Get access to vetted experts in web, mobile, Big Data, ML,
                      IoT
                    </p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div class="icon" id="light-icon">
                      <img src={whyBoloIcon4} />
                    </div>
                    <h4>Dedicated support</h4>
                    <p>Get a personal Customer Success Specialist.</p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div class="icon" id="light-dark-icon">
                      <img src={whyBoloIcon5} />
                    </div>
                    <h4>Vetted talent</h4>
                    <p>
                      Save your time and focus by only reviewing the best
                      candidates.
                    </p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div class="icon" id="light-icon">
                      <img src={whyBoloIcon6} />
                    </div>
                    <h4>Long-term predictability</h4>
                    <p>YouTeam’s average engagement duration is 2 years.</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="content col-xl-4  ps-0 ps-lg-5 pe-lg-1 d-flex align-items-stretch"
              data-aos="fade-up"
            >
              <div className="content d-flex flex-column justify-content-center">
                <div class="icon-main">
                  <img src={icon1} />
                </div>
                <h3>Why Bolo ?</h3>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable ayout. The point of using.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="web-tech"
        className="d-flex justify-cntent-center align-items-center"
      >
        <div id="navbar-container" className="container">
          <div
            className="row justify-content-center align-items-between"
            data-aos="fade-up"
          >
            <div className="col-lg-6 d-flex flex-column justify-content-center order-2 order-lg-1">
              <div className="icon-wrapper">
                <img src={webTechIcon1} className="icon-image" alt="" />
              </div>
              <h2>
                Web tecenology created millions of sites worldwide by our
                developers.
              </h2>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start">
                {/* <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a> */}
                <Link
                  to="/hire-developer"
                  className="btn-hire-developer scrollto"
                >
                  Hire developers
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center order-1 order-lg-2">
              <div className="img-wrapper">
                <img src={userSvg} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
          <div
            className="row d-flex flex-row justify-content-center align-items-between"
            data-aos="fade-up"
          >
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <div className="img-wrapper">
                <img
                  style={{ zIndex: 1 }}
                  src={image4}
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <h2 className="second-header">
                Get work started with confidence
              </h2>
              <p>
                “This theme aute irure dolor in reprehe erit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur for the
                life sint occaecat cupidatat non proident, sunt in culpa qui
                officia de est laborum.”
                {/*  Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis...
                et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore
                magnam aliquam quaerat voluptatem. */}
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start">
                {/* <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a> */}
                <Link
                  to="/hire-developer"
                  className="btn-hire-developer scrollto"
                >
                  Hire developers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="start-your-plan"
        className="d-flex justify-cntent-center align-items-center"
      >
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <img src={startYourPlaneIcon} className="img-fluid" alt="" />
              <h2>Start your plan</h2>
              <p>
                Tell us about your plans on a brief intro call and we’ll start
                the matching process.
              </p>
              <a href="#" className="btn-signup-for-free scrollto">
                Sign Up for Free
              </a>
            </div>
          </div>
        </div>
      </section>
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
}
export default Home;
