// import illustrations
import logo from "../img/logo.png";
//import hero from "./illustration/01_illustrarions/world web.svg";
import hero from "../img/hero_image.png";
import image1 from "../illustration/01_illustrarions/01bra.svg";
import image2 from "../illustration/01_illustrarions/03.svg";
import image3 from "../illustration/01_illustrarions/02bra.svg";
import image4 from "../illustration/man_image.svg";
import userSvg from "../svg/User.svg";

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
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import components
import { DeveloperCard } from "../components/DevelopersCard";
import { ScrollingText } from "../components/ScrollingText";

import axios from "axios";
import { BASE_URL } from "../constants/constants";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

SwiperCore.use([Pagination, Navigation]);

function Home({ setAuthState, authState, logout }) {
  const navigate = useNavigate();
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
  console.log("loading", loading);
  console.log("loadingStatus", loadingStatus);
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [formerrors, setFormErrors] = useState({});
  const validate = () => {
    console.log("Validate the form....");
    let errors = {};

    //email field
    if (!formData.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    //password field
    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const [signinModal, setSigninModal] = useState(false);
  const onCloseSigninModal = () => {
    setSigninModal(false);
  };
  const onClickSignIn = () => {
    if (authState && authState.role === "ADMIN") {
      logout();
    } else {
      onOpenSigninModal();
    }
  };
  const onOpenSigninModal = () => {
    setSigninModal(true);
  };
  const [signingIn, setSigningIn] = useState(false);
  const [signingStatus, setSigningStatus] = useState({
    state: "success",
    message: "",
  });
  const onClickSignin = () => {
    if (validate()) {
      setSigningStatus({
        state: "success",
        message: "",
      });
      setSigningIn(true);
      axios
        .post(
          `${BASE_URL}/api/auth/login`,
          { email: formData.email, password: formData.password },
          {
            headers: {
              accessTokenOcr: localStorage.getItem("accessTokenBolo")
                ? localStorage.getItem("accessTokenBolo")
                : null,
            },
          }
        )
        .then((res) => {
          if (!res.data.error) {
            //setDevelopers(res.data.results.users);
            console.log("res.data", res.data);
            localStorage.setItem(
              "accessTokenBolo",
              res.data.results.user.token
            );

            const user = res.data.results.user;
            if (user) {
              setAuthState({
                role: user.role,
                email: user.email,
                uid: user._id,
                email_verified: user.email_verified,
                status: true,
              });
            } else {
              setAuthState({
                role: null,
                email: "",
                uid: 0,
                email_verified: null,
                status: false,
              });
            }

            setSigningStatus({
              state: "success",
              message: "Signed in successfully!",
            });
            setSigningIn(false);
            navigate("/admin");
          } else {
            setSigningStatus({
              state: "error",
              message: "Something went wrong while loading developers!",
            });
            setSigningIn(false);
          }
        })
        .catch((error) => {
          setSigningStatus({
            state: "error",
            message: "Something went wrong while signing in!",
          });
          setSigningIn(false);
        });
    }
  };

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
            <img alt="some" src={logo} />
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link key={"home"} className="active " to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  key={"whyus"}
                  onClick={() => window.location.replace("/#why-bolo")}
                  to="#"
                >
                  Why us
                </Link>
              </li>
              {/* <li>
                <Link key={"vetting"} to="#">
                  Vetting process
                </Link>
              </li> */}
              <li>
                <Link key={"talent"} to="/talent-pool">
                  Talent pool
                </Link>
              </li>
              {/* <li>
                <Link key={"company"} onClick={() => window.location.replace("/#why-bolo")} to="#">
                  Company
                </Link>
              </li> */}
              {authState && authState.role === "ADMIN" && (
                <li>
                  <Link key={"company"} to="/admin">
                    Admin page
                  </Link>
                </li>
              )}
              <li className="btn-login-wrapper">
                <Link
                  key={"btn-login"}
                  className="btn-login"
                  onClick={onClickSignIn}
                  to="#"
                >
                  {authState && authState.role === "ADMIN"
                    ? "Sign Out"
                    : "Login"}
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
                Bolo helps tech companies extend their engineering teams by
                leveraging a network of 1000+ vetted contractors from hundreds
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
                Set up a free intro call with our Team Advisor???your
                <br />
                personal contact at Bolo. They'll ensure the talent
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
                Bolo handpicks the best-matched candidates
                <br />
                from its pool of over 1000 engineers, conducts
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
                Bolo automates contract signing and invoicing for
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
      <section id="why-bolo" className="why-bolo">
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
                      <img alt="some" src={whyBoloIcon1} />
                    </div>
                    <h4>Time-to-contract 1 week</h4>
                    <p>
                      With Bolo, there's no need to slow down for recruitment.
                    </p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div class="icon" id="light-icon">
                      <img alt="some" src={whyBoloIcon2} />
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
                      <img alt="some" src={whyBoloIcon3} />
                    </div>
                    <h4>1000+ engineers</h4>
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
                      <img alt="some" src={whyBoloIcon4} />
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
                      <img alt="some" src={whyBoloIcon5} />
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
                      <img alt="some" src={whyBoloIcon6} />
                    </div>
                    <h4>Long-term predictability</h4>
                    <p>Bolo???s average engagement duration is 2 years.</p>
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
                  <img alt="some" src={icon1} />
                </div>
                <h3>Why Bolo ?</h3>
                <p>
                  From the time to contract to the vetting process , we set
                  ourselves appat.
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
                From React to Angular, we have Sr level experts in our network
                ready to start up with your modern webapp in no time.
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
                Bolo automates contract signing and invoicing for you and the
                development companies, employers of your selected engineers. No
                commitments before this point.
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
                Tell us about your plans on a brief intro call and we???ll start
                the matching process.
              </p>
              <a href="#" className="btn-signup-for-free scrollto">
                Start for Free
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
                  <img alt="some" src={logo} />
                </div>
                <p>
                  YouTeam handpicks the best-matched candidates from its pool of
                  over 20,000 engineers, conducts personalized pre-screening,
                  then arranges interviews for you.
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
            <div className="copyright">Copyright &copy; Bolo 2022</div>
          </div>
        </div>
      </footer>
      <Modal centered={true} isOpen={signinModal} toggle={onCloseSigninModal}>
        <ModalHeader toggle={onCloseSigninModal}>
          Login to admin account
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={onChangeFormData}
                    invalid={formerrors.email && formerrors.email !== ""}
                  />
                  {formerrors.email && formerrors.email !== "" && (
                    <FormFeedback>{formerrors.email}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    onChange={onChangeFormData}
                    invalid={formerrors.password && formerrors.password !== ""}
                  />
                  {formerrors.password && formerrors.password !== "" && (
                    <FormFeedback>{formerrors.password}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
          {signingStatus.message && signingStatus.message !== "" && (
            <p style={{ color: "red" }}>{signingStatus.message}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button disabled={signingIn} color="primary" onClick={onClickSignin}>
            {signingIn ? "Signing In" : "Sign In"}
          </Button>{" "}
          <Button onClick={onCloseSigninModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default Home;
