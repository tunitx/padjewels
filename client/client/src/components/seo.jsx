import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({ title, titleTemplate, description }) => {
    return (
        <>
            <meta charSet="utf-8" />
            <title>
                {title} | {titleTemplate}
            </title>
            <meta name="description" content={description} />
            <link rel="icon"  />
        </>


    );
};

// SEO.propTypes = {
//     title: PropTypes.string,
//     titleTemplate: PropTypes.string,
//     description: PropTypes.string,
// }

// SEO.defaultProps = {
//     title: "",
//     titleTemplate: "",
//     description: "Product page of flone react minimalist eCommerce template.",
// };

export default SEO;