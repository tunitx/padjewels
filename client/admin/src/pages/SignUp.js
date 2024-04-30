import React, { useState } from "react";
import { Layout, Card, Form, Input, Button, Typography, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;
const { Content } = Layout;

const SignUp = () => {
  const history = useHistory();
  // Function to generate a random number between 100 and 999
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100000) + 100;
  };

  const onFinish = async (values) => {
    // console.log("Success:", values);
    const data = {
      firstname,
      lastname,
      username,
      phone,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/auth/signup",
        data
      );

      console.log("Registration response:", response.data);
      message.success("user regisered succesfully");
      setTimeout(() => {
        history.push("/dashboard");
      }, 2000);
      // Handle success response from the server
    } catch (error) {
      console.error("Error occurred while registering:", error);
      // Handle error response from the server or other errors
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");

  const handleFirstnameChange = (value) => {
    setFirstname(value);
    // Generate a random number and append it to the firstname to create the username
    const randomNum = generateRandomNumber();
    setUsername(value + randomNum);
  };
  console.log(username);

  return (
    <>
      <div className="layout-default h-[100vh] w-full ant-layout layout-sign-up">
        <Content className="flex m-auto justify-center p-auto w-full">
          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Register</h5>}
            bordered={false}
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Form.Item
                name="firstname"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input
                  type="text"
                  onChange={(e) => handleFirstnameChange(e.target.value)}
                  placeholder="First Name"
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  { required: true, message: "Please input your Last Name!" },
                ]}
              >
                <Input
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last Name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Please input your Phone!" },
                ]}
              >
                <Input
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%", height: "30px" }}
                  type="primary"
                  size="small"
                  htmlType="submit"
                  onClick={onFinish}
                  className="bg-blue-500 hover:bg-blue-700 rounded"
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
          </Card>
        </Content>
      </div>
    </>
  );
};

export default SignUp;
