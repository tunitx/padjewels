import axios from "axios";
import { setProducts } from "../store/slices/product-slice";
import BASE_URL from "../constants/Constants";

const fetchData = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}api/v1/product`
            
        );
        const items = response?.data;
        console.log(items);
        // setCurrentProduct(items);
        return items
      
    } catch (error) {
        console.log(error);
    }
};

export const fetchAndDispatchProducts = async (dispatch) => {
    const products = await fetchData();
    dispatch(setProducts(products));
};
