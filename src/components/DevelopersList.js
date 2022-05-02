import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const DevelopersList = () => {
  const [selectedCategory, setSelectedCategory] = useState("javascript");

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

  return (
    <section className="dev-list">
      <div id="navbar-container" className="container">
        <div class="section-title">
          <h2>Hire developer</h2>
          <p>Your bolo engineering specialist will be reaching out soon.</p>
        </div>
        <div class="row">
          <div className="col-lg-12">
            <ul id="dev-list-flters">
              <li
                data-filter="*"
                className={
                  selectedCategory === "javascript" ? "filter-active" : ""
                }
                onClick={() => setSelectedCategory("javascript")}
              >
                Javascript
              </li>
              <li
                data-filter=".filter-app"
                className={
                  selectedCategory === "branding" ? "filter-active" : ""
                }
                onClick={() => setSelectedCategory("branding")}
              >
                Branding
              </li>
              <li
                data-filter=".filter-card"
                className={
                  selectedCategory === "web-design" ? "filter-active" : ""
                }
                onClick={() => setSelectedCategory("web-design")}
              >
                Web Design
              </li>
              <li
                data-filter=".filter-web"
                className={selectedCategory === "ui-ux" ? "filter-active" : ""}
                onClick={() => setSelectedCategory("ui-ux")}
              >
                UI/UX
              </li>
              <li
                data-filter=".filter-web"
                className={selectedCategory === "php" ? "filter-active" : ""}
                onClick={() => setSelectedCategory("php")}
              >
                Php
              </li>
              <li
                data-filter=".filter-web"
                className={selectedCategory === "python" ? "filter-active" : ""}
                onClick={() => setSelectedCategory("python")}
              >
                Python
              </li>
            </ul>
          </div>
        </div>
        {developers && (
          <div className="row">
            {developers.docs.map((value) => (
              <div
                className="col-md-6 col-lg-4 d-flex align-items-stretch"
                data-aos="fade-up"
              >
                <div className="icon-box">
                  <div className="hourly-rate">
                    <h3>$15/hr</h3>
                  </div>
                  <div className="icon">
                    <img
                      alt="image"
                      /* src={`${BASE_URL}${value.avatar}`} */
                      src={`${value.avatar}`}
                    />
                  </div>
                  <h3 className="title">{value.name}</h3>
                  <h4 className="sub-title">{value.profession}</h4>
                  <div className="rating">
                    <FaStar color="#d3c200" className="icon" />
                    <span>{`(${value.rating}/5)`}</span>
                    <h3>{`${value.numJob} Jobs`}</h3>
                  </div>
                  <p className="description">{value.description}</p>
                  <div id="langueges">
                    {value.languages.map((languege) => (
                      <h5>{languege}</h5>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DevelopersList;
