export const BASE_URL = process.env.BASE_URL || 'https://padjewels.onrender.com/api/v1/';
export const GET_PRODUCT_CATEGORIES = BASE_URL + 'product/cat';
export const ADD_CATEGORY = BASE_URL + 'product/addCat';
export const ADD_PRODUCT = BASE_URL + 'product/addProduct';
export const UPDATE_PRODUCT = BASE_URL + 'product/updateProduct/';

export const DELETE_USER = BASE_URL + 'auth/delUser/';
export const GET_USER = BASE_URL + 'auth/getUser';
export const GET_CART_DATA = BASE_URL + 'carts/cart/';
export const GET_PRODUCT_DETAILS = BASE_URL + 'product/getProd/';
export const UPDATE_USER = BASE_URL + 'auth/updUser/';
export const GET_CAT_WITH_SUBCAT = BASE_URL + 'subcategories/subcategories/category/';
export const DELETE_SUBCAT = BASE_URL + 'subcategories/subcategories/delete/';
export const CREATE_SUBCAT = BASE_URL + 'subcategories/createsubcategories';
export const UPDATE_SUBCAT = BASE_URL + 'subcategories/subcategories/update/';

export const UPDATE_CAT = BASE_URL + 'product/updateCat/';
export const DELETE_CAT = BASE_URL + 'product/deleteCat/';

export const PAYMENT_CONFIG = BASE_URL + 'paymentmethod/paymentconfig';

export const PAYMENT_CONFIG_UPDATE_STATUS = BASE_URL + 'paymentmethod/updatestatus'

export const GET_PAYMENT_OPTIONS = BASE_URL + 'paymentmethod/paymentoptions'

export const GET_ALL_PRODUCTS = BASE_URL + 'product/';

export const DELETE_PRODUCT = BASE_URL + 'product/deleteProduct/';

export const SALES_REPORT = BASE_URL + 'sales/salesreport'

export const GET_ALL_ORDERS = BASE_URL + 'order/allorders/';

export const GET_ALL_COUPONS = BASE_URL + 'carts/cart/coupons';

export const ADD_COUPON = BASE_URL + 'carts/cart/add-coupon';
export const GET_COUPON= BASE_URL + 'carts/cart/coupon/';

