import HTTP from '../../../http-config/index';


const CHANGE_CHOOSED_SUBJECT = 'CHANGE_CHOOSED_SUBJECT';
const CHANGE_CHOOSED_COURSE_TYPE = 'CHANGE_CHOOSED_COURSE_TYPE';
const SHOW_OR_HIDE_NESTED_COURSES = 'SHOW_OR_HIDE_NESTED_COURSES';
const SET_COURSES_ARRAY = 'SET_COURSES_ARRAY';
const SET_SUBJECT_LIST = 'SET_SUBJECT_LIST';
const SET_COURSES_TYPES = 'SET_COURSES_TYPES';
const INITIALIZE_CHOOSED_SUBJECT = 'INITIALIZE_CHOOSED_SUBJECT';
const CLEAR_COURSES_STATE_MODULE = 'CLEAR_COURSES_STATE_MODULE';


const state = {
    choosedSubject: null,
    subjects: [],
    choosedCourseType: null,
    coursesTypes: [],
    coursesArray: [],
};

const mutations = {
    [INITIALIZE_CHOOSED_SUBJECT](state) {
        state.choosedSubject = state.subjects[0];
    },
    [SET_SUBJECT_LIST](state, subjects) {
        state.subjects = subjects;
    },
    [CHANGE_CHOOSED_SUBJECT](state, newSubject) {
        state.choosedSubject = newSubject;
    },
    [CHANGE_CHOOSED_COURSE_TYPE](state, newType) {
        state.choosedCourseType = newType;
    },
    [SHOW_OR_HIDE_NESTED_COURSES](state, args) {
        if (args.length === 1) {
            state.coursesArray[args[0]].isOpened = !state.coursesArray[args[0]].isOpened;
        } else if (args.length === 2) {
            state.coursesArray[args[0]].courseList[args[1]].isOpened = !state.coursesArray[args[0]].courseList[args[1]].isOpened;
        } else if (args.length === 3) {
            state.coursesArray[args[0]].courseList[args[1]].childrenList[args[2]].isOpened = !state.coursesArray[args[0]].courseList[args[1]].childrenList[args[2]].isOpened;
        } else if (args.length === 4) {
            state.coursesArray[args[0]].courseList[args[1]].childrenList[args[2]].childrenList[args[3]].isOpened = !state.coursesArray[args[0]].courseList[args[1]].childrenList[args[2]].childrenList[args[3]].isOpened;
        }
    },
    [SET_COURSES_ARRAY](state, courses) {
        state.coursesArray = courses.map((task) => {
            return {
                ...task,
                courseList: task.courseList.map((subTask) => {
                    return {
                        ...subTask,
                        childrenList: subTask.childrenList.map((subSubTask) => {
                            return {
                                ...subSubTask,
                                childrenList: subSubTask.childrenList.map((subSubSubTask) => {
                                    return {
                                        ...subSubSubTask,
                                        isOpened: false,
                                    };
                                }),
                                isOpened: false,
                            };
                        }),
                        isOpened: false,
                    };
                }),
                isOpened: false,
            };
        });
    },
    [SET_COURSES_TYPES](state, newTypes) {
        state.coursesTypes = newTypes;
        state.choosedCourseType = state.coursesTypes[0];
    },
    [CLEAR_COURSES_STATE_MODULE](state) {
        state.subjects = [];
        state.coursesTypes = [];
        state.coursesArray = [];
    },
};

const actions = {
    getCoursesArray({ state, commit }) {
        return new Promise((resolve) => {
            const url = '/course/subject/' + state.choosedSubject.id + '/type/' + state.choosedCourseType.id;
            HTTP.get(url)
                .then((response) => {
                    console.log(response.data);
                    commit('SET_COURSES_ARRAY', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    getCoursesTypes({ commit }) {
        return new Promise((resolve) => {
            HTTP.get('course/types')
                .then((response) => {
                    console.log('loading');
                    commit('SET_COURSES_TYPES', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
