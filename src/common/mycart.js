const MY_CART = "myCart";
export const getMyCart = () => {
    return window.localStorage.getItem(MY_CART);
};
export const saveMyCart = (cart_details) => {
    return window.localStorage.setItem(MY_CART, JSON.stringify(cart_details));
};
export const removeMyCart = () => {
    return window.localStorage.removeItem(MY_CART);
};
export default { getMyCart, saveMyCart, removeMyCart };