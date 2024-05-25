import PropTypes from "prop-types";
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({
    lat,
    lng,
    zoom,
    options,
}) => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7532.963694810895!2d72.85199308538661!3d19.26140107049644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0f0a1968419%3A0x3e7c359c92e6d79f!2sShakti%20Nagar%2C%20Dahisar%20East%2C%20Mumbai%2C%20Maharashtra%20400068!5e0!3m2!1sen!2sin!4v1716616486009!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                title="Google Map"
            ></iframe>
        </div>
    );
};

GoogleMap.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    zoom: PropTypes.number,
    options: PropTypes.shape({}) 
}

GoogleMap.defaultProps = {
    lat: -3.745,
    lng: -38.523,
    zoom: 12,
};

export default GoogleMap;

const Marker = ({ text }) => <div className="map-marker"><img src={`${process.env.PUBLIC_URL + "/assets/img/icon-img/2.png"}`} alt={text}/></div>;