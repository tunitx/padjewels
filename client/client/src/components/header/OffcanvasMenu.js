import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import HeaderSocial from "./sub-components/HeaderSocial";
import NavMenu from "./NavMenu";
import { useState } from "react";

const OffcanvasMenu = ({ activeState, getActiveState }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    // Perform logout logic (e.g., clear authentication token, reset user state)
    setIsAuthenticated(false);
  };
  return (
    <div className={clsx("clickable-mainmenu", activeState ? "inside" : "")}>
      <div className="clickable-mainmenu-icon">
        <button
          className="clickable-mainmenu-close"
          onClick={() => getActiveState(false)}

        >
          <span className="pe-7s-close"></span>
        </button>
      </div>
      <div className="side-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img
            alt=""
            src={process.env.PUBLIC_URL + "/assets/img/logo/logo.png"}
          />
        </Link>
      </div>
      {/* nav menu*/}
      <NavMenu
        sidebarMenu={true}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />

      {/* header social */}
      <HeaderSocial />
    </div>
  );
};

OffcanvasMenu.propTypes = {
  activeState: PropTypes.bool,
  getActiveState: PropTypes.func,
};

export default OffcanvasMenu;
