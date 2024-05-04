import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Space, Modal, DatePicker } from "antd";
import moment from "moment";
import jsPDF from "jspdf";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import "jspdf-autotable";
import OrderDetailsPage from "./orderDetails/OrderDetails";
import { GET_ALL_ORDERS } from "../../constants/Constants";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]); // Refetch data when startDate or endDate changes

  const fetchData = async () => {
    try {
      let apiUrl = `${GET_ALL_ORDERS}`;

      // Append date filters if available
      if (startDate && endDate) {
        apiUrl += `?startDate=${startDate.format(
          "YYYY-MM-DD"
        )}&endDate=${endDate.format("YYYY-MM-DD")}`;
      }

      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Filtered Data:", data);

      setOrders(data.orders);

      // Calculate total amount
      const total = data.orders.reduce((acc, order) => acc + order.amount, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const handleResetFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const showOrderDetailsModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const orderStatusColorMap = {
    ORDERED: "blue",
    SHIPPED: "purple",
    DELIVERED: "green",
    CANCELLED: "red",
  };

  const paymentStatusColorMap = {
    PAID: "green",
    PENDING: "orange",
    UNPAID: "blue",
    FAILED: "red",
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Order Summary", 20, 20);

    // Filter orders based on the date range
    const filteredOrders = orders.filter(
      (order) =>
        (!startDate ||
          moment(order.createdAt).isSameOrAfter(startDate, "day")) &&
        (!endDate || moment(order.createdAt).isSameOrBefore(endDate, "day"))
    );

    const rows = filteredOrders.map((order) => [
      order._id.slice(-10),
      order.product.length,
      moment(order.createdAt).format("DD-MMM-YYYY h:mm A"),
      order.paymentStatus,
      `$${order.amount.toFixed(2)}`,
      order.paymentOption,
      order.orderStatus,
    ]);

    pdf.autoTable({
      head: [
        [
          "Order ID",
          "Products",
          "Date",
          "Payment Status",
          "Total Amount",
          "Payment Method",
          "Order Status",
        ],
      ],
      body: rows,
    });

    pdf.text(
      `Total Amount: $${totalAmount.toFixed(2)}`,
      20,
      pdf.autoTable.previous.finalY + 10
    );

    pdf.save("order_summary.pdf");
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
      render: (orderId, record) => (
        <span
          className="text-sm"
          onClick={() => showOrderDetailsModal(record)}
          style={{ cursor: "pointer" }}
        >
          {orderId.slice(-10)}
        </span>
      ),
    },
    {
      title: "Products",
      dataIndex: "product",
      key: "product",
      render: (products) => <span className="text-sm">{products.length}</span>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <div>
          <div className="text-sm">
            {moment(createdAt).format("DD-MMM-YYYY")}
          </div>
          <div className="text-xs">{moment(createdAt).format("h:mm A")}</div>
        </div>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      filters: [
        { text: "PAID", value: "PAID" },
        { text: "PENDING", value: "PENDING" },
        { text: "UNPAID", value: "UNPAID" },
        { text: "FAILED", value: "FAILED" },
      ],
      onFilter: (value, record) => record.paymentStatus === value,
      render: (status) => (
        <Tag
          color={paymentStatusColorMap[status]}
          style={{ fontWeight: "bold", fontSize: "12px" }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="text-lg font-semibold text-black">
          ${amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentOption",
      key: "paymentOption",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      filters: [
        { text: "ORDERED", value: "ORDERED" },
        { text: "SHIPPED", value: "SHIPPED" },
        { text: "DELIVERED", value: "DELIVERED" },
        { text: "CANCELLED", value: "CANCELLED" },
      ],
      onFilter: (value, record) => record.orderStatus === value,
      render: (status) => (
        <Tag
          color={orderStatusColorMap[status]}
          style={{ fontWeight: "bold", fontSize: "12px" }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            className="bg-blue-500 hover:bg-blue-700 rounded"
            onClick={() => showOrderDetailsModal(record)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="my-5 float-right">
        <DatePicker placeholder="Start Date" onChange={handleStartDateChange} />
        <DatePicker
          placeholder="End Date"
          onChange={handleEndDateChange}
          style={{ marginLeft: 10 }}
        />
        <Button
          type="primary"
          onClick={fetchData}
          className="bg-blue-500"
          style={{ marginLeft: 10 }}
        >
          Apply Filters
        </Button>
        <Button
          type="primary"
          className="bg-blue-500"
          onClick={downloadPDF}
          style={{ marginLeft: 10 }}
        >
          Download PDF
        </Button>
        <Button
          type="default"
          className="bg-blue-500 text-white"
          onClick={handleResetFilters}
          style={{ marginLeft: 10 }}
        >
          Reset Filters
        </Button>
      </div>

      <Table
        dataSource={orders}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: true }}
      />

      {/* Modal for displaying order details */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && <OrderDetailsPage order={selectedOrder} />}
      </Modal>
    </>
  );
};

export default OrderTable;
