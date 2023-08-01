import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Profile from "../pages/Profile.vue";
import About from "../pages/About.vue";
import Contact from "../pages/Contact.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/about",
    name: "About us",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact us",
    component: Contact,
  },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
