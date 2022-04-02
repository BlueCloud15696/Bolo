import { useState } from "react";
import icon1 from "../../img/logo-only.png";
import IntlTelInput from "react-bootstrap-intl-tel-input";

const Question = () => {
  return (
    <div id="question-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div
            id="section-1"
            className="col-lg-6 d-flex flex-column align-items-center"
            data-aos="fade-up"
          >
            <div class="icon-main">
              <img src={icon1} />
            </div>
            <p>
              Last please sign up so we can connect with you with the right
              developer from our network
            </p>
            <div
              className="copy-right-wrapper"
              style={{ display: "flex", alignItems: "flex-end", flexGrow: 1 }}
            >
              <p id="copy-right">
                Copyright © Bolo 2022 Desing by assem elshukfy
              </p>
            </div>
          </div>

          <div
            id="section-3"
            className="col-lg-6 d-flex flex-column justify-content-center align-items-center"
            data-aos="fade-up"
          >
            <form className="d-flex flex-column justify-content-center align-items-center">
              <div className="form-group">
                <label className="form-label" for="exampleInputEmail1">
                  Email*
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="assem.yogo@gmail.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label" for="exampleInputEmail1">
                  Company name*
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="vision best"
                />
              </div>
              <div className="form-group">
                <label className="form-label" for="exampleInputEmail1">
                  Contact name*
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="assem mohamed elsukfy"
                />
              </div>
              <div className="form-group">
                <label className="form-label" for="exampleInputEmail1">
                  Phone (optional)
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="+1 201-5555-123"
                />
              </div>
              {/* <IntlTelInput
                preferredCountries={["US", "GB"]}
                defaultCountry={"US"}
                defaultValue={"+1 555-555-5555"}
                //onChange={(data) => this.onChangeHandler(data)}
              /> */}
              <a /* onClick={onClickPrev} */ className="btn-next">
                Contact with talent
              </a>
            </form>

            {/* <div className="d-flex justify-content-center justify-content-lg-start align-self-end button-wrapper">
              {prviousLabel && prviousLabel !== "" && (
                <a onClick={onClickPrev} className="btn-prev">
                  {prviousLabel}
                </a>
              )}
              {nextLabel && nextLabel !== "" && (
                <a onClick={onClickNext} className="btn-next">
                  {nextLabel}
                </a>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
