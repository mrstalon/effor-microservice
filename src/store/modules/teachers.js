import HTTP from '../../http-config';

import findLetterPosition from '../../helpers/find-letter-position';
import sortFunctions from '../../helpers/quick-sorts';

import alphabet from '../../response-mocks/alphabet';

const { quickTeacherClassesSort } = sortFunctions;


const SET_PARALLELS_LIST = 'SET_PARALLELS_LIST';
const SET_TEACHERS_LIST = 'SET_TEACHERS_LIST';
const CHANGE_CHOOSED_TEACHER = 'CHANGE_CHOOSED_TEACHER';
const CLEAR_TEMP_VARIABLES = 'CLEAR_TEMP_VARIABLES';
const CHOOSE_PARALLEL = 'CHOOSE_PARALLEL';
const CHOOSE_LETTER = 'CHOOSE_LETTER';
const APPROVE_TEACHER_CHANGES = 'APPROVE_TEACHER_CHANGES';
const REMOVE_TEACHER = 'REMOVE_TEACHER';
const SHOW_OR_HIDE_ERROR_MESSAGE = 'SHOW_OR_HIDE_ERROR_MESSAGE';
const CHANGE_EMITTED_EVENT = 'CHANGE_EMITTED_EVENT';


const state = {
    parallels: [],
    teachers: [],
    choosedParallel: null,
    tempTeacher: null,
    tempClasses: null,
    errorMessage: '',
    emittedEvent: '',
};

const mutations = {
    [SET_PARALLELS_LIST](state, newParallelsList) {
        state.parallels = newParallelsList;
    },
    [SET_TEACHERS_LIST](state, newTeachersList) {
        state.teachers = newTeachersList.map((teacher, index) => {
            return {
                ...teacher,
                dataBaseId: teacher.id,
                id: index,
            };
        });
        // state.teachers = state.teachers.map((teacher) => {
        //     return {
        //         ...teacher,
        //         classes: teacher.classes.map((classObj) => {
        //             return {
        //                 ...classObj,
        //                 number: classObj.parNumber,
        //             };
        //         }),
        //     };
        // });
    },
    [CHANGE_CHOOSED_TEACHER](state, newTeacherId) {
        // changing choosed teacher + lighting parallels and classes teached by this teacher
        const newChoosedTeacher = JSON.parse(JSON.stringify(state.teachers[newTeacherId]));
        // newChoosedTeacher.classes = newChoosedTeacher.classes.map((classObj) => {
        //     const objToReturn = {
        //         ...classObj,
        //     };
        //     delete objToReturn.parNumber;
        //     return objToReturn;
        // });
        let newTempParallels = JSON.parse(JSON.stringify(state.parallels));

        newTempParallels = newTempParallels.map((item) => {
            return {
                ...item,
                isChoosed: false,
                isTeached: false,
            };
        });

        newChoosedTeacher.classes.forEach((item) => {
            const parallelId = newTempParallels.findIndex((parallel) => {
                return parallel.number === item.parNumber;
            });
            newTempParallels[parallelId].isTeached = true;
        });

        newTempParallels = newTempParallels.map((item) => {
            return {
                ...item,
                classes: item.classes.map((subItem) => {
                    return {
                        letter: subItem.letter,
                    };
                }),
            };
        });

        newChoosedTeacher.classes.forEach((item) => {
            const parallelId = newTempParallels.findIndex((parallel) => {
                return parallel.number === item.parNumber;
            });
            const id = newTempParallels[parallelId].classes.findIndex((classObj) => {
                return classObj.letter === item.letter;
            });
            if (id >= 0) {
                newTempParallels[parallelId].classes[id].isChoosed = true;
            }
        });

        newChoosedTeacher.tempParallels = newTempParallels;

        state.tempTeacher = newChoosedTeacher;
        state.tempClasses = JSON.parse(JSON.stringify(state.tempTeacher.classes));
    },
    [CLEAR_TEMP_VARIABLES](state) {
        state.choosedParallel = null;
        state.tempClasses = null;
        state.tempTeacher = null;
    },
    [CHOOSE_PARALLEL](state, parallelId) {
        // changing choosed parallel
        const newTempTeacher = JSON.parse(JSON.stringify(state.tempTeacher));
        newTempTeacher.tempParallels = newTempTeacher.tempParallels.map((parallel) => {
            return {
                ...parallel,
                isChoosed: false,
            };
        });

        newTempTeacher.tempParallels[parallelId].isChoosed = !state.tempTeacher.tempParallels[parallelId].isChoosed;
        state.tempTeacher = newTempTeacher;
        if (state.choosedParallel !== null) {
            state.tempTeacher.tempParallels[state.choosedParallel.id].classes = state.choosedParallel.classes;
        }
        state.choosedParallel = state.tempTeacher.tempParallels[parallelId];
    },
    [CHOOSE_LETTER](state, payload) {
        const { parallelId, letter } = payload;
        const letterId = state.choosedParallel.classes.findIndex((item) => {
            return item.letter === letter;
        });

        const parallelNumber = state.parallels.find((parallel) => {
            return parallel.id === parallelId;
        }).number;


        if (state.choosedParallel.classes[letterId].isChoosed === true) {
            // deleting this class from tempClasses and set isChoosed of this letter to false
            const classId = state.tempClasses.findIndex((classObj) => {
                return classObj.letter === letter && classObj.parNumber === parallelNumber;
            });

            state.tempClasses.splice(classId, 1);
            const choosedParallel = JSON.parse(JSON.stringify(state.choosedParallel));
            choosedParallel.classes[letterId].isChoosed = false;
            state.choosedParallel = choosedParallel;
        } else {
            // adding this class to tempClasses and set isChoosed of this letter to true
            const letterPosition = findLetterPosition(alphabet, letter);

            state.tempClasses.push({
                parNumber: parallelNumber,
                letter,
                letterPosition,
            });
            const choosedParallel = JSON.parse(JSON.stringify(state.choosedParallel));
            choosedParallel.classes[letterId].isChoosed = true;
            state.choosedParallel = choosedParallel;
        }
    },
    [APPROVE_TEACHER_CHANGES](state, newTeacherList) {
        // approving changes of teacher data
        state.teachers = newTeacherList;
    },
    [REMOVE_TEACHER](state, newTeachersList) {
        state.teachers = newTeachersList;
    },
    [SHOW_OR_HIDE_ERROR_MESSAGE](state, errorMessage) {
        state.errorMessage = errorMessage;
    },
    [CHANGE_EMITTED_EVENT](state, event) {
        state.emittedEvent = event;
    },
};

const actions = {
    getTeachersList({ commit }) {
        HTTP.get('getteachers', {
            validateStatus(status) {
                // 403 status code means that user is not authoraized.then(redirect user to login form)
                if (status === 403) {
                    const urlToRedirect = 'http://192.168.1.39:8090/teacher/schoolsettings';
                    window.location.replace(urlToRedirect);
                }
                return true;
            },
        })
            .then((response) => {
                console.log(response.data);
                commit('SET_TEACHERS_LIST', response.data.teachers);
            })
            .catch((error) => {
                // commit('SHOW_OR_HIDE_ERROR_MESSAGE', error.response.data.description);
                commit('SHOW_OR_HIDE_ERROR_MESSAGE', 'Произошла ошибка при отправке запроса');
                setTimeout(() => {
                    // hide error message in 4 seconds
                    commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                }, 4000);
            });
    },
    approveTeacherChanges({ commit, state }) {
        const tempTeacher = JSON.parse(JSON.stringify(state.tempTeacher));
        const newTeachersList = JSON.parse(JSON.stringify(state.teachers));
        const newTeacher = {
            ...tempTeacher,
            classes: quickTeacherClassesSort(JSON.parse(JSON.stringify(state.tempClasses))),
        };
        newTeachersList.splice(tempTeacher.id, 1, newTeacher);

        console.log(newTeacher);

        return new Promise((resolve) => {
            HTTP.put('approveteacherchanges', { teacher: newTeacher }, {
                validateStatus(status) {
                    // 403 status code means that user is not authoraized.then(redirect user to login form)
                    if (status === 403) {
                        const urlToRedirect = 'http://192.168.1.39:8090/teacher/schoolsettings';
                        window.location.replace(urlToRedirect);
                    }
                    return true;
                },
            })
                .then(() => {
                    commit('APPROVE_TEACHER_CHANGES', newTeachersList);
                    commit('CHANGE_EMITTED_EVENT', 'close');
                    resolve();
                })
                .catch((error) => {
                    // commit('SHOW_OR_HIDE_ERROR_MESSAGE', error.response.data.description);
                    commit('SHOW_OR_HIDE_ERROR_MESSAGE', 'Произошла ошибка при отправке запроса');
                    setTimeout(() => {
                        // hide error message in 4 seconds
                        commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                    }, 4000);
                });
        });
    },
    removeTeacher({ commit, state }, payload) {
        const { teacherId, teacherDataBaseId } = payload;
        let newTeachersList = JSON.parse(JSON.stringify(state.teachers));

        newTeachersList.splice(teacherId, 1);
        // updating teacher's id
        newTeachersList = newTeachersList.map((teacher, index) => {
            return {
                ...teacher,
                id: index,
            };
        });

        console.log(teacherDataBaseId);
        HTTP.put('deleteteacher', { teacherId: teacherDataBaseId }, {
            validateStatus(status) {
                // 403 status code means that user is not authoraized.then(redirect user to login form)
                if (status === 403) {
                    const urlToRedirect = 'http://192.168.1.39:8090/teacher/schoolsettings';
                    window.location.replace(urlToRedirect);
                }
                return true;
            },
        })
            .then(() => {
                commit('REMOVE_TEACHER', newTeachersList);
                commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
            })
            .catch((error) => {
                // commit('SHOW_OR_HIDE_ERROR_MESSAGE', error.response.data.description);
                commit('SHOW_OR_HIDE_ERROR_MESSAGE', 'Произошла ошибка при отправке запроса');
                setTimeout(() => {
                    // hide error message in 4 seconds
                    commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                }, 4000);
            });
    },
};

export default {
    state,
    mutations,
    actions,
};
