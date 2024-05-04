import React, { useState, useEffect } from "react";
import { Modal, DatePicker, Button } from "antd";
import moment from "moment";
import jsPDF from "jspdf";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import "jspdf-autotable";
import SalesReportTable from "../components/SalesReportTable";

const { RangePicker } = DatePicker;

const SalesReportPage = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  

  useEffect(() => {
    const defaultStartDate = moment().subtract(1, "months");
    const defaultEndDate = moment();

    setDateRange([defaultStartDate, defaultEndDate]);

    // fetchData(defaultStartDate, defaultEndDate);
    fetchOrders(defaultStartDate, defaultEndDate);
  }, []);
  const fetchOrders = async (startDate, endDate) => {
    try {
      let apiUrl = `http://localhost:8081/api/v1/order/allorders/`;
  
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
  
      // Flatten the products array from each order into a single array
      const products = data.orders.flatMap(order => 
        Array.isArray(order.product) 
          ? order.product.map(product => ({
            productName: product.productName || 'Default Product Name',
            productQuantity: product.productQuantity || 'Default Quantity',
            mrp: product.mrpPrice,
            amount: (product.mrpPrice * (product.productQuantity || 1)) || 'Default Amount',
            orderId: order.orderId,
            createdAt: order.createdAt,
          }))
          : []
      );
      console.log(products)
      setTotalAmount(products.amount)
      setData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
      fetchOrders(dates[0], dates[1]);
    } else {
      const defaultStartDate = moment().subtract(1, "months");
      const defaultEndDate = moment();
      setDateRange([defaultStartDate, defaultEndDate]);
      fetchOrders(defaultStartDate, defaultEndDate);
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Sales Report", 20, 20);

    const rows = data.map((item) => [
      item.orderId,
      item.productName,
      item.productQuantity,
      item.mrp,
      item.amount,
      item.createdAt,
    ]);
    
    const overallAmount =  data.reduce((total, item) => total + (typeof item.amount === 'number' ? item.amount : 0), 0);
    pdf.autoTable({
      head: [
        ["Order ID", "Product Name", "Quantity", "Product Price",  "Total Amount", "Created At"],
      ],
      body: rows,
    });

    pdf.text(
      `Total Amount: $${overallAmount}`,
      20,
      pdf.autoTable.previous.finalY + 10
    );

    pdf.save("sales_report.pdf");
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Product price",
      dataIndex: "productPrice",
      key: "mrp",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return (
    <>
      <div className="my-5 float-right">
        <RangePicker
          placeholder={["Start Date", "End Date"]}
          format="YYYY-MM-DD"
          onChange={handleDateChange}
          defaultValue={dateRange}
        />
        <Button
          type="primary"
          onClick={() => fetchOrders(dateRange[0], dateRange[1])}
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
      </div>

      <SalesReportTable data={data} columns = {columns}  />

      {/* Modal for displaying order details */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {/* Render your modal content here */}
      </Modal>
    </>
  );
};

export default SalesReportPage;
