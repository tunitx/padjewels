import axios from "axios";

// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) => product.category.filter((single) => single === category)[0]
      )
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
      (single) => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.find(
    (single) =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  );
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.find(
        (single) =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      ).quantity;
    } else {
      return cartItems.find((single) => product.id === single.id).quantity;
    }
  } else {
    return 0;
  }
};

export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter((single) => single.color === color)[0]
      .size.filter((single) => single.name === size)[0].stock;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  console.log(sortValue);
  console.log(sortType);
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      console.log("Sorting by category:", sortValue);

      const filteredProducts = products.filter((product) => {
        console.log("Product Category ObjectId:", product.productCategories);

        // Assuming productCategories is an ObjectId, fetch the category name
        const productCategory = getProductCategoryName(
          product?.productCategories
        );

        console.log("Product Category Name:", productCategory);

        return productCategory === sortValue;
      });

      console.log("Filtered Products:", filteredProducts);

      return filteredProducts;
    }

    if (sortType === "subcategories") {
      return products.filter(
        (product) =>
          product.subcategories.filter((single) => single === sortValue)[0]
      );
    }
    // if (sortType === "tag") {
    //   return products.filter(
    //     product => product.tag.filter(single => single === sortValue)[0]
    //   );
    // }
    if (sortType === "color") {
      return products.filter(
        (product) => product.color === sortValue
        // product.variation &&
        // product.variation.filter(single => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        (product) => product.size === sortValue
        // product.variation &&
        // product.variation.filter(
        //   single => single.size.filter(single => single.name === sortValue)[0]
        // )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.mrpPrice - a.mrpPrice;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.mrpPrice - b.mrpPrice;
        });
      }
    }
  }
  return products;
};
const getProductCategoryName = async (categoryId) => {
  try {
    console.log(categoryId);
    // Assuming you have a function to fetch the category by ID
    const category = await fetchCategoryById(categoryId);
    console.log(category.category.categoryName);
    // return category ? category.category.categoryName : null;
    return category.category.categoryName;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

const fetchCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(
      `https://padjewels.onrender.com/api/v1/product/cat/${categoryId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    return null;
  }
};
// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter(function (v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];

  products.forEach((product) => {
    // Assuming product.productCategories is an array
    productCategories = productCategories.concat(product.productCategories);
  });

  // Assuming you want to remove duplicates from productCategories
  const uniqueCategories = [...new Set(productCategories)];

  return uniqueCategories;
};

// get individual tags
export const getIndividualTags = (products) => {
  let productTags = [];
  products &&
    products.map((product) => {
      return (
        product.tag &&
        product.tag.map((single) => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = (products) => {
  let color = [];

  products.forEach((product) => {
    // Assuming product.productCategories is an array
    color = color.concat(product.color);
  });

  // Assuming you want to remove duplicates from productCategories
  const uniqueColors = [...new Set(color)];

  return uniqueColors;
};

// get individual sizes
export const getProductsIndividualSizes = (products) => {
  let size = [];

  products.forEach((product) => {
    // Assuming product.productCategories is an array
    size = size.concat(product.size);
  });

  // Assuming you want to remove duplicates from productCategories
  const uniqueSizes = [...new Set(size)];

  return uniqueSizes;
};

// get product individual sizes
export const getIndividualSizes = (product) => {
  let productSizes = [];
  product.variation &&
    product.variation.map((singleVariation) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e) => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
