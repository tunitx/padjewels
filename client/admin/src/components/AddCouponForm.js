import React from 'react';
import { Modal, Form, Input, Button, message, Select } from 'antd';
import {ADD_COUPON} from '../constants/Constants';
import axios from 'axios';

const AddCouponForm = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleAddCoupon = async () => {
    try {
      const values = await form.validateFields();

      const response = await axios.post(ADD_COUPON, values);

      // Handle success, e.g., show a success message
      message.success("Coupon added successfully");
      form.resetFields();
      onClose();
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.log(error)
      message.error("Failed to add coupon");
    }
  };

  return (
    <Modal
      title="Add Coupon"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="add" type="primary" className='bg-blue-400' onClick={handleAddCoupon}>
          Add Coupon
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Coupon Name"
          name="couponName"
          rules={[{ required: true, message: "Please enter the coupon name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Coupon Type"
          name="couponType"
          rules={[{ required: true, message: "Please select the coupon type" }]}
        >
          <Select placeholder="Select a type">
            <Select.Option value="%">%</Select.Option>
            <Select.Option value="Rs">Rs</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Cost"
          name="cost"
          rules={[{ required: true, message: "Please enter the cost" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCouponForm;