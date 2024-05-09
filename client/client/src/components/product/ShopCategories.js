import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import axios from "axios";

const ShopCategories = ({ getSortParams }) => {
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const fetchCategoriesFromApi = async () => {
    try {
      const response = await axios.get(
        "https://padjewels.onrender.com/api/v1/product/cat"
      );
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategoriesFromApi();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    getSortParams("category", category);
    setActiveSort(category);
  };

  const handleShowAllCategories = () => {
    setShowAllCategories(true); // Set to true to display all categories
  };

  const handleShowLessCategories = () => {
    setShowAllCategories(false); // Set to false to show only first 5 categories
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories.length > 0 ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button onClick={() => handleCategoryClick("")}>
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {showAllCategories
              ? categories.map((category) => (
                  <li key={category._id}>
                    <div className="sidebar-widget-list-left">
                      <button
                        onClick={() =>
                          handleCategoryClick(category.categoryName)
                        }
                      >
                        <span className="checkmark" /> {category.categoryName}
                      </button>
                    </div>
                  </li>
                ))
              : categories.slice(0, 5).map((category) => (
                  <li key={category._id}>
                    <div className="sidebar-widget-list-left">
                      <button
                        onClick={() =>
                          handleCategoryClick(category.categoryName)
                        }
                      >
                        <span className="checkmark" /> {category.categoryName}
                      </button>
                    </div>
                  </li>
                ))}
            {!showAllCategories && categories.length > 5 && (
              <li>
                <button onClick={handleShowAllCategories}>
                  <span className="checkmark" /> More
                </button>
              </li>
            )}
            {showAllCategories && (
              <li>
                <button onClick={handleShowLessCategories}>
                  <span className="checkmark" /> Less
                </button>
              </li>
            )}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  getSortParams: PropTypes.func,
};

export default ShopCategories;
