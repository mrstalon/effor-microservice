import Vue from 'vue';

import store from './store';
import router from './router';
import App from './App.vue';
import './styles/main.css';

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});

