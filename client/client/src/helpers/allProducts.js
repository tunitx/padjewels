import axios from "axios";
import { setProducts } from "../store/slices/product-slice";

const fetchData = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8081/api/v1/product"
        );
        const items = response?.data;
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
