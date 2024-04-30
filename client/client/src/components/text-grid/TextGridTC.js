import PropTypes from "prop-types";
import clsx from "clsx";

const TextGridTC = ({ data, spaceBottomClass }) => {
  return (
      <div className={clsx("single-mission", spaceBottomClass)}>
        <h3>{data.title}</h3>
        <p>{data.text}</p>
      </div>
  );
};

TextGridTC.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string
};

export default TextGridTC;
