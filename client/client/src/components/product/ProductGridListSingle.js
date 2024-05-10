import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { selectWishlistItems } from "../../store/slices/wishlist-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import heart from '../../assets/heart (4).png'
import heart2 from '../../assets/heart (5).png'
import { useSelector } from 'react-redux';

import { useEffect } from "react";
const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);



  
  // const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product?.mrpPrice).toFixed(2);
  // const finalDiscountedPrice = +(
  //   discountedPrice * currency.currencyRate
  // ).toFixed(2);
  const dispatch = useDispatch();
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeWishlist, setActiveWishlist] = useState(null);

  const wishlistItems = useSelector(selectWishlistItems);

  useEffect(() => {
    const wishlistItem = wishlistItems.find(item => item._id === product._id);
    if (wishlistItem) {
      setActiveWishlist(product._id);
    }
  }, [wishlistItems, product._id]);
  

// useEffect(() => {
//   const wishlistItem = wishlistItems.find(item => item._id === product._id);
//   if (wishlistItem) {
//     setActiveWishlist(product._id);
//   }
// }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setActiveProduct(product._id);
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    setActiveWishlist(product._id);
  };

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product?._id}>
            <img
              className="default-img"
              // src={product?.photos[0]?.secure_url}
              src={product?.photos[0]?.secure_url}
              alt="productThumbnail"
            />
            {product.photos.length > 1 ? (
              <img
                className="hover-img"
                src={product?.photos[0]?.secure_url}
                alt="productThumbnail"
              />
            ) : (
              ""
            )}
          </Link>
          {/* {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )} */}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
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
            </div>
            <div className="pro-same-action pro-cart">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  Buy now{" "}
                </a>
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
            <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product?._id}>
              {product?.productName}
            </Link>
          </h3>
          {/* {product.rating && product.rating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={product.rating} />
              </div>
            ) : (
              ""
            )} */}
          <div className="product-price">
            {/* {discountedPrice !== null ? ( */}
            <Fragment>
              {/* <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "} */}
              <span className="old">
                {currency.currencySymbol + finalProductPrice}
              </span>
            </Fragment>
            {/* ) : ( */}
            <span>{currency.currencySymbol + finalProductPrice} </span>
            {/* )} */}
          </div>
        </div>
      </div>
      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              <div className="product-img">
                <Link to={process.env.PUBLIC_URL + "/product/" + product?._id}>
                  <img
                    className="default-img img-fluid"
                    src={product?.photos[0]?.secure_url}
                    alt="productThumbnail"
                  />
                  {product.photos.length > 1 ? (
                    <img
                      className="hover-img img-fluid"
                      src={product?.photos[0]?.secure_url}
                      alt="productThumbnail"
                    />
                  ) : (
                    ""
                  )}
                </Link>
                {/* {product.discount || product.new ? (
                    <div className="product-img-badges">
                      {product.discount ? (
                        <span className="pink">-{product.discount}%</span>
                      ) : (
                        ""
                      )}
                      {product.new ? <span className="purple">New</span> : ""}
                    </div>
                  ) : (
                    ""
                  )} */}
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <h3>
                <Link to={process.env.PUBLIC_URL + "/product/" + product?._id}>
                  {product?.productName}
                </Link>
              </h3>
              <div className="product-list-price">
                {/* {discountedPrice !== null ? ( */}
                <Fragment>
                  <span>
                    {/* {currency.currencySymbol + finalDiscountedPrice} */}
                  </span>{" "}
                  <span className="old">
                    {currency.currencySymbol + finalProductPrice}
                  </span>
                </Fragment>
                {/* ) : ( */}
                <span>{currency.currencySymbol + finalProductPrice} </span>
                {/* )} */}
              </div>
              {/* {product.rating && product.rating > 0 ? (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
              {product?.description ? <p>{product?.description}</p> : ""}

              <div className="shop-list-actions d-flex align-items-center">
                <div className="shop-list-btn btn-hover">
                  {/* Rendering different buttons based on product properties */}
                  {product.affiliateLink ? (
                    // If it's an affiliate product
                    <a
                      href={product.affiliateLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Buy now
                    </a>
                  ) : product.variation && product.variation.length >= 1 ? (
                    // If it has variations
                    <Link
                      to={`${process.env.PUBLIC_URL}/product/${product?._id}`}
                    >
                      Select Option
                    </Link>
                  ) : product.stockQuantity && product.stockQuantity > 0 ? (
                    // If it's in stock
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={activeProduct === product._id ? "active" : ""}
                      disabled={activeProduct === product._id}
                      title={
                        activeProduct === product._id
                          ? "Added to cart"
                          : "Add to cart"
                      }
                    >
                      <i className="pe-7s-cart"></i>{" "}
                      {activeProduct === product._id ? "Added" : "Add to cart"}
                    </button>
                  ) : (
                    // If it's out of stock
                    <button disabled className="active">
                      Out of Stock
                    </button>
                  )}
                </div>

                <div className="shop-list-wishlist ml-10">
                  {/* Wishlist button */}
                  <button
                    className={activeWishlist === product._id ? "active" : ""}
                    disabled={activeWishlist === product._id}
                    title={
                      activeWishlist === product._id
                        ? "Added to wishlist"
                        : "Add to wishlist"
                    }
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <img
                      src={activeWishlist === product._id ? heart : heart2}
                      alt=""
                      className="wishlist-icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        // discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        // finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;
