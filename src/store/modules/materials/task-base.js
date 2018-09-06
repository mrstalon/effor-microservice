import HTTP from '../../../http-config/index';


const CHANGE_CHOOSED_SUBJECT = 'CHANGE_CHOOSED_SUBJECT';
const SHOW_OR_HIDE_NESTED_TASKS_BASE = 'SHOW_OR_HIDE_NESTED_TASKS_BASE';
const SET_TASK_BASE_ARRAY = 'SET_TASK_BASE_ARRAY';
const INITIALIZE_CHOOSED_SUBJECT = 'INITIALIZE_CHOOSED_SUBJECT';
const SET_SUBJECT_LIST = 'SET_SUBJECT_LIST';
const CLEAR_TASK_BASE_STATE_MODULE = 'CLEAR_TASK_BASE_STATE_MODULE';


const state = {
    taskBaseArray: [],
    subjects: [],
    choosedSubject: null,
};

const mutations = {
    [INITIALIZE_CHOOSED_SUBJECT](state) {
        state.choosedSubject = state.subjects[0];
    },
    [CHANGE_CHOOSED_SUBJECT](state, newSubject) {
        state.choosedSubject = newSubject;
    },
    [SET_SUBJECT_LIST](state, subjects) {
        state.subjects = subjects;
    },
    [SHOW_OR_HIDE_NESTED_TASKS_BASE](state, args) {
        if (args.length === 1) {
            state.taskBaseArray[args[0]].isOpened = !state.taskBaseArray[args[0]].isOpened;
        } else if (args.length === 2) {
            state.taskBaseArray[args[0]].childrenList[args[1]].isOpened = !state.taskBaseArray[args[0]].childrenList[args[1]].isOpened;
        } else if (args.length === 3) {
            state.taskBaseArray[args[0]].childrenList[args[1]].childrenList[args[2]].isOpened = !state.taskBaseArray[args[0]].childrenList[args[1]].childrenList[args[2]].isOpened;
        } else if (args.length === 4) {
            state.taskBaseArray[args[0]].childrenList[args[1]].childrenList[args[2]].childrenList[args[3]].isOpened = !state.taskBaseArray[args[0]].childrenList[args[1]].childrenList[args[2]].childrenList[args[3]].isOpened;
        }
    },
    [SET_TASK_BASE_ARRAY](state, taskBase) {
        state.taskBaseArray = taskBase.map((task) => {
            return {
                ...task,
                childrenList: task.childrenList.map((subTask) => {
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
                isOpened: true,
            };
        });
    },
    [CLEAR_TASK_BASE_STATE_MODULE](state) {
        state.taskBaseArray = [];
        state.subjects = [];
    },
};

const actions = {
    getTaskBaseArray({ state, commit }) {
        return new Promise((resolve) => {
            const url = 'taskclassifier/subject/' + state.choosedSubject.id;
            HTTP.get(url)
                .then((response) => {
                    console.log('loaded');
                    commit('SET_TASK_BASE_ARRAY', response.data);
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
