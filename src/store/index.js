import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';


import teachersModule from './modules/teachers';
import classesModule from './modules/classes';
import appModule from './modules/app';
import pupilsModule from './modules/pupils';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
    modules: {
        appModule,
        teachersModule,
        classesModule,
        pupilsModule,
    },
});
