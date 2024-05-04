import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/main.css";
import { Input, Select } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { GET_PAYMENT_OPTIONS, PAYMENT_CONFIG, PAYMENT_CONFIG_UPDATE_STATUS } from "../constants/Constants";

const { Option } = Select;

const PaymentChange = () => {
  const [formData, setFormData] = useState({
    paymentGatewayName: "",
    keyName: "",
    secretKey: "",
  });
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const notify = (value) => toast(`${value} is Selected`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${PAYMENT_CONFIG}`,
        formData
      );

      setFormData({
        paymentGatewayName: "",
        keyName: "",
        secretKey: "",
      });

      fetchPaymentOptions();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleOptionSubmit = async (value) => {
    try {
      console.log(value);

      await axios.post(
        `${PAYMENT_CONFIG_UPDATE_STATUS}` ,
        {
          paymentGatewayName: value,
        }
      );
      notify(value);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const fetchPaymentOptions = async () => {
    try {
      const response = await axios.get(
        `${GET_PAYMENT_OPTIONS}`
      );
      setPaymentOptions(response.data.paymentGatewayNames || []);
    } catch (error) {
      console.error("Error fetching payment options:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium ">
          Payment Gateway Name:
          <Input
            type="text"
            name="paymentGatewayName"
            placeholder="Enter your Payment Gateway Name"
            value={formData.paymentGatewayName}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-2 text-sm font-medium ">
          Key Name:
          <Input
            type="text"
            name="keyName"
            placeholder="Enter your Key name"
            value={formData.keyName}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-2 text-sm font-medium ">
          Secret Key:
          <Input
            type="text"
            name="secretKey"
            placeholder="Enter your Secret Key"
            value={formData.secretKey}
            onChange={handleChange}
          />
        </label>

        <button className="rounded-md  p-2  bg-blue-400 text-white text-base" type="submit">
          Submit
        </button>
      </form>
      <div className="mt-5">
        <h2 className="">Payment Options:</h2>
        <Select
          defaultValue="Select Payment Method"
          style={{ width: 220 }}
          onChange={handleOptionSubmit}
        >
          {loading ? (
            <Option disabled>Loading...</Option>
          ) : (
            paymentOptions.map((paymentGatewayName, idx) => (
              <Option key={idx} value={paymentGatewayName}>
                {paymentGatewayName}
              </Option>
            ))
          )}
        </Select>
      </div>
      <Toaster
        toastOptions={{
          style: {
            border: "1px solid green",
            padding: "16px",
            background: "white",
          },
        }}
      />
    </div>
  );
};

export default PaymentChange;
