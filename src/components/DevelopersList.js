import { useState } from "react";
import dev1 from "../img/developers/dev2.png";
import { FaStar, FaStarHalfAlt, FaStarHalf } from "react-icons/fa";

const DevelopersList = () => {
  const [selectedCategory, setSelectedCategory] = useState("javascript");
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
        <div className="row">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
            <div
              className="col-md-6 col-lg-4 d-flex align-items-stretch"
              data-aos="fade-up"
            >
              <div className="icon-box">
                <div className="hourly-rate">
                  <h3>$15/hr</h3>
                </div>
                <div className="icon">
                  <img src={dev1} />
                </div>
                <h3 className="title">Bailey Wonger</h3>
                <h4 className="sub-title">Javascript</h4>
                <div className="rating">
                  <FaStar color="#d3c200" className="icon" />
                  <span>(5/5)</span>
                  <h3>131 Jobs</h3>
                </div>
                <p className="description">
                  Brolly off his nut A bit of how's your father chancer in my
                  flat chinwag bog skive.
                </p>
                <div id="langueges" /*  className="row" */>
                  <h5>Html</h5>
                  <h5>Css</h5>
                  <h5>Javascript</h5>
                  <h5>Jquery</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopersList;
