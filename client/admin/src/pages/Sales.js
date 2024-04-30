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

    fetchData(defaultStartDate, defaultEndDate);
  }, []);

  const fetchData = async (startDate, endDate) => {
    try {
      const apiUrl = "http://localhost:8081/api/v1/sales/salesreport";
      const response = await fetch(
        `${apiUrl}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      const result = await response.json();
      setData(result.productSales);

      const total = result.productSales.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
      fetchData(dates[0], dates[1]);
    } else {
      const defaultStartDate = moment().subtract(1, "months");
      const defaultEndDate = moment();
      setDateRange([defaultStartDate, defaultEndDate]);
      fetchData(defaultStartDate, defaultEndDate);
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Sales Report", 20, 20);

    const rows = data.map((item) => [
      item.productId,
      item.productName,
      item.quantity,
      `$${item.totalAmount.toFixed(2)}`,
      moment(item.createdAt).format("DD-MMM-YYYY h:mm A"),
    ]);

    pdf.autoTable({
      head: [
        ["Product ID", "Product Name", "Quantity", "Total Amount", "Date"],
      ],
      body: rows,
    });

    pdf.text(
      `Total Amount: $${totalAmount.toFixed(2)}`,
      20,
      pdf.autoTable.previous.finalY + 10
    );

    pdf.save("sales_report.pdf");
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
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
          onClick={() => fetchData(dateRange[0], dateRange[1])}
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

      <SalesReportTable data={data} columns={columns} />

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
