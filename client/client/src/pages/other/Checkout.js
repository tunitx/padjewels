import { Fragment } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import cogoToast from "cogo-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteAllFromCart } from "../../store/slices/cart-slice";

// import dotenv from "dotenv";

const Checkout = () => {
  let cartTotalPrice = 0;
  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const user = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const address =
      billingDetails.apartment +
      " " +
      billingDetails.streetAddress +
      " " +
      billingDetails.city +
      " " +
      billingDetails.state +
      " " +
      billingDetails.country +
      " " +
      billingDetails.postcode;

    if (!paymentMethod) {
      cogoToast.error("Please select a payment method.");
      return;
    }
    const obj = {
      products: cartItems,
      user: user.userId,
      address: address,
      phoneNumber: billingDetails.phoneNumber,
      paymentOption: "COD",
      amount: cartTotalPrice.toFixed(2),
    };
    console.log(obj);
    if (!address || !billingDetails.phoneNumber) {
      cogoToast.error("Please provide address and phone number.");
      return;
    }
    if (paymentMethod === "COD") {
      // Handle COD payment
      try {
        const response = await axios.post(
          "http://localhost:8081/api/v1/order/generateorder",
          {
            products: cartItems,
            user: user.userId,
            address: address,
            phoneNumber: billingDetails.phoneNumber,
            paymentOption: "COD",
            amount: cartTotalPrice.toFixed(2),
          }
        );

        if (response.status === 200) {
          cogoToast.success("Order placed successfully!");
          dispatch(deleteAllFromCart());
          navigate("/orders");
        }
      } catch (error) {
        console.error("Error placing order:", error);

        cogoToast.error("Failed to place order. Please try again.");
      }
    } else if (paymentMethod === "ONLINE") {
      // Handle online payment
      try {
        const response = await axios.post(
          "http://localhost:8081/api/v1/order/generateorder",
          {
            products: cartItems,
            user: user.userId,
            address: address,
            phoneNumber: billingDetails.phoneNumber,
            paymentOption: "ONLINE",
            amount: cartTotalPrice.toFixed(2),
          }
        );

        const order = response.data.paidOrder;

        var options = {
          key: "", // Enter the Key ID generated from the Dashboard
          amount: order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Shukra Jewellars",
          description: " Transaction",
          image: "https://example.com/your_logo",
          order_id: order?.orderId,
          handler: async function (response) {
            const data = await fetch(
              "http://localhost:8081/api/v1/paymentmethod/verifytransaction",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );
            const val = await data.json();
            cogoToast.success(val.message);
          },
          prefill: {
            name: billingDetails.firstName,
            email: billingDetails.email,
            contact: billingDetails.phoneNumber,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        if (response.status === 200) {
          cogoToast.success("Order placed successfully!");
          dispatch(deleteAllFromCart());
          navigate("/orders");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        cogoToast.error("Failed to place order. Please try again.");
      }
    } else {
      cogoToast.error("Please select a payment method.");
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>India</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            name="apartment"
                            placeholder="House number and street name"
                            type="text"
                            onChange={handleInputChange}
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            name="streetAddress"
                            type="text"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input
                            type="text"
                            name="city"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input
                            type="text"
                            name="postcode"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="phoneNumber"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input
                            type="text"
                            name="email"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.mrpPrice * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method">
                        <h4>Payment Method</h4>
                        <div className="payment-method-form">
                          <input
                            type="radio"
                            id="online-payment"
                            name="payment-method"
                            value="ONLINE"
                            className="inline-block h-[10]"
                            onChange={handlePaymentMethodChange}
                          />
                          <label htmlFor="online-payment">Online Payment</label>

                          <input
                            type="radio"
                            id="cod"
                            name="payment-method"
                            value="COD"
                            className="inline-block"
                            onChange={handlePaymentMethodChange}
                          />
                          <label htmlFor="cod">Cash on Delivery (COD)</label>
                        </div>
                      </div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={handleCheckout}>
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
