import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";
import axios from "axios";

const MenuCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  let cartTotalPrice = 0;

  return (
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {/* const discountedPrice = getDiscountPrice(
                item.mrpPrice,
                item.discount
              ); */}
            {/* const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * item.quantity)
                : (cartTotalPrice += finalProductPrice * item.quantity); */}
            {cartItems.map((item) => {
              const finalProductPrice = (
                item.mrpPrice * currency.currencyRate
              ).toFixed(2);
              cartTotalPrice += Number(finalProductPrice) * item.quantity;

              return (
                <li className="single-shopping-cart" key={item.cartItemId}>
                  {/* <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                      <img
                        alt=""
                        src={process.env.PUBLIC_URL + item.photos[0]}
                        className="img-fluid"
                      />
                    </Link>
                  </div> */}
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                        {" "}
                        {item.name}{" "}
                      </Link>
                    </h4>
                    <h6>Qty: {item.quantity}</h6>
                    <span>
                      {/* {discountedPrice !== null
                        ? currency.currencySymbol + finalDiscountedPrice
                        : currency.currencySymbol + finalProductPrice} */}
                      {currency.currencySymbol + finalProductPrice}
                    </span>
                    {/* {item.selectedProductColor &&
                    item.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {item.selectedProductColor}</span>
                        <span>Size: {item.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )} */}
                  </div>
                  <div className="shopping-cart-delete">
                    <button
                      onClick={() => dispatch(deleteFromCart(item.cartItemId))}
                    >
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {currency.currencySymbol + cartTotalPrice.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            {/* <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout 
            </Link> */}

          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
