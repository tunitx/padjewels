import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

const SalesReportTable = ({ data }) => {
  const columns = [
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
      render: (amount) => (
        <span className="text-lg  text-black">
          {`$${amount.toFixed(2)}`}
        </span>
      ),
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
