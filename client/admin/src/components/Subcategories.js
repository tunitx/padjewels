import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from "antd";

const Subcategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [updateSubcategoryName, setUpdateSubcategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/product/cat"
      );

      const categoriesWithSubcategories = await Promise.all(
        response.data.map(async (category) => {
          const subcategoriesURL = `http://localhost:8081/api/v1/subcategories/subcategories/category/${category._id}`;

          try {
            const subcategoriesResponse = await axios.get(subcategoriesURL);
            const subcategories = subcategoriesResponse.data.subcategories.map(
              (subcategory) => ({
                ...subcategory,
                categoryName: category.categoryName,
              })
            );

            return {
              ...category,
              subcategories,
            };
          } catch (error) {
            console.error(
              `Error fetching subcategories for ${category.categoryName}:`,
              error
            );
            return {
              ...category,
              subcategories: [],
            };
          }
        })
      );

      setCategories(categoriesWithSubcategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showUpdateModal = (subcategoryId, subcategoryName) => {
    setSelectedSubcategoryId(subcategoryId);
    setUpdateSubcategoryName(subcategoryName);
    form.setFieldsValue({ updateSubcategoryName: subcategoryName }); // Set the value of the form field
    setIsUpdateModalVisible(true);
  };
  const handleCancelUpdate = () => {
    setIsUpdateModalVisible(false);
  };

  const handleNewSubcategory = (categoryId) => {
    form.resetFields();
    setIsModalVisible(true);
    setSelectedCategoryId(categoryId);
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await axios.delete(
        `http://localhost:8081/api/v1/subcategories/subcategories/delete/${subcategoryId}`
      );

      message.success("Subcategory deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting subcategory:", error.message);
      console.error("Full error response:", error.response);
      message.error("Failed to delete subcategory");
    }
  };

  const handleCreateSubcategory = async () => {
    try {
      console.log(newSubcategoryName, selectedCategoryId);
      const response = await axios.post(
        `http://localhost:8081/api/v1/subcategories/createsubcategories`,
        {
          name: newSubcategoryName,
          categoryId: selectedCategoryId,
        }
      );

      console.log("New Subcategory:", response.data.subcategory);
      message.success("Subcategory created successfully");
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      console.error("Error creating subcategory:", error.message);
      message.error("Failed to create subcategory", error.message);
    }
  };

  const handleUpdateSubcategory = async () => {
    try {
      await axios.put(
        `http://localhost:8081/api/v1/subcategories/subcategories/update/${selectedSubcategoryId}`,
        {
          name: updateSubcategoryName,
        }
      );

      message.success("Subcategory updated successfully");
      setIsUpdateModalVisible(false);
      fetchData();
    } catch (error) {
      console.error("Error updating subcategory:", error.message);
      console.error("Full error response:", error.response);
      message.error("Failed to update subcategory");
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "15%",
    },
    {
      title: "Subcategories",
      dataIndex: "subcategories",
      key: "subcategories",
      width: "65%",
      render: (subcategories) => (
        <ul
          style={{
            padding: 0,
            margin: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "60%",
          }}
        >
          {subcategories.map((subcategory) => (
            <li
              key={subcategory._id}
              style={{
                borderBottom: "1px solid #ddd",
                marginBottom: 8,
                padding: "8px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "150%",
              }}
            >
              <span>{subcategory.name}</span>
              <Button
                type="primary"
                className="bg-yellow-500 sm:ml-5 md:mr-52"
                size="small"
                onClick={() =>
                  showUpdateModal(subcategory._id, subcategory.name)
                }
              >
                Update
              </Button>
              <Button
                type="danger"
                className="bg-red-500 ml-10 float-right"
                size="small"
                onClick={() => handleDeleteSubcategory(subcategory._id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "New Subcategory",
      dataIndex: "categoryName",
      key: "newSubcategory",
      width: "20%",
      render: (categoryName, record) => (
        <Button
          type="primary"
          className="bg-blue-500"
          onClick={() => handleNewSubcategory(record._id)}
        >
          New Subcategory for {categoryName}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1 className="my-3 md:text-3xl">Categories and Subcategories</h1>

      <Table
        dataSource={categories}
        columns={columns}
        rowKey="_id"
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: true }}
      />

      <Modal
        title="Create New Subcategory"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleCreateSubcategory}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Subcategory Name"
            name="newSubcategoryName"
            rules={[
              { required: true, message: "Please enter the subcategory name" },
            ]}
          >
            <Input onChange={(e) => setNewSubcategoryName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Subcategory"
        visible={isUpdateModalVisible}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateSubcategory}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Subcategory Name"
            name="updateSubcategoryName"
            rules={[
              { required: true, message: "Please enter the subcategory name" },
            ]}
          >
            <Input
              value={updateSubcategoryName}
              onChange={(e) => setUpdateSubcategoryName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Subcategories;
