import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleForPrivacyPolicy = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Privacy Policy</h5>
          <h1>Introduction</h1>
          <p>
            Welcome to Shukra Jewellery's Privacy Policy. At Shukra Jewellery, we are committed to safeguarding the privacy and security of our customers. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information.{" "}
          </p>
          <br />
          <h1>Information We Collect</h1>
          <p>
            We collect information that you provide to us voluntarily, including but not limited to your name, contact details, billing information, and any other information you choose to share with us during your interactions with Shukra Jewellery.{" "}
          </p>
          <br />
          <h1>How We Use Your Information</h1>
          <p>
            We use the information we collect for purposes including order processing, personalised service, communication, and to improve our products and services. We may also use your information to send you promotional materials and updates about Shukra Jewellery, but you can opt out of these communications at any time.{" "}
          </p>
          <br />
          <h1> Protection of Your Information</h1>
          <p>
            We implement security measures to protect your personal information from unauthorised access, disclosure, alteration, and destruction. Your information is treated with the utmost confidentiality, and we do not sell or rent your personal information to third parties{" "}
          </p>
          <br />
          <h1> Cookies and Similar Technologies</h1>
          <p>
            Shukra Jewellery may use cookies and similar technologies to enhance your browsing experience on our website. You can adjust your browser settings to disable cookies, but this may affect your ability to access certain features of our site.{" "}
          </p>
          <br />
          <h1>Third-Party Links</h1>
          <p>
            Our website may contain links to third-party websites. Shukra Jewellery is not responsible for the privacy practices or content of these third-party sites. We recommend reviewing the privacy policies of any external websites you visit.{" "}
          </p>
          <br />
          <h1>Children's Privacy</h1>
          <p>
            Shukra Jewellery does not knowingly collect personal information from individuals under the age of 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.{" "}
          </p>
          <br />
          <h1>Changes to the Privacy Policy</h1>
          <p>
            Shukra Jewellery reserves the right to update and modify this Privacy Policy. Any changes will be reflected on this page, and the effective date will be amended accordingly. We encourage you to review this Privacy Policy periodically for any updates.{" "}
          </p>
          <br />
          <h1>Contact Us</h1>
          <p>
            If you have any questions, concerns, or requests regarding your privacy or this Privacy Policy, please contact us at <a target="_blank" rel="noreferrer" href="mailto:contact@shukrajewellery.com">contact@shukrajewellery.com</a>.{" "}
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

SectionTitleForPrivacyPolicy.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleForPrivacyPolicy;
