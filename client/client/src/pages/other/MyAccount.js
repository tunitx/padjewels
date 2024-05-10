import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Button from "react-bootstrap/Button";
import { selectUserId } from "../../store/slices/user-slice";
import BASE_URL from "../../constants/Constants";
const MyAccount = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [userData, setUserData] = useState(null); // Initialize with null
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}api/v1/auth/getUser/${userId}`
        );
        if (response.ok) {
          const fetchedUserData = await response.json();
          setUserData(fetchedUserData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error during data fetching:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      // console.log('Updating account information with payload:', JSON.stringify(userData));

      const response = await fetch(
        `${BASE_URL}api/v1/auth/updUser/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        console.log("Account information updated successfully");
        setIsEditMode(false); // Exit edit mode after successful update
      } else {
        console.error(
          "Failed to update account information. Response:",
          response
        );
      }
    } catch (error) {
      console.error("Error during account update:", error);
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => setIsEditMode(!isEditMode)}
                          className="float-end"
                        >
                          {isEditMode ? "Cancel" : "Update Details"}
                        </Button>
                      </Accordion.Header>
                      <Accordion.Body>
                        {userData && (
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Username</label>
                                  <input
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    readOnly={!isEditMode}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input
                                    type="text"
                                    name="firstname"
                                    value={userData.firstname}
                                    readOnly={!isEditMode}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input
                                    type="text"
                                    name="lastname"
                                    value={userData.lastname}
                                    readOnly={!isEditMode}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    readOnly={!isEditMode}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Phone Number</label>
                                  <input
                                    type="number"
                                    name="phone"
                                    value={userData.phone}
                                    readOnly={!isEditMode}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Alternate Number</label>
                                  <input
                                    type="number"
                                    name="altNumber"
                                    value={userData.altNumber}
                                    readOnly={!isEditMode}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              {/* Add other fields as needed */}
                            </div>
                            {/* Continue button and other components */}
                            {isEditMode && (
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button
                                    type="submit"
                                    onClick={handleUpdateAccount}
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="1"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>2 .</span> Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Change Password</h4>
                            <h5>Your Password</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Password</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Password Confirm</label>
                                <input type="password" />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="2"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>3 .</span> Modify your address book entries
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => setIsEditMode(!isEditMode)}
                          className="float-end"
                        >
                          {isEditMode ? "Cancel" : "Update Details"}
                        </Button>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Address Book Entries</h4>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            {/* <div className="billing-info">
                                  <label>Address</label>
                                  <input
                                    type="text"
                                    name="address"
                                    value={userData.address}
                                    readOnly={!isEditMode}
                                    onChange={handleInputChange}
                                  />
                                </div> */}
                          </div>
                          {isEditMode && (
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button
                                  type="submit"
                                  onClick={handleUpdateAccount}
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
