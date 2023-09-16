import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import { useCookies } from 'vue3-cookies';

const {cookies} = useCookies()
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/Home/AboutView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/User/AdminView.vue"),
    beforeEnter: () => {
      if (!cookies.get("loggedInUser")) {
        router.push({ name: "login" });
      }
    },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/Products/ProductsView.vue"),
    // beforeEnter: () => {
    //   if (!cookies.get("loggedInUser")) {
    //     router.push({ name: "login" });
    //   }
    // },
  },
  {
    path: "/product/:bmxID",
    name: "product",
    component: () => import("../views/Products/SingleView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/User/SignupView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/User/LoginView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Products/CartView.vue"),
    beforeEnter: () => {
      if (!cookies.get("loggedInUser")) {
        router.push({ name: "login" });
      }
    },
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestAdmin.vue"),
  },
  {
    path: "/testprod",
    name: "test",
    component: () => import("../views/Products/NavProductsView.vue"),
  },
  {
    path: "/product/create",
    name: "create",
    component: () => import("../components/crudProducts/CreateProdComp.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/User/ProfileView.vue"),
  },
  {
    path: "/product/edit/:bmxID",
    name: "editprod",
    component: () => import("../components/crudProducts/ProductEdit.vue"),
  },
  {
    path: "/user/edit/admin/:userID",
    name: "edituser",
    component: () => import("../components/crudUser/EditUserAdmin.vue"),
  },
  {
    path: "/user/edit/:userID",
    name: "edit",
    component: () => import("../components/crudUser/EditUser.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Home/ContactUsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
