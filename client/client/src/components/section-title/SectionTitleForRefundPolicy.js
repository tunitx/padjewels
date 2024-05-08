import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleForRefundPolicy = ({ spaceTopClass, spaceBottomClass }) => {
    return (
        <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
            <div className="container">
                <div className="welcome-content text-center">
                    <h5>Refund Policy</h5>
                    <h1>Introduction</h1>
                    <p>
                        Please read this Policy carefully, as it forms a binding agreement between you and [website name]. If you do not accept this Policy in its entirety, then you may not purchase our products or place an order with us. By placing an order with us or by clicking on a button or taking similar action to signify your affirmative acceptance of this Policy, you hereby represent that:
                    </p>
                    <br />
                    <p>
                        You have read, understood, and agreed to be bound by this Policy, our Disclaimer, Terms & Conditions, Shipment Policy, Privacy Policy, and Cookie Policy, and any future updates and additions to these policies, as published from time to time at the Website or as otherwise may be communicated to you.
                    </p>
                    <br />

                    <p>
                        You are of sound mind and at least of such minimum legal age as per the jurisdiction in which you reside, in order to form a binding contract with us. In case you are not of the age of majority as per the laws of the jurisdiction that you reside in, then you must have the permission of your lawful guardian to place an order or make purchases on the Website.
                    </p>
                    <br />
                    <p>
                        We must not have previously disabled your account for violation of law or any of our policies.
                    </p>
                    <br />
                    <h1>Return & Refund Policy
                    </h1>
                    <p className="mb-12"> 
                        In case of returning the order , return request should be initiated within 24 hours of receiving the order. Unboxing video is must for returning the product or your return request will be denied.

                        <information->
                            <ul className='list-disc list-inside mt-2'>

                                <li className="py-2">
                                    Damage & Missing Product: We follow a 3-layer checking process to avoid any damage or misses from our end.  Return can take place if the customer receives the product in a damaged condition and reports the same within 24 hours of receiving their order, provided that you must have proof of an unboxing video clearly showing the damage in the product. Breach of this section will lead to rejection of the return/exchange request.

                                    In case a user buys multiple products, only the damaged product will be accepted.

                                    You will receive a full refund to your original payment method for the price of the damaged item(s) within 7 days after the product is received by us.

                                    We won’t be charging you any return shipping or handling fees.


                                </li>

                                <li>
                                    Dislike: In case of dislike of any product upon delivery within 24 hours. A Return/ Exchange won't be arranged by us due to the affordable nature of our product. However, if you dislike a product you can return it back to us and we will proceed with the refund upon delivery of the same. Please note that the shipping charges won't be refunded by us. You can mail us at support Pad Jewels.

                                </li>
                            </ul>
                            <br />
                            <p>You will receive a refund to your original payment method for the price of the disliked item(s) within 7 days after the product is received by us, provided that the product is not used and is in good condition. Upon Rejection of the same refund won't be initiated
                            </p>
                        </information->
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

SectionTitleForRefundPolicy.propTypes = {
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string
};

export default SectionTitleForRefundPolicy;
