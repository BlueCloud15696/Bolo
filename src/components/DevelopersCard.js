import ReactStars from "react-rating-stars-component";

export const DeveloperCard = ({
  avatar,
  name,
  field,
  rating,
  description,
  experienceYear,
  field2,
  langueges,
}) => {
  return (
    <div id="dev_card" className="icon-box">
      <div className="row justify-content-between">
        <div className="col-12 col-sm-8" data-aos="fade-up">
          <img src={avatar} alt="" />
          <h3>{name}</h3>
          <h4>{field}</h4>
        </div>

        <div className="col-12 col-sm-4" data-aos="fade-up">
          <ReactStars
            count={5}
            value={rating}
            size={20}
            activeColor="#d3c200"
            edit={false}
          />
        </div>
      </div>
      <p>{description}</p>
      <div className="experience-wrapper">
        <div
          className="icon"
          styles={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h5>{experienceYear}</h5>
        </div>
        <h3>{field2}</h3>
        {langueges.map((languege) => (
          <div className="languege-icon">
            <h5>{languege.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};
