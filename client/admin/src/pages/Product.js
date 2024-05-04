import {
  Row,
  Col,
  Card,
  Modal,
  Form,
  Input,
  Button,
  message,
  Radio,
  Typography,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import AddProductForm from "../components/AddProductForm";
import UpdateProductForm from "../components/UpdateProductForm";
import { GET_ALL_PRODUCTS } from "../constants/Constants";

const { Meta } = Card;
const { Title } = Typography;

const Product = () => {
  const [product, setProduct] = useState([]);
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false);
  const [isUpdateProductModalVisible, setIsUpdateProductModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showAddProductModal = () => {
    setIsAddProductModalVisible(true);
  };

  const hideAddProductModal = () => {
    setIsAddProductModalVisible(false);
  };

  const showUpdateProductModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateProductModalVisible(true);
  };

  const hideUpdateProductModal = () => {
    setSelectedProduct(null);
    setIsUpdateProductModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${GET_ALL_PRODUCTS}`,
        );
        const items = response?.data;
        setProduct(items);
        console.log(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleProductDelete = async (product) => {
    try {
      const productId = product._id;
      console.log(productId);

      const response = await axios.delete(
        `http://localhost:8081/api/v1/product/deleteProduct/${productId}`
      );

      const updatedProducts = await axios.get(
        "http://localhost:8081/api/v1/product"
      );
      setProduct(updatedProducts.data);

      console.log("Product Deleted Successfully");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const handleUpdatedProduct = async (product) => {
    try {
      const productId = product._id;
      console.log(productId);

      const response = await axios.put(
        `http://localhost:8081/api/v1/product/updateProduct/${productId}`
      );
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <>
      <div>
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Product Data"
              extra={
                <>
                  <Radio.Group defaultValue="a">
                    <Radio.Button
                      value="a"
                      onClick={showAddProductModal}
                      type="primary"
                    >
                      Add Product
                    </Radio.Button>
                    <AddProductForm
                      visible={isAddProductModalVisible}
                      onClose={hideAddProductModal}
                    />
                  </Radio.Group>
                </>
              }
            ></Card>
          </Col>
        </Row>
      </div>

      <Row gutter={[24, 24]}>
        {product.map((product) => (
          <Col key={product?.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{ width: "100%", overflow: "hidden" }}
              cover={
                <div className="h-[180px] overflow-hidden bg-cover justify-center items-center flex w-full">
                  <img
                    alt="productThumbnailImage"
                    src={product?.photos[0]?.secure_url}
                  />
                </div>
              }
              actions={[
                // <SettingOutlined key="setting" />,
                <EditOutlined
                  style={{ color: "green" }}
                  key="edit"
                  onClick={() => showUpdateProductModal(product)}
                />,
                <DeleteOutlined
                  style={{ color: "red" }}
                  key="delete"
                  onClick={() => handleProductDelete(product)}
                />,
              ]}
            >
              <Meta
                title={product?.productName}
                description={product?.description}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* UpdateProductForm */}
      {selectedProduct && (
        <UpdateProductForm
          visible={isUpdateProductModalVisible}
          onClose={hideUpdateProductModal}
          product={selectedProduct}
          onUpdate={(updatedProduct) => {
            // Handle the updated product in your state or any other logic
            console.log("Product updated:", updatedProduct);
            hideUpdateProductModal();
          }}
        />
      )}
    </>
  );
};

export default Product;
