import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({
  menuWhiteClass,
  sidebarMenu,
  isAuthenticated,
  handleLogout,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      )}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {t("home")}

            </Link>
            
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop-list-standard"}>
              {" "}
              {t("shop")}
             
            </Link>
 
          </li>

          <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>
              {" "}
              {t("About us")}
              
            </Link>
          </li>


         
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("contact_us")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func,
};

export default NavMenu;
