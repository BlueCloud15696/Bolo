import icon1 from "../../img/logo-only.png";

const Question = ({
  radioOptions,
  mainTitle,
  title,
  nextLabel,
  prviousLabel,
  value,
  onChange,
  onClickNext,
  onClickPrev,
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
            <h2>{title}</h2>
            {radioOptions.map((radioOption) => (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked={value.value === radioOption.value}
                  onChange={(value) => {
                    console.log("1 value", value);
                    onChange(radioOption);
                  }}
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  {radioOption.label}
                </label>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-center justify-content-lg-start align-self-end button-wrapper">
              {prviousLabel && prviousLabel !== "" && (
                <a href="#" onClick={onClickPrev} className="btn-prev">
                  {prviousLabel}
                </a>
              )}
              {nextLabel && nextLabel !== "" && (
                <a href="#" onClick={onClickNext} className="btn-next">
                  {nextLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
