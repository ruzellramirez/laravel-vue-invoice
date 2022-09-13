import {createRouter, createWebHistory} from "vue-router";

import invoiceIndex from "../components/invoices/index.vue";
import invoiceNew from "../components/invoices/new.vue";
import notFound from '../components/notFound.vue';
import printFormat from '../components/print.vue';

const routes = [
    {
        path: '/',
        component: invoiceIndex
    },
    {
        path: '/invoice/new',
        component: invoiceNew
    },
    {
        path: '/print',
        component: printFormat
    },
    {
        path: '/:pathMatch(.*)*',
        component: notFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;