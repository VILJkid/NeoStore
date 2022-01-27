import axios from 'axios';
import { MAIN_URL/* , FRONT_END */ } from './Url';

export function userLogin(data) {
    return axios.post(`${MAIN_URL}/user/login`, data);
}
export function userRegister(data) {
    return axios.post(`${MAIN_URL}/user/register`, data);
}

export function updatePassword(data, token) {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.post(`${MAIN_URL}/user/updatepassword`, data, config);
}

export function saveTokenData(token) {
    const data = "";
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.post(`${MAIN_URL}/user/profile`, data, config);
}

export function userLogout(token) {
    const data = "";
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.post(`${MAIN_URL}/user/logout`, data, config);
}

export function getAllCategory() {
    return axios.get(`${MAIN_URL}/frontend/allCategory`);
}

export function getCategoryName(category_id) {
    return axios.get(`${MAIN_URL}/frontend/categoryName/${category_id}`);
}

export function getProduct(product_id) {
    const data = {
        product_id: product_id
    };
    return axios.post(`${MAIN_URL}/frontend/product`, data);
}

export function getAllProductDefault() {
    return axios.get(`${MAIN_URL}/frontend/allProductDefault`);
}

export function getAllProduct(category_id) {
    const data = {
        category_id: category_id
    };
    return axios.post(`${MAIN_URL}/frontend/allProduct`, data);
}

export function getProductAssoc(product_id) {
    const data = {
        product_id: product_id
    };
    return axios.post(`${MAIN_URL}/frontend/productAssoc`, data);
}

export function getAllProductAssocDefault() {
    return axios.get(`${MAIN_URL}/frontend/allProductAssocDefault`);
}

export function getAllProductAssoc(category_id) {
    const data = {
        category_id: category_id
    };
    return axios.post(`${MAIN_URL}/frontend/allProductAssoc`, data);
}

export function getProductImage(product_id) {
    const data = {
        product_id: product_id
    };
    return axios.post(`${MAIN_URL}/frontend/productImage`, data);
}

export function getAllCoupons() {
    return axios.get(`${MAIN_URL}/frontend/allCoupons`);
}

export function userProfile(token) {
    const data = "";
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.post(`${MAIN_URL}/user/profile`, data, config);
}

export function placeOrder(data) {
    // console.log(data);
    return axios.post(`${MAIN_URL}/order/placeorder`, data);
}

export function getOrders(user_id) {
    const data = {
        user_id: user_id
    };
    // console.log(data);
    return axios.post(`${MAIN_URL}/order/getorders`, data);
}

export function contact(data) {
    // console.log(data);
    return axios.post(`${MAIN_URL}/contact/contactus`, data);
}

export function getCMS() {
    return axios.get(`${MAIN_URL}/cms/getcms`);
}

export default { userLogin, userRegister, saveTokenData, userLogout, getAllCategory, getCategoryName, getAllProduct, getAllProductAssoc, getProduct, getProductAssoc, getAllProductAssocDefault, getAllProductDefault, getProductImage, getAllCoupons, userProfile, placeOrder, updatePassword, getOrders, contact, getCMS };