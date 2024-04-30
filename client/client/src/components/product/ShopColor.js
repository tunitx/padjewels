import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import { useSelector } from "react-redux";

const ShopColor = ({ getSortParams }) => {
  const [availableColors, setAvailableColors] = useState([]);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (products && products.length > 0) {
      const colorsSet = new Set();
      products.forEach((product) => {
        if (product.color) {
          colorsSet.add(product.color);
        }
      });
      setAvailableColors(Array.from(colorsSet));
    }
  }, [products]);

  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Color </h4>
      <div className="sidebar-widget-list mt-20">
        {availableColors.length > 0 ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("color", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Colors{" "}
                </button>
              </div>
            </li>
            {availableColors.map((color, index) => (
              <li key={index}>
                <div className="sidebar-widget-list-left">
                  <button
                    onClick={(e) => {
                      getSortParams("color", color);
                      setActiveSort(e);
                    }}
                  >
                    <span className="checkmark" /> {color}{" "}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          "No colors found"
        )}
      </div>
    </div>
  );
};

ShopColor.propTypes = {
  products: PropTypes.array.isRequired,
  getSortParams: PropTypes.func,
};

export default ShopColor;
