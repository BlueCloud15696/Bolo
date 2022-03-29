// import css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/poppins";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// import illustrations
import logo from "./img/logo.png";
//import hero from "./illustration/01_illustrarions/world web.svg";
import hero from "./img/hero_image.png";
import image1 from "./illustration/01_illustrarions/01bra.svg";
import image2 from "./illustration/01_illustrarions/03.svg";
import image3 from "./illustration/01_illustrarions/02bra.svg";
import image4 from "./illustration/man_image.svg";
import userSvg from "./svg/User.svg";
import dev1 from "./img/developers/dev1.png";

// import icons
import icon1 from "./icons/Bolo-01.svg";
import whyBoloIcon1 from "./icons/Why-bolo-icon-1.png";
import whyBoloIcon2 from "./icons/Why-bolo-icon-2.png";
import whyBoloIcon3 from "./icons/Why-bolo-icon-3.png";
import whyBoloIcon4 from "./icons/Why-bolo-icon-4.png";
import whyBoloIcon5 from "./icons/Why-bolo-icon-5.png";
import whyBoloIcon6 from "./icons/Why-bolo-icon-6.png";
import { BiListUl } from "react-icons/bi";

// import external packages
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// import components
import { DeveloperCard } from "./components/DevelopersCard";

SwiperCore.use([Pagination, Navigation]);

function App() {
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
                <a className="active " href="index.html">
                  Home
                </a>
              </li>
              <li>
                <a href="#">Why us</a>
              </li>
              <li>
                <a href="#">Vetting process</a>
              </li>
              <li>
                <a href="#">Talent pool</a>
              </li>
              <li>
                <a href="#">Company</a>
              </li>
              <li className="btn-login-wrapper">
                <a className="btn-login" href="contact.html">
                  Login
                </a>
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
          <div className="row  gy-4">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1>
                Instantly add <span className="purple-word">2 React</span>{" "}
                developers to your team
              </h1>
              <p>
                YouTeam helps tech companies extend their engineering teams by
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
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img src={hero} className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="developers">
        <div id="navbar-container" className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-5 order-2 order-lg-1"
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
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {/* <img src={hero} className="img-fluid animated" alt="" /> */}
            </div>
          </div>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={"auto"}
          navigation={true}
          //pagination={{ clickable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
          }}
        >
          {[0, 2, 3, 4, 3, 5, 4].map((value) => {
            return (
              <SwiperSlide>
                <DeveloperCard
                  avatar={dev1}
                  name="Bailey Wonger"
                  field="web designer"
                  rating={5}
                  description="senior web designer focus on wordpress worked for several people and companies"
                  experienceYear={12}
                  field2="senior web designer"
                  langueges={[{ name: "php" }]}
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
            <div className="col-lg-6">
              <img src={image1} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0">
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
                <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a>
                <a href="#about" className="btn-hire-developer scrollto">
                  Hire developers
                </a>
              </div>
            </div>
          </div>

          <div
            className="row justify-content-center align-items-between"
            data-aos="fade-up"
          >
            <div className="col-lg-6 order-1 order-md-2">
              <img src={image2} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-md-1">
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
                <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a>
                <a href="#about" className="btn-hire-developer scrollto">
                  Hire developers
                </a>
              </div>
            </div>
          </div>

          <div
            className="row justify-content-center align-items-between"
            data-aos="fade-up"
          >
            <div className="col-lg-6">
              <img src={image3} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0">
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
                <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a>
                <a href="#about" className="btn-hire-developer scrollto">
                  Hire developers
                </a>
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
            <div className="col-lg-6 order-1 order-md-2">
              <img src={userSvg} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-md-1">
              <h2>
                Web tecenology created millions of
                <br />
                sites worldwide by our developers.
              </h2>
              <p>
                It is a long established fact that a reader will be
                <br />
                distracted by the readable content of a page when
                <br />
                looking at its layout.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start">
                <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a>
                <a href="#about" className="btn-hire-developer scrollto">
                  Hire developers
                </a>
              </div>
            </div>
          </div>
          <div
            className="row justify-content-center align-items-between"
            data-aos="fade-up"
          >
            <div className="col-lg-6">
              <img
                style={{ zIndex: 1 }}
                src={image4}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0">
              <h2>Get work started with confidence</h2>
              <p>
                “This theme aute irure dolor in reprehe erit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur for the
                life sint occaecat cupidatat non proident, sunt in culpa qui
                officia de est laborum.” Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis...
                {/* et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore
                magnam aliquam quaerat voluptatem. */}
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start">
                <a href="#about" class="btn-signup scrollto">
                  Sign Up for Free
                </a>
                <a href="#about" className="btn-hire-developer scrollto">
                  Hire developers
                </a>
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
            <div className="col-xl-5">
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
                {/* <h3>Bolo</h3> */}
                <p>
                  It is a long established fact that a reader will
                  <br />
                  be distracted by the readable content of a<br />
                  page when looking at its layout. The point of
                  <br />
                  using Lorem Ipsum is that.
                </p>
                <div className="social-links mt-3">
                  <a href="#" className="twitter">
                    <i className="bx bxl-twitter"></i>
                  </a>
                  <a href="#" className="facebook">
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a href="#" className="instagram">
                    <i className="bx bxl-instagram"></i>
                  </a>
                  <a href="#" className="linkedin">
                    <i className="bx bxl-linkedin"></i>
                  </a>
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

export default App;
