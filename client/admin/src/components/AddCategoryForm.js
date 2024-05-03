import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import { ADD_CATEGORY } from "../constants/Constants";

const AddCategoryForm = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleAddCategory = async () => {
    try {
      const values = await form.validateFields();

      // Make API request to add product
      const response = await axios.post(
        `${ADD_CATEGORY}`,
        values
      );

      // Handle success, e.g., show a success message
      message.success("Category added successfully");
      form.resetFields();
      window.location.reload();
      // Close the modal
      onClose();
    } catch (error) {
      // Handle errors, e.g., show an error message
      message.error("Failed to add category");
    }
  };

  return (
    <Modal
      title="Add Category"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="add"
          type="primary"
          className="bg-blue-500"
          onClick={handleAddCategory}
        >
          Add Category
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[
            { required: true, message: "Please enter the category name" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryForm;
