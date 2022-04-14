import { useState } from "react";
import icon1 from "../../img/logo-only.png";
import IntlTelInput from "react-bootstrap-intl-tel-input";

const Question = ({
  onChangeFormData,
  onSubmit,
  isSubmiting,
  submitResult,
  formerrors,
}) => {
  return (
    <div id="question-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div
            id="section-1"
            className="col-lg-6 d-flex flex-column align-items-center order-2 order-lg-1"
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
            className="col-lg-6 d-flex flex-column justify-content-center align-items-center order-1 order-lg-2"
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
                  onChange={(value) => onChangeFormData("email", value)}
                />
                {formerrors.email && (
                  <p
                    className="text-danger"
                    style={{ marginBottom: "0px", marginTop: "5Px" }}
                  >
                    {formerrors.email}
                  </p>
                )}
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
                  onChange={(value) => onChangeFormData("company_name", value)}
                />
                {formerrors.company_name && (
                  <p
                    className="text-danger"
                    style={{ marginBottom: "0px", marginTop: "5Px" }}
                  >
                    {formerrors.company_name}
                  </p>
                )}
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
                  onChange={(value) => onChangeFormData("contact_name", value)}
                />
                {formerrors.contact_name && (
                  <p
                    className="text-danger"
                    style={{ marginBottom: "0px", marginTop: "5Px" }}
                  >
                    {formerrors.contact_name}
                  </p>
                )}
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
                  onChange={(value) => onChangeFormData("phone", value)}
                />
                {formerrors.phone && (
                  <p
                    className="text-danger"
                    style={{ marginBottom: "0px", marginTop: "5Px" }}
                  >
                    {formerrors.phone}
                  </p>
                )}
              </div>

              {submitResult.message && submitResult.message !== "" && (
                <p
                  className={
                    submitResult.state === "success"
                      ? "text-success"
                      : "text-danger"
                  }
                  style={{ marginBottom: "5px", marginTop: "15Px" }}
                >
                  {submitResult.message}
                </p>
              )}
              <a onClick={onSubmit} className="btn-next">
                {isSubmiting ? "Form submiting" : "Contact with talent"}
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
