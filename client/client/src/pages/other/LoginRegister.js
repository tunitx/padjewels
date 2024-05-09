import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
// import { toast } from "react-hot-toast";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
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
  
    if (loginData.email === 'admin@golokait.com' && loginData.password === 'testing12345') {
      window.location.href = 'https://www.example.com';
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
      } else {
        // Show an error toast
        toast.error("Login failed");
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
        // const userData = await response.json();
        // const token = userData.token; // Adjust this according to your response structure
  
        // // Store the token in local storage
        // localStorage.setItem('my-access-token-of-padjewels', token);
  
        setRegisterData({
          username: "",
          email: "",
          password: "",
        });
  
        // Show a success toast
        toast.success("Registration successful, Now please Log in");
  
        // Redirect to the login tab
        document.getElementById("login-tab").click(); // Trigger click event 
      } else {
        // Show an error toast
        toast.error("Registration failed. Please try again.");
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
                            <label for="email">
                              Email
                            </label>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleLoginInputChange}
                              />
                              <label for="password"> Password</label>
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleLoginInputChange}
                              />
                              {/* ... (rest of the form) */}
                              <button type="submit" className="bg-purple-400 p-2 rounded-md">
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
                            <label for="username">
                              Username
                            </label>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleRegisterInputChange}
                              />

                              <label for="email">
                                Email
                              </label>
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange={handleRegisterInputChange}
                              />
                              <label for="password">
                                Password
                              </label>
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleRegisterInputChange}
                              />
                              {/* ... (rest of the form) */}
                              <button type="submit" className="bg-purple-400 p-2 rounded-md"> 
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
