const TOKEN_PROFILE = "id_email";
export const getTokenProfile = () => {
    return window.localStorage.getItem(TOKEN_PROFILE);
};
export const saveTokenProfile = (token_uid) => {
    return window.localStorage.setItem(TOKEN_PROFILE, token_uid);
};
export const removeTokenProfile = () => {
    return window.localStorage.removeItem(TOKEN_PROFILE);
};
export default { getTokenProfile, saveTokenProfile, removeTokenProfile };