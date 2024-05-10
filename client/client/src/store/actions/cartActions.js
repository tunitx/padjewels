import axios from "axios";
import cogoToast from "cogo-toast";

export const addToCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}api/v1/cart/add-item/${userId}`, {
        productId,
      });
      dispatch({ type: "ADD_TO_CART", payload: response.data });
      cogoToast.success("Added To Cart", { position: "bottom-left" });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
};

export const deleteFromCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}api/v1/cart/remove-item/${userId}/${productId}`);
      dispatch({ type: "DELETE_FROM_CART", payload: productId });
      cogoToast.error("Removed From Cart", { position: "bottom-left" });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };
};

export const decreaseQuantity = (userId, productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}api/v1/cart/remove-item/${userId}/${productId}`
      );
      dispatch({ type: "DECREASE_QUANTITY", payload: response.data });
      cogoToast.warn("Item Decremented From Cart", { position: "bottom-left" });
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };
};

export const deleteAllFromCart = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}api/v1/cart/clear/${userId}`);
      dispatch({ type: "DELETE_ALL_FROM_CART" });
      cogoToast.success("Cart Cleared", { position: "bottom-left" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
};
