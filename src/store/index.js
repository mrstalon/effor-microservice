import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';


import teachersModule from './modules/school/teachers';
import classesModule from './modules/school/classes';
import appModule from './modules/school/app';
import pupilsModule from './modules/school/pupils';

import worksModule from './modules/materials/works';
import coursesModule from './modules/materials/courses';
import taskBaseModule from './modules/materials/task-base';

import profileModule from './modules/profile/profile';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
    modules: {
        appModule,
        teachersModule,
        classesModule,
        pupilsModule,
        worksModule,
        coursesModule,
        taskBaseModule,
        profileModule,
    },
});
