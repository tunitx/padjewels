import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import img from '../../assets/theweddingcorp_1200x1200.webp'

const HeroSliderOneSingle = ({ data }) => {
  return (
    <div className="single-slider slider-height-1 bg-purple">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6 relative lg:right-4">
            <div className="slider-content slider-animated-1">
              {/* <h3 className="animated">tanish</h3> */}
              <h1 className="animated">{data.subtitle}</h1>
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + '/shop-list-standard'}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6 relative lg:left-8">
            <div className="slider-single-img slider-animated-1">
              <img
                className="animated img-fluid  rounded-lg"
                src={img}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderOneSingle.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSliderOneSingle;
