import React from "react";
import { Table, Space, Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import gsap from "gsap";
import { useToaster } from "react-hot-toast";
import { BASE_URL } from "../../../constants/Constants";

const TrackOrder = ({ order }) => {
  const orderStatusMap = {
    ORDERED: { text: "Order Placed" },
    SHIPPED: { text: "Shipped" },
    DELIVERED: { text: "Delivered" },
    CANCELLED: { text: "Cancelled" },
  };

  const animateDot = (dotElement) => {
    gsap.fromTo(
      dotElement,
      { scale: 0.5 },
      {
        scale: 1,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      }
    );
  };

  const { success } = useToaster();

  const handleMenuClick = async ({ key }) => {
    try {
      console.log(order._id);
      const response = await fetch(
        `${BASE_URL}order/${order._id}/orderstatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus: key }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        if (response.status === 200) {
          console.log(responseData.message);
          console.log("Updated Order:", responseData.updatedOrder);

          // Show toast notification
          success("Order status updated successfully");
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } else {
        console.error("Failed to update order status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="ORDERED">Order Placed</Menu.Item>
      <Menu.Item key="SHIPPED">Shipped</Menu.Item>
      <Menu.Item key="DELIVERED">Delivered</Menu.Item>
      <Menu.Item key="CANCELLED">Cancelled</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text}`,
    },
  ];

  const dataSource = order.product.map((product) => ({
    key: product.product_id,
    product: product.productName,
    count: product.quantity,
    price: product.mrpPrice.toFixed(2),
  }));

  const total = order.product
    .reduce((acc, product) => acc + product.mrpPrice * product.quantity, 0)
    .toFixed(2);
    console.log(dataSource)

  return (
    <div className="flex flex-col md:flex-row overflow-y-auto">
      <div className="flex flex-col w-full">
        {/* Order Status Box */}
        <div className="md:w-full h-1/2">
          <div className="bg-slate-200 p-4 h-auto md:h-full w-full rounded-md shadow-md mb-4 md:mb-0">
            <h4 className="header-title mb-3 text-xl font-bold text-gray-800">
              Order Status
            </h4>
            <div className="flex flex-row">
              <div className="track-order-list relative">
                {Object.keys(orderStatusMap).map((status, index) => (
                  <React.Fragment key={status}>
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-6 h-6 rounded-full ${
                          order.orderStatus === status
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                        {...(order.orderStatus === status
                          ? { ref: (dot) => dot && animateDot(dot) }
                          : {})}
                      ></div>{" "}
                      <div className="ml-4">
                        <h5 className={`mt-0 mb-1 text-sm font-bold`}>
                          {orderStatusMap[status].text}
                        </h5>
                      </div>
                    </div>
                    {index !== Object.keys(orderStatusMap).length - 1 && (
                      <div
                        className={`absolute top-0 left-8 w-1 bg-gray-300 h-full`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="bg-slate-400 h-8 text-white relative left-20 bottom-12">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Update Status <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address Box */}
        <div className="md:w-full">
          <div className="bg-slate-200 p-4 my-4 h-auto md:h-full w-full rounded-md shadow-md mb-4 md:mb-0">
            <h4 className="header-title mb-3 text-xl font-bold text-gray-800">
              Shipping Address
            </h4>
            <p className="text-sm">
            <span className="font-bold">Name:</span> {`${order.firstName} ${order.lastName}`}
            </p>
            <p className="text-sm">
              <span className="font-bold">Address:</span> {order.address}
            </p>
            <p className="text-sm">
              <span className="font-bold">Phone Number:</span>{" "}
              {order.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Product Table Box */}
      <div className="w-full md:ml-4">
        <div className="mt-4">
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <div className="text-right mt-4">
            <Space>
              <span className="font-bold text-lg">Total:</span>
              <span className="text-xl total-amount">${total}</span>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
