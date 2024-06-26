import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart, decreaseQuantity } from "../../store/slices/cart-slice";
import { deleteFromCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import cogoToast from "cogo-toast";
import axios from "axios";
import { selectUserId } from "../../store/slices/user-slice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../constants/Constants";

const ProductDescriptionInfo = ({
  product,
  // discountedPrice,
  currency,
  // finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  cartItem,
  wishlistItem,
  compareItem,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(product)
  console.log(cartItem)

  const userId = useSelector(selectUserId);
  const [productStock, setProductStock] = useState(product?.stockQuantity);
  // product.variation ? product.variation[0].size[0].stock : product.stock
  const [quantityCount, setQuantityCount] = useState(cartItem ? cartItem.quantity : 0);


  const handleAddToCart = async (productId1) => {
    try {
      console.log(productId1);
      // const { selectedProductColor, selectedProductSize } = product;
      // Make an API call to store the cart item in the database
      console.log(userId);
      const response = await axios.post(
        `${BASE_URL}api/v1/carts/cart/add-item/${userId}`,
        {
          productId: productId1,
          quantity: quantityCount,
          ProductColor: "blue",
          ProductSize: 10,
        }
      );
      const cartData = response.data.cart;
      console.log("data added success", response.data.cart);
      console.log(response.data.cart.items.length);

      // Dispatch the addToCart action with the received data
      dispatch(
        addToCart({
          ...product,
          quantity: quantityCount,
          // selectedProductColor,
          // selectedProductSize,
        })
      );

      cogoToast.success("Product added to cart111", {
        position: "bottom-left",
      });
    } catch (error) {
      console.error("Error adding to cart and database:", error);
      // Handle error scenarios (display error message, etc.)
      cogoToast.error("Failed to add to cart", { position: "bottom-left" });
    }
  };

  return (
    <div className="product-details-content ml-70">
      <h2>{product?.productName}</h2>
      <div className="product-details-price">

        <span>{currency.currencySymbol + finalProductPrice} </span>

      </div>

      <div className="pro-details-list">
        <p>{product?.description}</p>
      </div>



      {/* ) : ( */}
      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() => {
              setQuantityCount(quantityCount > 0 ? quantityCount - 1 : 0);
              dispatch(decreaseQuantity(cartItem));
            }

            }
            className="dec qtybutton"
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            value={quantityCount}
            readOnly
          />
          <button
            onClick={() => {
              setQuantityCount(
                quantityCount < product.stockQuantity
                  ? quantityCount + 1
                  : quantityCount
              );
              dispatch(addToCart(product));
            }}
            className="inc qtybutton"
          >
            +
          </button>
        </div>
        <div className="pro-details-cart btn-hover">
          {product.affiliateLink ? (
            <span oncl>
              Buy Now
            </span>
          ) : product.variation && product.variation.length >= 1 ? (
            <Link to={`${process.env.PUBLIC_URL}/product/${product?._id}`}>
              Select Option
            </Link>
          ) : product.stockQuantity && product.stockQuantity > 0 ? (
            <button
              onClick={() => dispatch(addToCart(product))}
              className={
                cartItem !== undefined && cartItem.quantity > 0
                  ? "active"
                  : ""
              }
              disabled={cartItem !== undefined && cartItem.quantity > 0}
              title={
                cartItem !== undefined ? "Added to cart" : "Add to cart"
              }
            >
              {" "}
              <i className="pe-7s-cart"></i>{" "}
              {cartItem !== undefined && cartItem.quantity > 0
                ? "Added"
                : "Add to cart"}
            </button>
          ) : (
            <button disabled className="active">
              Out of Stock
            </button>
          )}
        </div>
        <div className="pro-details-quality">
        <div className="pro-details-cart btn-hover ml-0">
          <button
            onClick={() => navigate('/cart')}
          >
            Buy Now
          </button>
        </div>
      </div>
        {/* <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="pe-7s-like" />
            </button>
          </div> */}
        {/* <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div> */}
      </div>
      {/* )} */}
      {/* {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )} */}
      {/* {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )} */}


    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  // compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  // discountedPrice: PropTypes.number,
  // finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
