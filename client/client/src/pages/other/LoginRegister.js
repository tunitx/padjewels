import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
// import { toast } from "react-hot-toast";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store/slices/user-slice"; // Update the path
// import { Tab, Nav } from 'react-bootstrap';
const LoginRegister = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('login');

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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleLoginSubmit = async (e) => {
    console.log('hiii')
    e.preventDefault();

    if (loginData.email === 'admin@golokait.com' && loginData.password === 'testing12345') {
      window.location.href = 'https://padjewels.vercel.app/';
      return;
    }
    try {
      const response = await fetch("https://padjewels.onrender.com/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const userData = await response.json();
        const userId = userData._id;
        const token = userData.token;

        // Store the token in local storage
        localStorage.setItem('my-access-token-of-padjewels', token);

        dispatch(setUserId(userId));

        // Show a success toast
        toast.success("Login success");
        navigate("/");
      }  else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Show an error toast
      toast.error("An error occurred during login");
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

      const response = await fetch("https://padjewels.onrender.com/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataWithDefaults),
      });

      if (response.ok) {
        console.log('hoi')
        const userData = await response.json();
        const token = userData.token;

        // Store the token in local storage
        localStorage.setItem('my-access-token-of-padjewels', token);

        setRegisterData({
          username: "",
          email: "",
          password: "",
        });

        // Show a success toast
        toast.success("Registration successful!");
        navigate('/')
        // Redirect to the login tab
        // setActiveTab('login');
        // document.getElementById("login-tab").click(); // Trigger click event 
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Show an error toast
      toast.error("An error occurred. Please try again later.");
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
                  <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
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
                              <label for="email">
                                Email*
                              </label>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleLoginInputChange}
                              />
                              <label for="password">Password*</label>
                              <div style={{ position: 'relative' }}>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  placeholder="Password"
                                  onChange={handleLoginInputChange}
                                  style={{ paddingRight: '30px' }} // Make room for the checkbox
                                />
                                <input
                                  type="checkbox"
                                  checked={showPassword}
                                  onChange={togglePasswordVisibility}
                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '30%',
                                    transform: 'translateY(-50%)'
                                  }}
                                />
                              </div>

                              {/* ... (rest of the form) */}
                              <button type="submit" className="text-white bg-purple-400 p-2 rounded-md hover:bg-purple-500" onClick={handleLoginSubmit}>
                                <span>Log in</span>
                              </button>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegisterSubmit}>
                              <label for="username">
                                Username*
                              </label>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleRegisterInputChange}
                              />

                              <label for="email">
                                Email*
                              </label>
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange={handleRegisterInputChange}
                              />
                              <label for="password">
                                Password*
                              </label>
                              <div style={{ position: 'relative' }}>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  placeholder="Password"
                                  onChange={handleRegisterInputChange}
                                  style={{ paddingRight: '30px' }} // Make room for the checkbox
                                />
                                <input
                                  type="checkbox"
                                  checked={showPassword}
                                  onChange={togglePasswordVisibility}
                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '30%',
                                    transform: 'translateY(-50%)'
                                  }}
                                />
                              </div>
                              {/* ... (rest of the form) */}
                              <button type="submit" className="text-white bg-purple-400 p-2 rounded-md hover:bg-purple-500">
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
