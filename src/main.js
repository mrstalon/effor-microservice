import Vue from 'vue';
import Vuetify from 'vuetify';

import store from './store';
import router from './router';
import App from './App.vue';
import './styles/main.css';

Vue.use(Vuetify);

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});

