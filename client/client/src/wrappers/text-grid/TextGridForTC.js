import PropTypes from "prop-types";
import clsx from "clsx";
import TCData from "../../data/text-grid/text-grid-TC.json";
// import TextGridOneSingle from "../../components/text-grid/TextGridOneSingle.js";
import TextGridTC from "../../components/text-grid/TextGridTC.js";

const TextGridForTC = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("about-mission-area", spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {TCData?.map((single, key) => (
            <div className="col-lg-4 col-md-4" key={key}>
              <TextGridTC
                data={single}
                spaceBottomClass="mb-30"
              />
            </div>
          ))}
          <p>By using our website, you agree to be bound by these Terms and Conditions. If you have any questions or concerns, please contact us at <a target="_blank" rel="noreferrer" href="mailto:contact@shukrajewellary.com">contact@shukrajewellary.com</a>.

            Thank you for choosing Shukra Jewellery.
          </p>
        </div>
      </div>
    </div>
  );
};

TextGridForTC.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default TextGridForTC;
