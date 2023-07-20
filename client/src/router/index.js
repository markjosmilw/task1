import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Form from '../pages/Form.vue'
import ContactInfo from '../pages/ContactInfo.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/basic',
        name: 'Basic Info',
        component: Form
    },
    ,
    {
        path: '/contact',
        name: 'Contact Info',
        component: ContactInfo
    },
]

const router = createRouter({ history: createWebHistory(), routes })
export default router