import React, { useState, useEffect } from "react";
import { Table, Tag, Input, Space, Button } from "antd";
import _ from "lodash"; // Import lodash

import { SearchOutlined } from "@ant-design/icons";
import EditUser from "../components/EditUser";
import axios from "axios";

const Tables = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8081/api/v1/auth/getUser`);
      // console.log(res.data[0].firstname);
      setData(res.data);
    };
    // Debounce the fetchData function to delay continuous updates
    const delayedFetchData = _.debounce(fetchData, 500); // Adjust delay time as needed (e.g., 500ms)

    delayedFetchData(); // Call the debounced function

    return () => {
      // Clear any pending debounce calls on unmount
      delayedFetchData.cancel();
    };
    // fetchData();
  }, []);
  // console.log("--->", data[0].firstname);

  // update data code

  const handleUpdate = () => {};

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleDeleteUser = async (userId) => {
    try {
      // Make a DELETE request to delete the user by ID
      await axios.delete(`http://localhost:8081api/v1/auth/delUser/${userId}`);

      // If the deletion is successful, update the UI by refetching the data
      const res = await axios.get("http://localhost:8081/api/v1/auth/getUser");
      setData(res.data);

      // Show success notification
      console.log("User deleted successfully");
    } catch (error) {
      // Show error notification if deletion fails
      // message.error("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex, columnTitle) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="p-4">
        <Input
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-2"
        />
        <Space>
          <button
            onClick={() => handleReset(clearFilters)}
            className="bg-gray-200 text-gray-800 mr-2 rounded px-4 py-2"
          >
            Reset
          </button>
          <button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            className="rounded bg-primary px-4 py-2 text-black"
          >
            OK
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <strong>{text}</strong>
      ) : (
        <span>{text}</span>
      ),
  });

  const columns = [
    {
      title: "SR NO",
      dataIndex: "sr",
      defaultSortOrder: "descend",
      className: "bg-boxdark  p-2.5 text-black text-sm font-medium uppercase",
    },
    {
      title: "USER NAME",
      dataIndex: "username",
      ...getColumnSearchProps("username", "username"),
      className: "bg-boxdark  p-2.5 text-black text-sm font-medium uppercase",
    },
    {
      title: "NAME",
      dataIndex: "firstname",
      ...getColumnSearchProps("name", "firstname"),

      // defaultSortOrder: 'descend',
      // ...getColumnSearchProps('gender', 'Genders'),

      className: "bg-boxdark   text-black hover:bg-unset text-center p-2.5",
    },
    {
      title: "ROLES",
      dataIndex: "role",
      ...getColumnSearchProps("role", "role"),
      className: "bg-boxdark  text-black  p-2.5 text-center",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      filters: [
        {
          text: "active",
          value: "active",
        },
        {
          text: "closed",
          value: "closed",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (Status) => {
        let color = "";
        switch (Status) {
          case "active":
            color = "green";
            break;

          case "closed":
            color = "red";
            break;
          default:
            color = "";
        }
        return (
          <Tag color={color} key={Status}>
            {Status}
          </Tag>
        );
      },
      className: "bg-boxdark  p-2.5 text-center",
    },

    {
      title: "PHONE NUMBER",
      dataIndex: "phone",
      // ...getColumnSearchProps("role", "role"),
      className: "bg-boxdark  text-black  p-2.5 text-center",
    },
    {
      title: "DETAILS",
      dataIndex: "viewMore",
      render: (_, record) => <EditUser data={record} />,
      className: " text-w hite bg-boxdark p-2.5 text-center",
    },
    {
      title: "REMOVE USER",
      dataIndex: "deleteUser",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          className="bg-blue-500 hover:bg-blue-700 rounded"
          onClick={() => handleDeleteUser(record._id)}
        >
          Delete
        </Button>
      ),
      className: "text-white bg-boxdark p-2.5 text-center",
    },
  ];

  const handleViewMore = (record) => {
    // Implement logic to handle "View More" button click
    console.log("View More Clicked for:", record);
  };

  // Generate serial numbers and modify the data
  const dataWithSrNo = data.map((item, index) => ({
    ...item,
    key: (index + 1).toString(), // Assigning unique key for Ant Design Table
    sr: index + 1, // Adding the serial number
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="rounded-sm border border-stroke  px-5 pt-6 pb-2.5 text-black  shadow-default dark:border-strokedark dark:bg-boxdark dark:text-black sm:px-7.5 xl:pb-1">
      <Table
        key={dataWithSrNo.length} // Adding a stable key
        className="text-black dark:text-black"
        columns={columns}
        dataSource={dataWithSrNo}
        onChange={onChange}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default Tables;
