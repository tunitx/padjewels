import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteAllFromWishlist } from "../../store/slices/wishlist-slice";
import { deleteAllFromCart } from "../../store/slices/cart-slice";



const IconGroup = ({ iconWhiteClass, sidebarMenu, menuWhiteClass }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };
  const [isPagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  // New function for toggling the dropdown
  const togglePagesDropdown = () => {
    setPagesDropdownOpen(!isPagesDropdownOpen);
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const [token, setToken] = useState(localStorage.getItem('my-access-token-of-padjewels'));

  const handleSignOut = () => {
    localStorage.removeItem('my-access-token-of-padjewels');
    setToken(null); // Update the token state
    toast.success("Signed out successfully");
    dispatch(deleteAllFromCart());
    dispatch(deleteAllFromWishlist());
    // dispatch(resetWishlist());
  };

  return (
    <>
      <div className={clsx("header-right-wrap", iconWhiteClass, {
        "sidebar-menu": sidebarMenu,
        [`main-menu ${menuWhiteClass ? menuWhiteClass : ""}`]: !sidebarMenu
      })}>
      


        {/* <div className="same-style header-search d-none d-lg-block">
          <button className="search-active" onClick={e => handleClick(e)}>
            <i className="pe-7s-search" />
          </button>
          <div className="search-content">
            <form action="#">
              <input type="text" placeholder="Search" />
              <button className="button-search">
                <i className="pe-7s-search" />
              </button>
            </form>
          </div>
        </div> */}
        <div className="same-style account-setting d-none d-lg-block">
          <button
            className="account-setting-active"
            onClick={e => handleClick(e)}
          >
            <i className="pe-7s-user-female" />
          </button>
          <div className="account-dropdown">
            <ul>
              {!token ? (
                <>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/login-register"}>
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/my-account"}>
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/"} onClick={handleSignOut}>
                      Sign Out
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/orders"} >
                      Orders
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="same-style header-wishlist">
          <Link to={process.env.PUBLIC_URL + "/wishlist"}>
            <i className="pe-7s-like" />
            <span className="count-style">
              {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
            </span>
          </Link>
        </div>
        <div className="same-style cart-wrap d-none d-lg-block">
          <button className="icon-cart" onClick={e => handleClick(e)}>
            <i className="pe-7s-shopbag" />
            <span className="count-style">
              {cartItems && cartItems.length ? cartItems.length : 0}
            </span>
          </button>
          {/* menu cart */}
          <MenuCart />
        </div>
        <div className="same-style cart-wrap d-block d-lg-none">
          <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
            <i className="pe-7s-shopbag" />
            <span className="count-style">
              {cartItems && cartItems.length ? cartItems.length : 0}
            </span>
          </Link>
        </div>
        



      </div>
      

    </>

  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};



export default IconGroup;
