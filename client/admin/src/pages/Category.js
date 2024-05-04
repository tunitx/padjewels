import { Row, Col, Card, Radio, Typography } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import AddCategoryForm from "../components/AddCategoryForm";
import UpdateCategoryForm from "../components/UpdateCategoryForm";
import { DELETE_CAT, GET_PRODUCT_CATEGORIES } from "../constants/Constants";

const { Meta } = Card;
const { Title } = Typography;

const Category = () => {
  const [category, setCategory] = useState([]);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
    useState(false);
  const [isUpdateCategoryModalVisible, setIsUpdateCategoryModalVisible] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const showAddCategoryModal = () => {
    setIsAddCategoryModalVisible(true);
  };

  const hideAddCategoryModal = () => {
    setIsAddCategoryModalVisible(false);
  };

  const showUpdateCategoryModal = (category) => {
    setSelectedCategory(category);
    setIsUpdateCategoryModalVisible(true);
  };

  const hideUpdateCategoryModal = () => {
    setSelectedCategory(null);
    setIsUpdateCategoryModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${GET_PRODUCT_CATEGORIES}`
        );
        const items = response?.data;
        setCategory(items);
        console.log(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryDelete = async (category) => {
    try {
      const categoryId = category._id;
      console.log(categoryId);

      const response = await axios.delete(
        `${ DELETE_CAT + categoryId}`
      );
      const updatedCategories = await axios.get(
        `${GET_PRODUCT_CATEGORIES}`
      );
      setCategory(updatedCategories.data);

      console.log("Product Deleted Successfully");
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
              title="Category Data"
              extra={
                <>
                  <Radio.Group defaultValue="a">
                    <Radio.Button
                      value="a"
                      onClick={showAddCategoryModal}
                      type="primary"
                    >
                      Add Category
                    </Radio.Button>
                    <AddCategoryForm
                      visible={isAddCategoryModalVisible}
                      onClose={hideAddCategoryModal}
                    />
                  </Radio.Group>
                </>
              }
            ></Card>
          </Col>
        </Row>
      </div>

      <Row gutter={[24, 24]}>
        {category.map((category) => (
          <Col key={category?.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{ width: "100%" }}
              actions={[
                // <SettingOutlined key="setting" />,
                <EditOutlined
                  style={{ color: "green" }}
                  key="edit"
                  onClick={() => showUpdateCategoryModal(category)}
                />,
                <DeleteOutlined
                  style={{ color: "red" }}
                  key="delete"
                  onClick={() => handleCategoryDelete(category)}
                />,
              ]}
            >
              <Meta title={category?.categoryName} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* UpdateProductForm */}
      {selectedCategory && (
        <UpdateCategoryForm
          visible={isUpdateCategoryModalVisible}
          onClose={hideUpdateCategoryModal}
          category={selectedCategory}
          onUpdate={(updatedCategory) => {
            // Handle the updated product in your state or any other logic
            console.log("Category updated:", updatedCategory);
            hideUpdateCategoryModal();
          }}
        />
      )}
    </>
  );
};

export default Category;
