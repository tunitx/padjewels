// UpdateProductForm.js

import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";

const UpdateProductForm = ({ visible, onClose, product, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && product) {
      // Set form values when the modal is visible and a product is provided
      form.setFieldsValue({
        productName: product.productName,
        description: product.description,
        productCategories: product.productCategories,
        subcategories: product.subcategories,
        purchasePrice: product.purchasePrice,
        mrpPrice: product.mrpPrice,
        stockQuantity: product.stockQuantity,
      });
    }
  }, [visible, product, form]);

  const handleUpdateProduct = async () => {
    try {
      const values = await form.validateFields();

      // Make API request to update product
      const response = await axios.put(
        `http://localhost:8081/api/v1/product/updateProduct/${product._id}`,
        values
      );

      // Handle success, e.g., show a success message
      message.success("Product updated successfully");

      // Close the modal
      onClose();

      // Trigger the onUpdate callback to update the product in the parent component
      onUpdate(response.data); // Assuming the API returns the updated product data
    } catch (error) {
      // Handle errors, e.g., show an error message
      message.error("Failed to update product");
    }
  };

  return (
    <Modal
      title="Update Product"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdateProduct}>
          Update Product
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
          label="Product Categories"
          name="productCategories"
          rules={[
            { required: true, message: "Please enter the product categories" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Subcategories"
          name="subcategories"
          rules={[
            { required: true, message: "Please enter the subcategories" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Purchase Price"
          name="purchasePrice"
          rules={[
            { required: true, message: "Please enter the purchase price" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="MRP Price"
          name="mrpPrice"
          rules={[{ required: true, message: "Please enter the MRP price" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Stock Quantity"
          name="stockQuantity"
          rules={[
            { required: true, message: "Please enter the stock quantity" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProductForm;
