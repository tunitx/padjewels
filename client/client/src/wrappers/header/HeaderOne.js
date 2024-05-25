import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";
import HeaderTop from "../../components/header/HeaderTop";
import close from '../../assets/slose.png'
import burger from '../../assets/menu (2).png'
import { Link } from "react-scroll";
import VisibilitySensor from "react-visibility-sensor";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeaderOne = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  return (
    <header className={clsx("header-area clearfix", headerBgClass, headerPositionClass)}>
      <div
        className={clsx(
          "header-top-area",
          headerPaddingClass, top === "visible" ? "d-none d-lg-block" : "d-none",
          borderStyle === "fluid-border" && "border-none"
        )}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          {/* header top */}
          <HeaderTop borderStyle={borderStyle} />
        </div>
      </div>

      <div
        className={clsx(
          headerPaddingClass,
          "sticky-bar header-res-padding clearfix",
          scroll > headerTop && "stick"
        )}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          <div className="row ">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4 flex justify-center ">
              {/* header logo */}
              <Logo imageUrl="/assets/img/logo/logo-2.jpg" logoClass="logo" />
            </div>
           
        {
          !isMobile ? (
            <div className="col-xl-8 col-lg-8  ">
              
              <NavMenu />
                  </div>
          ) : null
        }
          
       
          
            <div className="col-xl-2 col-lg-2 col-md-6 col-4 relative left-14 lg:left-0">
              {/* Icon group */}
              <IconGroup />
            </div>
            {isMobile ? (
              <div className="col-4 w-full flex flex-col justify-center items-end px-5 relative left-3 bottom-1">
          <img
            src={burger}
            onClick={toggleMenu}
            alt=""
            className="animate-rightToLeft transition-all duration-50 bg-white"
          />
          {isOpen && (
            <VisibilitySensor partialVisibility>
              {({ isVisible }) => (
                <div
                className={`flex flex-col w-[110vw] justify-center items-center text-center py-5 px-32  font-josefin text-base bg-white absolute top-[-80%] right-[0px] z-[300] px-auto mx-auto space-y-2 transition-all duration-200 transform ${
                  isOpen && isVisible ? "animate-onLoad opacity-100" : "animate-leftToRight opacity-0"
                }`}
                >
                  <img
                    src={close}
                    onClick={toggleMenu}
                    className="relative left-40 "
                    alt=""
                  />
                  <div className="relative w-full group h-auto ">
                    <span className="hover:cursor-pointer hover:text-gray-300 hover:scale-110 transition-all duration-300">

                    <Link
                      activeClass="active"
                        to="portfolio-section"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                     onClick={() => {
  navigate('/')
}}>
  Home
</Link>
                    </span>
                  </div>
                  <div className="relative w-full group h-auto ">
                    <span className="hover:cursor-pointer hover:text-gray-300 hover:scale-110 transition-all duration-300">
                      <Link
                        activeClass="active"
                        to="portfolio-section"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                      onClick={() => {
  navigate('/shop-list-standard')
}}
                      >
                        Shop
                      </Link>
                    </span>
                  </div>
                  <div className="relative w-full group h-auto">
                    <span className="hover:cursor-pointer hover:text-gray-300 hover:scale-110 transition-all duration-300">
                      <Link
                        activeClass="active"
                        to="portfolio-section"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                      onClick={() => {
  navigate('/about')
}}
                      >
                        About Us
                      </Link>
                    </span>
                  </div>
                  <div className="relative w-full group h-auto">
                    <span className="hover:cursor-pointer hover:text-gray-300 hover:scale-110 transition-all duration-300">
                      <Link
                        activeClass="active"
                        to="portfolio-section"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={() => {
  navigate('/contact')
}}

                      >
                        Contact Us
                      </Link>
                    </span>
                  </div>
                </div>
                
              )}
            </VisibilitySensor>
          )}
        </div>
        ) : (
          <>
            
          </>
        )}
          </div>
        </div>
        {/* mobile menu */}

      </div>
    </header>
  );
};

HeaderOne.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string
};

export default HeaderOne;
