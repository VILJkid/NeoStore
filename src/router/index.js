import Vue from 'vue';
import Router from 'vue-router';
import { getToken } from "../common/jwttoken";

import Home from '../components/Home.vue';
import CMS from '../components/CMS.vue';
import Account from '../components/Account.vue';
import Wishlist from '../components/Wishlist.vue';
import Cart from '../components/Cart.vue';
import Checkout from '../components/Checkout.vue';
import Contact from '../components/Contact.vue';
import Login from '../components/Login.vue';
import Product_Details from '../components/Product_Details.vue';
import Shop from '../components/Shop.vue';

import Not_Found from '../Not_Found.vue';
// import About from '../components/About.vue';

// import Courses from '../components/Courses.vue';
// import CoursesMessage from '../components/CoursesMessage.vue';
// import Node from '../components/Node.vue';
// import React from '../components/React.vue';
// import Angular from '../components/Angular.vue';
// import PHP from '../components/PHP.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: "active", // active class for non-exact links.
    linkExactActiveClass: "active", // active class for *exact* links.
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            // alias: '/redirectToHome'
        },
        {
            path: '/cms',
            name: 'CMS',
            component: CMS,
            // alias: '/redirectToHome'
        },
        {
            path: '/account',
            name: 'Account',
            component: Account,
            // alias: '/redirectToHome'
        },
        {
            path: '/wishlist',
            name: 'Wishlist',
            component: Wishlist,
            beforeEnter: customRouteGuard,
            // alias: '/redirectToHome'
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart,
            // alias: '/redirectToHome'
        },
        {
            path: '/checkout',
            name: 'Checkout',
            component: Checkout,
            beforeEnter: customRouteGuard,
            // alias: '/redirectToHome'
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
            // alias: '/redirectToHome'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            // alias: '/redirectToHome'
        },
        {
            path: '/product_details',
            // name: 'Product_Details',
            component: Product_Details,
            // alias: '/redirectToHome'
            children: [{
                path: '',
                name: 'Product_Details',
                component: Product_Details,
                redirect: '1',
            }, {
                path: ':product_id',
                // name: 'Product_Details',
                component: Product_Details,
                // redirect: ':product_id',
            }
            ]
        },
        {
            path: '/shop',
            // name: 'Shop',
            component: Shop,
            // redirect: '/shop/1',
            // alias: '/shop',
            // props: (route) => ({ category_id: route.params.category_id || 1 })
            children: [{
                path: '',
                name: 'Shop',
                component: Shop,
                redirect: '1',
            }, {
                path: ':category_id',
                // name: 'Shop',
                component: Shop,
                // redirect: ':category_id',
            }
            ]
        },
        {
            path: '/not_found',
            name: 'Not_Found',
            component: Not_Found,
            // alias: '/redirectToHome'
        },
        // {
        //     path: '/about',
        //     name: 'About',
        //     component: About
        // },
        // {
        //     path: '/courses/',
        //     // name: 'Courses',
        //     beforeEnter: customRouteGuard,
        //     component: Courses,
        //     children: [
        //         {
        //             path: '',
        //             component: CoursesMessage
        //         },
        //         {
        //             path: 'node',
        //             component: Node
        //         },
        //         {
        //             path: 'react',
        //             component: React
        //         },
        //         {
        //             path: 'angular',
        //             component: Angular
        //         },
        //         {
        //             path: 'php',
        //             component: PHP
        //         }
        //     ]
        // },
        // {
        //     path: '/redirectToAbout',
        //     redirect: { name: 'About' }
        // }
    ]
});

//Guard to allow only authenticated users to access Courses page
function customRouteGuard(to, from, next) {

    if (getToken() != undefined) {
        next();
    }

    else {
        alert("Don't try to mess around, boi.");
        next({ name: 'Home' });
    }
}