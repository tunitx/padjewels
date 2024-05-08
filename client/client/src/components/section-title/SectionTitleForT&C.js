import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleForTC = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Terms & Conditions</h5>
          <h1>Introduction</h1>
          <p>
            Welcome to Pad Jewels. By accessing and using our website, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with these terms, please refrain from using our services.{" "}
          </p>
          <br />

        </div>
      </div>
    </div>
  );
};

SectionTitleForTC.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleForTC;
