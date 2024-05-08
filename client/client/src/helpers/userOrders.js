import axios from "axios";
import { setOrders, clearOrders } from "../store/slices/order-slice";

// const fetchData = async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8081/api/v1/order/orders/${user.userId}`
//     );
//     const items = response?.data;
//     // setCurrentProduct(items);
//     return items;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchAndDispatchOrders = async (user, dispatch) => {
  try {
    dispatch(clearOrders());
    const response = await axios.get(
      `https://padjewels.onrender.com/api/v1/order/orders/${user.userId}`
    );
    const items = response?.data?.userOrders;
    dispatch(setOrders(items));
  } catch (error) {
    console.log(error);
  }
};
