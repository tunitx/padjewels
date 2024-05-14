import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message, Spin } from "antd";
import { GET_PRODUCT_CATEGORIES } from "../constants/Constants";
import { GET_CAT_WITH_SUBCAT } from "../constants/Constants";
import { DELETE_SUBCAT } from "../constants/Constants";
import { CREATE_SUBCAT } from "../constants/Constants";
import { UPDATE_SUBCAT } from "../constants/Constants";
import { ReactComponent as Tanish } from '../assets/images/edit-button-svgrepo-com.svg';
const Subcategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [updateSubcategoryName, setUpdateSubcategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
   
    try {
      const response = await axios.get(
        `${GET_PRODUCT_CATEGORIES}`
      );

      const categoriesWithSubcategories = await Promise.all(
        response.data.map(async (category) => {
          const subcategoriesURL = `${ GET_CAT_WITH_SUBCAT + category._id}`;

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
    setIsLoading(false); 
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
    // const [isLoading, setIsLoading] = useState(false);
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
        `${DELETE_SUBCAT + subcategoryId}`
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
        `${CREATE_SUBCAT}`,
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
        `${ UPDATE_SUBCAT+  selectedSubcategoryId}`,
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
        subcategories && subcategories.length>0 ? (
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

              <button onClick={() =>showUpdateModal(subcategory._id, subcategory.name)}><svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.3rem"
                                viewBox="0 0 512 512"
                                className="mx-auto"
                                fill="#305D2B"
                            >
                                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                            </svg></button>
             
                            <button  onClick={() => handleDeleteSubcategory(subcategory._id)}> <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.3rem"
                                viewBox="0 0 448 512"
                                fill="#EF4D48"
                                className="mx-auto"

                            >
                                {/*!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg></button>
              {/* <Button
                type="danger"
                className="bg-red-500 ml-10 float-right"
                size="small"
               
              >
                Delete
              </Button> */}
            </li>
          ))}
        </ul>
        ) : 'NIL'
        
      ),
    },
    {
      title: "New Subcategory",
      dataIndex: "categoryName",
      key: "newSubcategory",
      width: "20%",
      render: (categoryName, record) => (
        <button
          className="w-[30px] h-[30px]"

          onClick={() => handleNewSubcategory(record._id)}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADWElEQVR4nO2ay08UQRDGf0Zk12BEFhCPcjQY9Z9QQVGBG4o3DV5Egl59nNGTCQl/hwYJJGoQ3w/Ui4LISeVgxJsLBM2ait8knbiz7M727s4SvmSyj66prpqurq7+emATGxcpoAu4CYwBs8BPYFWXff+oNpM5BTQQEySBs8Ak8AfIFHj9BiaAPiBRCQe2A5eBRceoFeABcFUjs09PfJuuBv1nbdeAh7onuP8bMKSHUxYcBxYcA14B54D6CLp2AeeB146+z0AHJYQ9qVGnwzfAEY/624G3jv6RUozOHhluHfwCLgJbfXfCP52XgLQz2i2+lLdquDPKOvspPQ4Ac+pzXjYUhWZH4UugifKhAXisvhcUFZGQdMLpKVBH+VEHPHfCLNKcGXXCyRa7SqHRiQpLAAWn2GBil2NO5DNn0rLJslvei12wTlh2igsGncmfV4hdcdaJUqTYqKgB3sk2cyonEioVTPgw8cMx2ba43qj0ORkijtjiZNLTuQQnJWS1ky+8AJ551NcvG8fDBFIqq1ciFoBhCGonnwvlKrAWZme3OryPX/h2xDAlnSfIgltqtP1E3B25IZ3D2RrH1HiyChzpls472Ro/qdF2cXF3pE06jRf4D0tqTFWBI03S+T1b46oaayMono5APASX3VsoEg5PEBtHHvl2ZKmKQqs5V2htmMk+pkZjAOPuSE+u9BssiEaeVfWC2KVGYwurpUTpDCvGgqLRGMC4OpJyisadYUIT6tRoTF+Yjphiw3BBNt4LlQDOSMi42LhurGZkY+96C81XCR4lfuiUbV/yOYYYkvBMDMmH97JtIJ8bkg7Xa4RyXDAkm+YKORTq0E1pkWOVxiFgWTYVfJQx4jwBoy0rhWaRcmbL7SgKkqKFMiKSK0Fi7xALk9FnopinMescK9jvciEFPHGO44o+8Gl1htbC7CDlmRPz6tOq8r2+FLc4YZYW92rp0DdqlJ2WnXDa7buTpJMAMiKUOzyu2HaUEawTwcQu6dl7uzPsAWvfH/EthpRqp6DsyCiUfJ4Wrzs6g045k1FFauX1dfFObUrbtboadWjUI5kphycIyo6BSr0BkRArPq4tQKHEw5p2pr2VciAb6sXF2q7trs4efzgv1dj3D9qeDks2dD+xCaocfwGfzEwBMfegNQAAAABJRU5ErkJggg=="></img>
        </button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1 className="my-3 md:text-3xl">Categories and Subcategories</h1>

      {isLoading ? (
        <Spin size="large" /> // Render Spin component from antd when loading
      ) : (
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="_id"
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: true }}
        />
      )}
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
