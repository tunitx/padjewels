import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import { UPDATE_CAT } from "../constants/Constants";

const UpdateCategoryForm = ({ visible, onClose, category, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && category) {
      // Set form values when the modal is visible and a product is provided
      form.setFieldsValue({
        categoryName: category.categoryName,
      });
    }
  }, [visible, category, form]);

  const handleUpdateCategory = async () => {
    try {
      const values = await form.validateFields();
      const categoryId = category?._id;
      console.log("Category ID:", categoryId);

      // Log the values being sent to the API
      console.log("Updating category with values:", values);

      // Verify the category ID

      // Make API request to update category
      const response = await axios.put(
        `${ UPDATE_CAT + categoryId}`,
        values
      );

      message.success("Category Updated successfully");
      window.location.reload();

      onClose();

      onUpdate(response.data);
      // Log the response received from the API
    } catch (error) {
      console.error("Failed to update Category:", error);

      // Handle errors, e.g., show an error message
      message.error("Failed to update Category");
    }
  };

  return (
    <Modal
      title="Update Category"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdateCategory}>
          Update Category
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

export default UpdateCategoryForm;
