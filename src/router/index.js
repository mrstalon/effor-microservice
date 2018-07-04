import Vue from 'vue';
import VueRouter from 'vue-router';

import Classes from '../views/school/Classes.vue';
import Teachers from '../views/school/Teachers.vue';
import Pupils from '../views/school/Pupils.vue';
import Works from '../views/materials/Works.vue';
import Courses from '../views/materials/Courses.vue';
import TasksBase from '../views/materials/TasksBase.vue';

import School from '../views/school/School.vue';
import Materials from '../views/materials/Materials.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/school',
            name: 'school',
            component: School,
            children: [
                {
                    path: 'classes',
                    name: 'classes',
                    component: Classes,
                },
                {
                    path: 'teachers',
                    name: 'teachers',
                    component: Teachers,
                },
                {
                    path: 'pupils',
                    name: 'pupils',
                    component: Pupils,
                },
                { path: '', redirect: { name: 'classes' } },

            ],
        },
        {
            path: '/materials',
            name: 'materials',
            component: Materials,
            children: [
                {
                    path: 'works',
                    name: 'works',
                    component: Works,
                },
                {
                    path: 'courses',
                    name: 'courses',
                    component: Courses,
                },
                {
                    path: 'tasks-base',
                    name: 'tasks-base',
                    component: TasksBase,
                },
                { path: '', redirect: { name: 'works' } },
            ],
        },
    ],
});

export default router;
