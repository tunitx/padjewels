import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleForPrivacyPolicy = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area w-full", spaceTopClass, spaceBottomClass)}>
      <div className="container w-[100%]">
        <div className=" text-center">
          <h1 className="underline">Privacy Policy</h1>
          <br/>
          
          <p>
            This privacy policy sets out how Pad Jewels uses and protects any information that you give Pad Jewels when you use this website.
            Pad Jewels is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.

            Pad Jewels may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from 06/05/2024.

          </p>
          <br />
          <h1 className="underline">Information We Collect</h1>
          <br/>
          <p>
            We may collect the following- <information->
              <ul className='list-disc list-inside'>

                <li>
                  Name and date of birth.

                </li>
                <li>
                  Contact information including email address.

                </li>
                <li>
                  Demographic information such as postcode, preferences and interests

                </li>
                <li>
                  Other information relevant to customer surveys and/or offers

                </li>

              </ul>
            </information->
          </p>
          <br />
          <h1 className="underline">How We Use Your Information</h1>
          <br/>
          <p>
            <ul className="list-disc list-inside">
              <li>
                Internal record keeping.
              </li>
              <li>
                We may use the information to improve our products and services.
              </li>
              <li>
                We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.

              </li>
              <li>
                From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail.
              </li>
              <li>
                We may use the information to customise the website according to your interests.
              </li>
              <li>For enhancing security.</li>
            </ul>
          </p>
          <br />
          {/* <h1> Protection of Your Information</h1>
          <p>
          We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
          </p>
          <br /> */}
          <h1 className="underline"> Cookies and Similar Technologies</h1>
          <br/>
          <p>
            A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.

          </p>

          
          <p>
            We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.

          </p>

          <p>
            Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.

          </p>
          
          <p>
            You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.

          </p>
          <br />
          <h1 className="underline">Controlling your information</h1>
          <p>
            You may choose to restrict the collection or use of your personal information in the following ways:
          </p>

          <p>
            Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes. If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at support <a href="mailto:supportpadjewels@support.com" className="text-gray-500 font-bold">padjewels@support.com</a>
          </p>

        
          
          <p>
            We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen. If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect
          </p>
          
          <br />
         

          {/* <br />
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
          <br /> */}
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
