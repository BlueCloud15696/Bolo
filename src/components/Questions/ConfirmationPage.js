import icon1 from "../../img/logo-only.png";

const Question = ({ mainTitle, onClickNext }) => {
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
              <img alt="image" src={icon1} />
            </div>
            <p>{mainTitle}</p>
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
            id="section-2"
            className="col-lg-6 d-flex flex-column justify-content-center align-items-left order-1 order-lg-2"
            data-aos="fade-up"
          >
            <h2>
              Your response is submitted successfully. we will get back to you
              soon.
            </h2>
            <hr />
            <div className="d-flex justify-content-center justify-content-lg-start align-self-end button-wrapper">
              <a href="#" onClick={onClickNext} className="btn-next">
                Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
