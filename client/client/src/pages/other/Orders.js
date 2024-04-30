import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBProgress,
  MDBProgressBar,
  // MDBTypography,
} from "mdb-react-ui-kit";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import SEO from "../../components/seo";
import { useSelector } from "react-redux";
import { fetchAndDispatchOrders } from "../../helpers/userOrders";
import { store } from "../../store/store";

const Orders = () => {
  let { pathname } = useLocation();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAndDispatchOrders(user, store.dispatch);
    };
    fetchData();
  }, [user]);

  const orders = useSelector((state) => state.order);

  const mapProductDetails = (product) => {
    const productDetails = products.products.find((p) => p._id === product._id);

    if (productDetails) {
      return (
        <>
          <MDBRow key={productDetails._id}>
            <MDBCol md="2">
              <MDBCardImage
                src={productDetails.photos[0].secure_url}
                fluid
                alt={productDetails.productName}
              />
            </MDBCol>
            <MDBCol
              md="2"
              className="text-center d-flex justify-content-center align-items-center"
            >
              <p className="text-muted mb-0">{productDetails.productName}</p>
            </MDBCol>
            <MDBCol
              md="2"
              className="text-center d-flex justify-content-center align-items-center"
            >
              <p className="text-muted mb-0 small">{productDetails.color}</p>
            </MDBCol>
            <MDBCol
              md="2"
              className="text-center d-flex justify-content-center align-items-center"
            >
              <p className="text-muted mb-0 small">
                Qty: {productDetails.stockQuantity}
              </p>
            </MDBCol>
            <MDBCol
              md="2"
              className="text-center d-flex justify-content-center align-items-center"
            >
              <p className="text-muted mb-0 small">{productDetails.mrpPrice}</p>
            </MDBCol>
          </MDBRow>
          <hr
            className="mb-4"
            style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
          />
          <MDBRow className="align-items-center">
            <MDBCol md="2">
              <p className="text-muted mb-0 small">Track Order</p>
            </MDBCol>
            <MDBCol md="10">
              <MDBProgress style={{ height: "6px", borderRadius: "16px" }}>
                <MDBProgressBar
                  style={{
                    borderRadius: "16px",
                    backgroundColor: "#a8729a",
                  }}
                  width={50}
                  valuemin={0}
                  valuemax={100}
                />
              </MDBProgress>
              <div className="d-flex justify-content-around mb-1">
                <p className="text-muted mt-1 mb-0 small ms-xl-5">Ordered</p>
                <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
              </div>
            </MDBCol>
          </MDBRow>
        </>
      );
    } else {
      return <>Products not found...</>;
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Orders"
        description="Orders page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop={"visible"}>
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Orders", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <section
          className="h-100 gradient-custom"
          style={{ backgroundColor: "#eee" }}
        >
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="10" xl="8">
                <MDBCard style={{ borderRadius: "10px" }}>
                  {orders.orders && orders.orders.length > 0 ? (
                    orders.orders.map((orderItem) => (
                      <MDBCard
                        key={orderItem._id}
                        className="shadow-0 border mb-4"
                      >
                        <MDBCardBody>
                          {orderItem.product.map((product) =>
                            mapProductDetails(product)
                          )}
                          {/* ... (other details for the order item) */}
                        </MDBCardBody>
                      </MDBCard>
                    ))
                  ) : (
                    <MDBCardBody>
                      <p>No orders found.</p>
                    </MDBCardBody>
                  )}
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </LayoutOne>
    </Fragment>
  );
};

export default Orders;
