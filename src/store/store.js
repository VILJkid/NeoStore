import Vue from 'vue';
import Vuex from 'vuex';

import { getToken, removeToken } from "../common/jwttoken";
import { getTokenProfile, removeTokenProfile } from "../common/jwtprofile";
import { getMyCart, removeMyCart } from "../common/mycart";
import { getMyWishlist, removeMyWishlist } from "../common/mywishlist";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        id_token: getToken() ? getToken() : null,
        id_email: getTokenProfile() ? getTokenProfile() : null,
        myCart: getMyCart() ? JSON.parse(getMyCart()) : [],
        myWishlist: getMyWishlist() ? JSON.parse(getMyWishlist()) : [],
    },
    getters: {
        id_token: state => state.id_token,
        id_email: state => state.id_email,
        myCart: state => state.myCart,
        myWishlist: state => state.myWishlist,
    },
    mutations: {
        set_id_token(state, payload) {
            state.id_token = payload.id_token;
            return state.id_token;
        },
        set_id_email(state, payload) {
            state.id_email = payload.id_email;
            return state.id_email;
        },
        resetState(state) {
            Object.assign(state, { id_token: null, id_email: null });
            removeToken();
            removeTokenProfile();
        },
        set_my_cart(state, payload) {
            state.myCart = payload.myCart;
            return state.myCart;
        },
        resetMyCart(state) {
            Object.assign(state, { myCart: [] });
            removeMyCart();
        },

        set_my_wishlist(state, payload) {
            state.myWishlist = payload.myWishlist;
            return state.myWishlist;
        },
        resetMyWishlist(state) {
            Object.assign(state, { myWishlist: [] });
            removeMyWishlist();
        },
    },
    actions: {
        get_id_token(ctx, payload) {
            ctx.commit('set_id_token', payload);
            // console.log("State Token: " + this.state.id_token);
        },
        get_id_email(ctx, payload) {
            ctx.commit('set_id_email', payload);
            // console.log("State Email: " + this.state.id_email);
        },
        resetSessionState({ commit }) {
            commit('resetState');
            // console.log("State Token: " + this.state.id_token);
            // console.log("State Email: " + this.state.id_email);
        },
        get_my_cart(ctx, payload) {
            ctx.commit('set_my_cart', payload);
        },
        resetSessionMyCart({ commit }) {
            commit('resetMyCart');
        },

        get_my_wishlist(ctx, payload) {
            ctx.commit('set_my_wishlist', payload);
        },
        resetSessionMyWishlist({ commit }) {
            commit('resetMyWishlist');
        },
    }
});