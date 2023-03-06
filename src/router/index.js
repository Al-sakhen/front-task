import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Product from "../pages/Product.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import CreateProduct from "../pages/CreateProduct.vue";
import EditProduct from "../pages/EditProduct.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    
    },
    {
        path: "/product/:id",
        name: "product",
        component: Product,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter: (to, from) => {
            if(localStorage.getItem('user')) return {name:'home'}
        }
    },
    {
        path: "/signup",
        name: "signup",
        component: Signup,
        beforeEnter: (to, from) => {
            if(localStorage.getItem('user')) return {name:'home'}
        }
    },
    {
        path: "/create_product",
        name: "create_product",
        component: CreateProduct,
        beforeEnter: (to, from) => {
            if(!localStorage.getItem('user')) return {name:'home'}
        }
    },
    {
        path: "/edit_product/:id",
        name: "edit_product",
        component: EditProduct,
        beforeEnter: (to, from) => {
            if(!localStorage.getItem('user')) return {name:'home'}
        }
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
