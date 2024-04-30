import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const AddProductForm = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [file, setFile] = useState();

  const fileSelected = (info) => {
    console.log(info);
    const fileList = [...info.fileList];
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setFile(file);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/product/cat"
      );
      const items = response?.data;
      setCategories(items);
      // Initialize subcategories as an empty array
      setSubcategories([]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/subcategories/subcategories/category/${category}`
      );
      const items = response?.data.subcategories;
      setSubcategories(items);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("productThumbnail", file);
      console.log(file);
      // const response = await axios.post(
      //   "http://localhost:8081/api/v1/product/addProduct",
      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );

      // Make API request to add product
      const response = await axios.post(
        "http://localhost:8081/api/v1/product/addProduct",
        values,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Handle success, e.g., show a success message
      message.success("Product added successfully");
      form.resetFields();
      onClose();
    } catch (error) {
      // Handle errors, e.g., show an error message
      message.error("Failed to add product");
    }
  };

  return (
    <Modal
      title="Add Product"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAddProduct}>
          Add Product
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Product Category"
          name="productCategories"
          rules={[
            {
              required: true,
              message: "Please select a product category",
            },
          ]}
        >
          <Select
            placeholder="Select a Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category?.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Product Sub-Category"
          name="subcategories"
          rules={[
            {
              required: true,
              message: "Please select a product sub-category",
            },
          ]}
        >
          <Select placeholder="Select a Sub-Category">
            {subcategories.map((subcategory) => (
              <Option key={subcategory._id} value={subcategory._id}>
                {subcategory?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Purchase Price"
          name="purchasePrice"
          rules={[
            {
              required: true,
              message: "Please enter the product purchase price",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="MRP Price"
          name="mrpPrice"
          rules={[
            {
              required: true,
              message: "Please enter the product MRP price",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Product Thumbnail Image"
          name="productThumbnail"
          rules={[
            {
              required: true,
              message: "Please enter the product thumbnail image",
            },
          ]}
        >
          <Upload onChange={fileSelected} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {/* <Button icon={<UploadOutlined />} onClick={customRequest}>Submit</Button> */}
        </Form.Item>

        <Form.Item
          label="Stock Quantity"
          name="stockQuantity"
          rules={[
            {
              required: true,
              message: "Please enter the product stock quantity",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Product Size"
          name="size"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Product Color"
          name="color"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductForm;
