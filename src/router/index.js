import Vue from 'vue';
import VueRouter from 'vue-router';

import Classes from '../views/Classes.vue';
import Teachers from '../views/Teachers.vue';
import Pupils from '../views/Pupils.vue';
import FormAuth from '../views/FormAuth.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/classes',
            name: 'classes',
            component: Classes,
        },
        {
            path: '/teachers',
            name: 'teachers',
            component: Teachers,
        },
        {
            path: '/pupils',
            name: 'pupils',
            component: Pupils,
        },
        {
            path: '/form',
            component: FormAuth,
        },
        { path: '*', redirect: { name: 'classes' } },
    ],
});

export default router;
