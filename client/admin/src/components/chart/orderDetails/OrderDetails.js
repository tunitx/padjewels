import React, { useState, useEffect } from 'react';
import OrderTrack from './OrderTrack.js'; // Adjust the path based on your project structure
import OrderInformation from './OrderInfo'; // Adjust the path based on your project structure

const OrderDetailsPage = ({ order }) => {


  useEffect(() => {
    console.log(order)
    // You can add any additional logic or API calls here when the component mounts
    // For example, fetching additional data related to the order
  }, [order]); // Add dependencies as needed

  return (
    <div className="" >
      {/* Use OrderTrack and OrderInformation components */}
      <OrderTrack order={order} />
      <OrderInformation order={order} />
    </div>
  );
};

export default OrderDetailsPage;
