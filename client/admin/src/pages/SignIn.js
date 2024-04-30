import React, { useState } from "react";
import { Layout, Card, Form, Input, Button, Typography, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";




const { Content } = Layout;

const SignIn = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    // console.log("Success:", values);
    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        'http://51.20.228.242:5000/api/v1/auth/signin',
        data
      );

      console.log("Login response:", response.data);
      message.success("login succesfully");
      setTimeout(() => {
        history.push("/dashboard");
      }, 200);
      // Handle success response from the server
    } catch (error) {
      message.error("Improper Credentials");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="layout-default h-[100vh] w-full ant-layout layout-sign-up">
        <Content className="flex m-auto justify-center p-auto w-full">
          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Login</h5>}
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

              <Form.Item>
                <Button
                  style={{ width: "100%", height: "30px" }}
                  type="primary"
                  size="small"
                  htmlType="submit"
                  onClick={onFinish}
                  className="bg-blue-500 hover:bg-blue-700 rounded"
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Create an account?{" "}
              <Link to="/sign-up" className="font-bold text-dark">
                Sign Up
              </Link>
            </p>
          </Card>
        </Content>
      </div>
    </>
  );
};

export default SignIn;