import React from 'react';
import { Row, Col, Card } from 'antd';
import { DollarCircleOutlined, TransactionOutlined, CheckCircleOutlined, CarOutlined } from '@ant-design/icons';

const { Meta } = Card;

const OrderInfo = ({ order }) => {
  const { paymentOption, transactionId, paymentStatus, _id, createdAt } = order;

  return (
    <div className="my-6">
      <Row gutter={[16, 16]}>
        {/* Billing Information Box */}
        <Col xs={24} md={12}>
          <Card
            title="Billing Information"
            bordered={false}
            className="w-full bg-slate-200"
            // style={{ width: '100%', background: '#f0f4f7' }}
            actions={[
              <DollarCircleOutlined key="paymentOption" />,
              <TransactionOutlined key="transactionId" />,
              <CheckCircleOutlined key="paymentStatus" />,
            ]}
          >
            <Meta title={`Payment Option: ${paymentOption}`} />
            <Meta title={`Transaction ID: ${transactionId}`} />
            <Meta title={`Payment Status: ${paymentStatus}`} />
          </Card>
        </Col>

        {/* Delivery Information Box */}
        <Col xs={24} md={12}>
          <Card
            title="Delivery Information"
            bordered={false}
            className="w-full bg-slate-200"
            // style={{ width: '100%', background: '#f0f4f7' }}
            actions={[<CarOutlined key="truckIcon" style={{ fontSize: '30px' }} />]}
          >
            <Meta
              title={`Order ID (Last 10 characters): ${_id.slice(-10)}`}
              description={`Type of Delivery: COD (Default)`}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderInfo;
