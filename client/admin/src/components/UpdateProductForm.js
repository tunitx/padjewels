// UpdateProductForm.js

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Image, Upload } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { UPDATE_PRODUCT } from "../constants/Constants";

const UpdateProductForm = ({ visible, onClose, product, onUpdate, onAdd }) => {
  const [form] = Form.useForm();
  const [uploadSuccess, setUploadSuccess] = useState(false);
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
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('productImages', file);
      });
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      // console.log(formData);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      // return;

      const response = await axios.put(
        `${UPDATE_PRODUCT + product._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Handle success, e.g., show a success message
      message.success("Product updated successfully");
      onAdd();

      // Close the modal
      onClose();

      // Trigger the onUpdate callback to update the product in the parent component
      onUpdate(response.data); // Assuming the API returns the updated product data
    } catch (error) {
      // Handle errors, e.g., show an error message
      message.error("Failed to update product");
    }
  };
  const handleDeletePhoto = async (photoUrl) => {
    try {
      // Make API request to delete photo
      console.log(photoUrl);


      // Remove the photoUrl from the photos array
      product.photos = product.photos.filter(photo => photo !== photoUrl);

      // Update the form values to reflect the changes in the product
      const values = await form.validateFields();
      values.photos = product.photos;

      // Make API request to update product
      const response = await axios.put(
        `${UPDATE_PRODUCT + product._id}`,
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
      message.error("Failed to delete photo");
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
        <Image.PreviewGroup>
  {product.photos.map((photo, index) => (
    <div key={index} className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-center">
      <Image className="w-64 h-64  object-cover" src={photo.secure_url} />
      </div>
       
        <Button className="relative bottom-4 left-4" onClick={() => handleDeletePhoto(photo)}>Delete</Button>
      </div>
    </div>
  ))}
</Image.PreviewGroup>
        <Form.Item
          label="Product Thumbnail Image"
          name="productThumbnail"

        >
          <Upload onChange={fileSelected} multiple showUploadList={true}>
            <Button icon={<UploadOutlined />}>Upload New Images(Multiple Images Allowed)</Button>
          </Upload>

          {/* <Button icon={<UploadOutlined />} onClick={customRequest}>Submit</Button> */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProductForm;
