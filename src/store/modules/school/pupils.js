import HTTP from '../../../http-config';


const SET_PARALLELS_LIST = 'SET_PARALLELS_LIST';
const CHOOSE_PARALLEL_TO_RENDER = 'CHOOSE_PARALLEL_TO_RENDER';
const CHANGE_CHOOSED_CLASS = 'CHANGE_CHOOSED_CLASS';
const CHOOSE_PUPIL_TO_DELETE = 'CHOOSE_PUPIL_TO_DELETE';
const APPROVE_PUPIL_LIST_CHANGES = 'APPROVE_PUPIL_LIST_CHANGES';
const SHOW_OR_HIDE_ERROR_MESSAGE = 'SHOW_OR_HIDE_ERROR_MESSAGE';
const CHANGE_EMITTED_EVENT = 'CHANGE_EMITTED_EVENT';
const ADD_USER_BY_LOGIN = 'ADD_USER_BY_LOGIN';
const CLEAR_TEMP_VARIABLES = 'CLEAR_TEMP_VARIABLES';
const CHANGE_LETTER_POSITION = 'CHANGE_LETTER_POSITION';
const CHANGE_ARE_PUPILS_REGISTERED = 'CHANGE_ARE_PUPILS_REGISTERED';
const SET_REGISTERED_PUPILS_INFO = 'SET_REGISTERED_PUPILS_INFO';
const SHOW_OR_HIDE_NESTED_ELEMENTS = 'SHOW_OR_HIDE_NESTED_ELEMENTS';
const SET_REPORTS_ARRAY = 'SET_REPORTS_ARRAY';
const CHANGE_CHOOSED_PUPIL_NAME = 'CHANGE_CHOOSED_PUPIL_NAME';


const state = {
    parallels: [],
    choosedParallelId: 0,
    choosedParallelNumber: 1,
    choosedClassLetter: null,
    choosedClassLetterPosition: null,
    choosedClassId: null,
    choosedClassPupilList: [],
    choosedPupilLogin: null,
    tempPupilList: [],
    pupilsToDeleteList: [],
    errorMessage: '',
    emittedEvent: '',
    arePupilsRegistered: false,
    registeredPupilsInfo: [],
    reportsArray: [],
};

const mutations = {
    [SET_PARALLELS_LIST](state, newParallelsList) {
        state.parallels = newParallelsList;
    },
    [CHOOSE_PARALLEL_TO_RENDER](state, payload) {
        const { parallelId, parallelNumber } = payload;
        state.choosedParallelId = parallelId;
        state.choosedParallelNumber = parallelNumber;
    },
    [CHANGE_CHOOSED_CLASS](state, newClassObj) {
        const newClassId = state.parallels[state.choosedParallelId].classes.findIndex((classObj) => {
            return classObj.letter === newClassObj.letter;
        });

        const newPupilList = state.parallels[state.choosedParallelId].classes[newClassId].pupils;
        state.choosedClassPupilList = newPupilList.map((pupil) => {
            return {
                ...pupil,
                isChoosed: false,
            };
        });
        state.tempPupilList = JSON.parse(JSON.stringify(newPupilList));
        state.choosedClassId = newClassId;
        state.choosedClassLetter = newClassObj.letter;
        state.choosedClassLetterPosition = newClassObj.letterPosition;
    },
    [CHOOSE_PUPIL_TO_DELETE](state, pupilLogin) {
        // getting pupil id in tempPupilList
        const tempPupilId = state.tempPupilList.findIndex((pupil) => {
            return pupilLogin === pupil.login;
        });

        // getting pupil id in main pupil list
        const pupilId = state.choosedClassPupilList.findIndex((pupil) => {
            return pupilLogin === pupil.login;
        });

        // getting pupil id in pupilsToDeleteList
        const pupilIdInDeleteList = state.pupilsToDeleteList.findIndex((pupil) => {
            return pupilLogin === pupil.login;
        });

        const changedPupilList = JSON.parse(JSON.stringify(state.choosedClassPupilList));

        if (tempPupilId === -1) {
            state.tempPupilList.push({ login: pupilLogin });
            state.pupilsToDeleteList.splice(pupilIdInDeleteList, 1);
        } else {
            state.tempPupilList.splice(tempPupilId, 1);
            state.pupilsToDeleteList.push({ login: pupilLogin });
        }

        changedPupilList[pupilId].isChoosed = !changedPupilList[pupilId].isChoosed;
        state.choosedClassPupilList = changedPupilList;
    },
    [APPROVE_PUPIL_LIST_CHANGES](state, newParallelsList) {
        state.parallels = newParallelsList;
    },
    [SHOW_OR_HIDE_ERROR_MESSAGE](state, errorMessage) {
        state.errorMessage = errorMessage;
    },
    [CHANGE_EMITTED_EVENT](state, event) {
        state.emittedEvent = event;
    },
    [ADD_USER_BY_LOGIN](state, userToAddLogin) {
        state.parallels[state.choosedParallelId].classes[state.choosedClassId].pupils.push({
            login: userToAddLogin,
        });
    },
    [CLEAR_TEMP_VARIABLES](state) {
        state.pupilsToDeleteList = [];
        state.reportsArray = [];
        state.registeredPupilsInfo = [];
    },
    [CHANGE_LETTER_POSITION](state, newLetterPosition) {
        state.choosedClassLetterPosition = newLetterPosition;

        state.choosedClassId = state.parallels[state.choosedParallelId].classes.findIndex((classObj) => {
            return classObj.letterPosition === state.choosedClassLetterPosition;
        });
    },
    [CHANGE_ARE_PUPILS_REGISTERED](state) {
        state.arePupilsRegistered = !state.arePupilsRegistered;
    },
    [SET_REGISTERED_PUPILS_INFO](state, newPupilsArray) {
        state.registeredPupilsInfo = newPupilsArray;
    },
    [SHOW_OR_HIDE_NESTED_ELEMENTS](state, teacherId) {
        if (typeof teacherId === 'object') {
            return;
        }
        state.reportsArray[teacherId].isOpened = !state.reportsArray[teacherId].isOpened;
    },
    [SET_REPORTS_ARRAY](state, newArray) {
        state.reportsArray = newArray;
    },
    [CHANGE_CHOOSED_PUPIL_NAME](state, pupilLogin) {
        state.choosedPupilLogin = pupilLogin;
    },
};

const actions = {
    approvePupilListChanges({ commit, state }) {
        const newParallelsList = JSON.parse(JSON.stringify(state.parallels));
        const classId = newParallelsList[state.choosedParallelId].classes.findIndex((classObj) => {
            return classObj.letter === state.choosedClassLetter;
        });
        newParallelsList[state.choosedParallelId].classes[classId].pupils = state.tempPupilList;

        return new Promise((resolve) => {
            HTTP.put('removepupils', { pupils: state.pupilsToDeleteList })
                .then(() => {
                    commit('APPROVE_PUPIL_LIST_CHANGES', newParallelsList);
                    commit('CHANGE_EMITTED_EVENT', 'close');
                    resolve();
                })
                .catch(() => {
                    // commit('SHOW_OR_HIDE_ERROR_MESSAGE', error.response.data.description);
                    commit('SHOW_OR_HIDE_ERROR_MESSAGE', 'Произошла ошибка при отправке запроса');
                    setTimeout(() => {
                        // hide error message in 4 seconds
                        commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                    }, 4000);
                });
        });
    },
    validateUserLogin({ commit, state }, userLogin) {
        const pupilToAdd = {
            login: userLogin,
            parNumber: state.choosedParallelNumber,
            letterPosition: state.choosedClassLetterPosition,
        };

        return new Promise((resolve) => {
            HTTP.put('addpupillogin', pupilToAdd)
                .then((response) => {
                    // here we need check which response came
                    if (response.status !== 200) {
                        commit('SHOW_OR_HIDE_ERROR_MESSAGE', response.data.description);
                        commit('CHANGE_EMITTED_EVENT', '');
                        setTimeout(() => {
                            // hide error message in 4 seconds
                            commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                        }, 4000);
                    } else {
                        commit('ADD_USER_BY_LOGIN', response.data.login);
                        commit('CHANGE_EMITTED_EVENT', 'close');
                    }
                    resolve();
                })
                .catch((error) => {
                    commit('SHOW_OR_HIDE_ERROR_MESSAGE', error.response.data.description);
                    commit('CHANGE_EMITTED_EVENT', '');
                    setTimeout(() => {
                        // hide error message in 4 seconds
                        commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                    }, 4000);
                    resolve();
                });
        });
    },
    sendNewPupilsLogins({ commit, state }, pupilsToAddArray) {
        const arrayOfUsersToSend = pupilsToAddArray.map((user) => {
            return {
                firstName: user[0],
                lastName: user[1],
            };
        });

        return new Promise((resolve) => {
            HTTP.post('createnewpupils', {
                pupils: arrayOfUsersToSend,
                parNumber: state.choosedParallelNumber,
                letterPosition: state.choosedClassLetterPosition,
            })
                .then((response) => {
                    commit('SET_REGISTERED_PUPILS_INFO', response.data);
                    response.data.forEach((pupil) => {
                        commit('ADD_USER_BY_LOGIN', pupil.login);
                    });
                    commit('CHANGE_EMITTED_EVENT', '');
                    commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                    commit('CHANGE_ARE_PUPILS_REGISTERED');
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    // commit('SHOW_OR_HIDE_ERROR_MESSAGE', error.response.data.description);
                    setTimeout(() => {
                        // hide error message in 4 seconds
                        commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                    }, 4000);
                    resolve();
                });
        });
    },
    getClassReports({ commit, state }) {
        const urlToMakeRequest = 'getcontroltest/parallel/' + state.choosedParallelNumber + '/letterposition/' + state.choosedClassLetterPosition;
        HTTP.get(urlToMakeRequest)
            .then((response) => {
                const reportsArray = response.data.map((teacher) => {
                    return {
                        ...teacher,
                        isOpened: false,
                    };
                });
                commit('SET_REPORTS_ARRAY', reportsArray);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getPupilReports({ commit, state }) {
        const urlToMakeRequest = 'getcontroltest/pupil/' + state.choosedPupilLogin;
        HTTP.get(urlToMakeRequest)
            .then((response) => {
                const reportsArray = response.data.map((teacher) => {
                    return {
                        ...teacher,
                        isOpened: false,
                    };
                });
                commit('SET_REPORTS_ARRAY', reportsArray);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};

export default {
    state,
    mutations,
    actions,
};
