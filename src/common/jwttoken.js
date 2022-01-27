const TOKEN_KEY = "id_token";
export const getToken = () => {
    return window.localStorage.getItem(TOKEN_KEY);
};
export const saveToken = (token) => {
    return window.localStorage.setItem(TOKEN_KEY, token);
};
export const removeToken = () => {
    return window.localStorage.removeItem(TOKEN_KEY);
};
export default { getToken, saveToken, removeToken };