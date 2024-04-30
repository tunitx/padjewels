import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { toast } from "react-hot-toast";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store/slices/user-slice"; // Update the path

const LoginRegister = () => {
  const dispatch = useDispatch();

  let { pathname } = useLocation();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Handle response, for example, check status and show a message
      if (response.ok) {
        console.log("Login success");
        navigate("/home");
        const userData = await response.json();

        const userId = userData._id; // Adjust this according to your response structure

        dispatch(setUserId(userId));
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set default values for optional fields
      const userDataWithDefaults = {
        firstname: "",
        lastname: "",
        address: "",
        phone: null,
        altNumber: null,
        ...registerData,
      };

      const response = await fetch("http://localhost:8081/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataWithDefaults),
      });

      if (response.ok) {
        console.log("Registration success");
        setRegisterData({
          username: "",
          email: "",
          password: "",
        });
        toast.success("Registration successful!");

        // Redirect to the login tab
        document.getElementById("login-tab").click(); // Trigger click event on login tab
      } else {
        console.error("Registration failed");
        // toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // toast.error("An error occurred. Please try again later.");
    }
  };

  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterInputChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login" id="login-tab">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLoginSubmit}>
                              <input
                                type="email"
                                name="email"
                                placeholder="email"
                                onChange={handleLoginInputChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleLoginInputChange}
                              />
                              {/* ... (rest of the form) */}
                              <button type="submit">
                                <span>Login</span>
                              </button>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegisterSubmit}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleRegisterInputChange}
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange={handleRegisterInputChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleRegisterInputChange}
                              />
                              {/* ... (rest of the form) */}
                              <button type="submit">
                                <span>Register</span>
                              </button>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
