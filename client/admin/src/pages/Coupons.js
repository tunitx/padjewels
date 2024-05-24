import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCouponForm from "../components/AddCouponForm";
import { GET_ALL_COUPONS } from "../constants/Constants";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [isAddCouponModalVisible, setIsAddCouponModalVisible] = useState(false);

  const showAddCouponModal = () => {
    setIsAddCouponModalVisible(true);
  };

  const hideAddCouponModal = () => {
    setIsAddCouponModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_ALL_COUPONS);
        console.log(items)
        const items = response?.data;
        setCoupons(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Coupon Name",
      dataIndex: "couponName",
      key: "couponName",
    },
    {
      title: "Coupon Type",
      dataIndex: "couponType",
      key: "couponType",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
  ];

  return (
    <>
      <Button type="primary" className="bg-blue-400" onClick={showAddCouponModal}>
        Add Coupon
      </Button>
      <AddCouponForm
        visible={isAddCouponModalVisible}
        onClose={hideAddCouponModal}
      />
      <Table dataSource={coupons} columns={columns} />
    </>
  );
};

export default Coupon;