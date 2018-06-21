import HTTP from '../../http-config';


import parallels from '../../response-mocks/parallels';


const SET_PARALLELS_LIST = 'SET_PARALLELS_LIST';
const CHOOSE_PARALLEL_TO_RENDER = 'CHOOSE_PARALLEL_TO_RENDER';
const CHANGE_CHOOSED_CLASS = 'CHANGE_CHOOSED_CLASS';
const CHOOSE_PUPIL_TO_DELETE = 'CHOOSE_PUPIL_TO_DELETE';
const APPROVE_PUPIL_LIST_CHANGES = 'APPROVE_PUPIL_LIST_CHANGES';


const state = {
    parallels,
    choosedParallelId: 0,
    choosedParallelNumber: 1,
    choosedClassLetter: null,
    choosedClassLetterPosition: null,
    choosedClassId: null,
    choosedClassPupilList: [],
    tempPupilList: [],
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
    [CHANGE_CHOOSED_CLASS](state, newClassLetter) {
        const newClassId = state.parallels[state.choosedParallelId].classes.findIndex((classObj) => {
            return classObj.letter === newClassLetter;
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
        state.choosedClassLetter = newClassLetter;
    },
    [CHOOSE_PUPIL_TO_DELETE](state, pupilLogin) {
        const tempPupilId = state.tempPupilList.findIndex((pupil) => {
            return pupilLogin === pupil.login;
        });

        const pupilId = state.choosedClassPupilList.findIndex((pupil) => {
            return pupilLogin === pupil.login;
        });

        const changedPupilList = JSON.parse(JSON.stringify(state.choosedClassPupilList));

        if (tempPupilId === -1) {
            state.tempPupilList.push({ login: pupilLogin });
        } else {
            state.tempPupilList.splice(tempPupilId, 1);
        }

        changedPupilList[pupilId].isChoosed = !changedPupilList[pupilId].isChoosed;
        state.choosedClassPupilList = changedPupilList;
    },
    [APPROVE_PUPIL_LIST_CHANGES](state, newParallelsList) {
        state.parallels = newParallelsList;
    },
};

const actions = {
    approvePupilListChanges({ commit, state }) {
        const newParallelsList = JSON.parse(JSON.stringify(state.parallels));
        const classId = newParallelsList[state.choosedParallelId].classes.findIndex((classObj) => {
            return classObj.letter === state.choosedClassLetter;
        });
        newParallelsList[state.choosedParallelId].classes[classId].pupils = state.tempPupilList;

        HTTP.put('approvepupullistchanges', { }, {
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
                commit('APPROVE_PUPIL_LIST_CHANGES', newParallelsList);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    validateUserLogin({ commit, state }, userLogin) {
        const objectToSend = {
            userLogin,
            parNumber: state.choosedParallelNumber,
            classLetter: state.choosedClassLetter,
        };
    },
};

export default {
    state,
    mutations,
    actions,
};
