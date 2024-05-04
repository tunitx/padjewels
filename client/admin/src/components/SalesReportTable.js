import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

const SalesReportTable = ({ data }) => {
  console.log(data)
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
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
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
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default SalesReportTable;
