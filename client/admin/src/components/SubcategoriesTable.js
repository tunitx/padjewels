
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const SubcategoryTable = ({ subcategories, onDelete, onCreate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Category ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="danger" className="bg-red-500" onClick={() => onDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" className="float-right mb-4 bg-blue-500" onClick={showModal}>
        Create New Subcategory
      </Button>

      <Table dataSource={subcategories} columns={columns} />

      <Modal
        title="Create New Subcategory"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateSubcategoryForm onCreate={onCreate} onCancel={handleCancel} />
      </Modal>
    </>
  );
};

const CreateSubcategoryForm = ({ onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onCreate(values);
    form.resetFields();
    onCancel();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Subcategory Name" rules={[{ required: true, message: 'Please enter the subcategory name' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Create
      </Button>
    </Form>
  );
};

export default SubcategoryTable;