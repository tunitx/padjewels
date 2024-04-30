import React from "react";
import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";

const ShopSize = ({ getSortParams }) => {
  // Hardcoded size values
  const sizes = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Size </h4>
      <div className="sidebar-widget-list mt-20">
        {sizes ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("size", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Sizes{" "}
                </button>
              </div>
            </li>
            {sizes.map((size, key) => (
              <li key={key}>
                <div className="sidebar-widget-list-left">
                  <button
                    className="text-uppercase"
                    onClick={(e) => {
                      getSortParams("size", size);
                      setActiveSort(e);
                    }}
                  >
                    <span className="checkmark" />
                    {size}{" "}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          "No sizes found"
        )}
      </div>
    </div>
  );
};

ShopSize.propTypes = {
  getSortParams: PropTypes.func,
};

export default ShopSize;
