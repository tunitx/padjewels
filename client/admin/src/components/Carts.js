import React, { useState, useEffect } from "react";
import { Table, Button, Modal, List, Card } from "antd";
import axios from "axios";
import { GET_USER } from "../constants/Constants";
import { GET_CART_DATA } from "../constants/Constants";
import { GET_PRODUCT_DETAILS } from "../constants/Constants";

const Carts = () => {
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${GET_USER}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const 
  fetchCartData = async (userId) => {
    try {
      const response = await axios.get(
        `${GET_CART_DATA + userId}`
      );
      const cartItems = response.data.items;

      const productDetails = await Promise.all(
        cartItems.map(async (cartItem) => {
          const productResponse = await axios.get(
            `${ GET_PRODUCT_DETAILS +  cartItem.productId._id}`
          );
          return { ...cartItem, productDetails: productResponse.data };
        })
      );

      setCartData(productDetails);
      setVisible(true);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          className="bg-blue-600"
          onClick={() => fetchCartData(record._id)}
        >
          View Carts
        </Button>
      ),
    },
  ];

  const handleCloseModal = () => {
    setVisible(false);
    setCartData([]);
  };

  return (
    <div className="container mx-auto p-8">
      <Table
        dataSource={userData}
        columns={columns}
        rowKey="_id"
        scroll={{ x: true }}
      />
      <Modal
        title="Carts"
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <List
          grid={{ gutter: [16, 16], column: 3 }}
          dataSource={cartData}
          renderItem={(item) => (
            <List.Item key={item.productId._id}>
              <Card
                className="bg-gray-200 p-4"
                title={item.productDetails.productName}
              >
                <p className="mb-2">Quantity: {item.quantity}</p>
                <p>Purchase Price: {item.productDetails.purchasePrice}</p>
              </Card>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default Carts;
