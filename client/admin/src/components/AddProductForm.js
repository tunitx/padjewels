
import React, { useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { PlusOutlined } from "@ant-design/icons";

import { GET_PRODUCT_CATEGORIES } from "../constants/Constants";
import { GET_CAT_WITH_SUBCAT } from "../constants/Constants";
import { ADD_PRODUCT } from "../constants/Constants";


const { Option } = Select;


const AddProductForm = ({ visible, onClose, onAdd }) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const history = useHistory();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [files, setFiles] = useState([]);

  const fileSelected = (info) => {
    console.log(info);
    const fileList = [...info.fileList];
    const files = fileList.map(fileItem => fileItem.originFileObj);
    setFiles(files);
    console.log(files)
    setUploadSuccess(true);
    
    //  message.success(`${files.length} file(s) uploaded successfully`);
  };
  

  useEffect(() => {
    fetchData();
   
  }, []);
 
  

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${GET_PRODUCT_CATEGORIES}`
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
        `${GET_CAT_WITH_SUBCAT +  category}`
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
  
      // const formData = new FormData();
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('productImages', file);
      });
  
      // Append other form data
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
  
      const response = await axios.post(
        `${ADD_PRODUCT}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      // Handle success
      onAdd()
      message.success("Product added successfully");
      form.resetFields();
      onClose();
    } catch (error) {
      // Handle errors
      console.log(error)
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
        <Button key="add" type="primary" className="bg-blue-400" onClick={handleAddProduct}>
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
         <Upload onChange={fileSelected} multiple showUploadList={true}>
    <Button icon={<UploadOutlined />}>Upload Image(Multiple Images Allowed)</Button>
  </Upload>
  
          {/* <Button icon={<UploadOutlined />} onClick={customRequest}>Submit</Button> */}
        </Form.Item>
        {uploadSuccess && <CheckCircleOutlined  className="relative bottom-[55px] left-[150px]" style={{ color: 'green', marginLeft: '10px' }} />} 

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
