const MY_WISHLIST = "myWishlist";
export const getMyWishlist = () => {
    return window.localStorage.getItem(MY_WISHLIST);
};
export const saveMyWishlist = (wishlist_details) => {
    return window.localStorage.setItem(MY_WISHLIST, JSON.stringify(wishlist_details));
};
export const removeMyWishlist = () => {
    return window.localStorage.removeItem(MY_WISHLIST);
};
export default { getMyWishlist, saveMyWishlist, removeMyWishlist };