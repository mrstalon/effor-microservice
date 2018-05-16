import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import storage from './store';
import Menu from './view/Menu.vue';
import './styles/main.css';

Vue.use(VueRouter);
Vue.use(Vuex);

export const store = new Vuex.Store(storage);

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Menu,
        },
    ],
});

new Vue({
    el: '.app',
    router,
    store,
});

