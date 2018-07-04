import HTTP from '../../http-config';

import sortFunctions from '../../helpers/quick-sorts';
import checkDoWeNeedToMakeRequest from '../../helpers/check-should-we-make-request';

import alphabet from '../../response-mocks/alphabet';


const { quickAlphabetSort, quickParallelsSort, quickSort } = sortFunctions;


const SET_PARALLELS_LIST = 'SET_PARALLELS_LIST';
const INITIALIZE_CREATED_PARALLELS_NUMBERS = 'INITIALIZE_CREATED_PARALLELS_NUMBERS';
const ADD_LETTER_TO_ARRAY_OF_LETTERS = 'ADD_LETTER_TO_ARRAY_OF_LETTERS';
const DELETE_LETTER_FROM_ARRAY_OF_LETTERS = 'DELETE_LETTER_FROM_ARRAY_OF_LETTERS';
const ADD_PARALLEL = 'ADD_PARALLEL';
const CLEAR_ARRAY_OF_LETTERS_TO_ADD = 'CLEAR_ARRAY_OF_LETTERS_TO_ADD';
const MAKE_STATE_OF_ALPHABET_INITIAL = 'MAKE_STATE_OF_ALPHABET_INITIAL';
const CHANGE_IS_LETTER_CHOOSED = 'CHANGE_IS_LETTER_CHOOSED';
const LIGHT_CHOOSED_CLASSES_LETTERS_IN_ALPHABET = 'LIGHT_CHOOSED_CLASSES_LETTERS_IN_ALPHABET';
const FILL_ARRAY_OF_LETTERS_TO_ADD = 'FILL_ARRAY_OF_LETTERS_TO_ADD';
const APPROVE_PARALLEL_CHANGES = 'APPROVE_PARALLEL_CHANGES';
const SHOW_OR_HIDE_ERROR_MESSAGE = 'SHOW_OR_HIDE_ERROR_MESSAGE';
const CHANGE_EMITTED_EVENT = 'CHANGE_EMITTED_EVENT';


const state = {
    arrayOfLettersToAdd: [],
    createdParallelsNumbers: null,
    alphabet,
    parallels: [],
    errorMessage: '',
    emittedEvent: '',
};


const mutations = {
    [SET_PARALLELS_LIST](state, newParallelsList) {
        state.parallels = newParallelsList;
    },
    [INITIALIZE_CREATED_PARALLELS_NUMBERS](state) {
        state.createdParallelsNumbers = state.parallels.map((parallel) => {
            return parallel.number;
        });
    },
    [ADD_LETTER_TO_ARRAY_OF_LETTERS](state, letterObj) {
        state.arrayOfLettersToAdd.push(letterObj);
    },
    [DELETE_LETTER_FROM_ARRAY_OF_LETTERS](state, letterObj) {
        const letterId = state.arrayOfLettersToAdd.findIndex((item) => {
            return letterObj.letter === item.letter;
        });

        state.arrayOfLettersToAdd.splice(letterId, 1);
    },
    [ADD_PARALLEL](state, payload) {
        const { parallelToAddNumber, newParallelsList } = payload;

        state.createdParallelsNumbers.push(parallelToAddNumber);
        state.createdParallelsNumbers = quickSort(state.createdParallelsNumbers);
        state.parallels = newParallelsList;
    },
    [CLEAR_ARRAY_OF_LETTERS_TO_ADD](state) {
        state.arrayOfLettersToAdd = [];
    },
    [MAKE_STATE_OF_ALPHABET_INITIAL](state) {
        state.alphabet = state.alphabet.map((item, index) => {
            // this code is nessecery for backend part of the app
            // because class letters are stored in database as numbers(letterPosition)
            const id = index + 1;
            return {
                ...item,
                isChoosed: false,
                letterPosition: id,
            };
        });
    },
    [CHANGE_IS_LETTER_CHOOSED](state, letterId) {
        const newAlphabet = JSON.parse(JSON.stringify(state.alphabet));
        newAlphabet[letterId].isChoosed = !newAlphabet[letterId].isChoosed;
        state.alphabet = newAlphabet;
    },
    [LIGHT_CHOOSED_CLASSES_LETTERS_IN_ALPHABET](state, parallelNumber) {
        const classesLetters = JSON.parse(JSON.stringify(state.parallels[parallelNumber].classes)).map((item) => {
            return item.letter;
        });


        let i = 0;
        const arrayOfLettersLength = classesLetters.length;
        let newAlphabet = JSON.parse(JSON.stringify(state.alphabet));
        while (arrayOfLettersLength > i) {
            newAlphabet = newAlphabet.map((item) => {
                if (item.letter === classesLetters[0]) {
                    return {
                        ...item,
                        isChoosed: true,
                    };
                }
                return item;
            });
            classesLetters.shift();
            i += 1;
        }
        state.alphabet = newAlphabet;
    },
    [FILL_ARRAY_OF_LETTERS_TO_ADD](state, parallelId) {
        // filling arrayOfLettersToAdd with already added letters(making arrayOfLettersToAdd state initial)
        state.arrayOfLettersToAdd = JSON.parse(JSON.stringify(state.parallels[parallelId].classes)).map((item) => {
            return item;
        });
    },
    [APPROVE_PARALLEL_CHANGES](state, newParallelsList) {
        // approving changes of parallel data
        state.parallels = newParallelsList;
    },
    [SHOW_OR_HIDE_ERROR_MESSAGE](state, errorMessage) {
        state.errorMessage = errorMessage;
    },
    [CHANGE_EMITTED_EVENT](state, newEvent) {
        state.emittedEvent = newEvent;
    },
};

const actions = {
    getParallelsList({ commit }) {
        return new Promise((resolve) => {
            HTTP.get('getparallels', {
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
                    console.log(response);
                    commit('SET_PARALLELS_LIST', response.data.parallels);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.response);
                    resolve();
                });
        });
    },
    addParallel({ commit, state }, parallelToAddNumber) {
        let newParallelsList = JSON.parse(JSON.stringify(state.parallels));

        const parallelToAdd = {
            number: parallelToAddNumber,
        };
        const classes = JSON.parse(JSON.stringify(state.arrayOfLettersToAdd)).map((item) => {
            const objectToReturn = item;
            delete objectToReturn.isChoosed;
            delete objectToReturn.isClicked;
            return {
                ...objectToReturn,
            };
        });

        parallelToAdd.classes = quickAlphabetSort(classes);
        newParallelsList.push(parallelToAdd);
        newParallelsList = quickParallelsSort(newParallelsList);
        newParallelsList = newParallelsList.map((parallel, id) => {
            return {
                ...parallel,
                id,
            };
        });

        return new Promise((resolve) => {
            HTTP.put('approveparallelchanges', parallelToAdd, {
                validateStatus(status) {
                    // 403 status code means that user is not authoraized.then(redirect user to login form)
                    if (status === 403) {
                        const urlToRedirect = 'https://temp1.effor.by/teacher/schoolsettings';
                        window.location.replace(urlToRedirect);
                    }
                    return true;
                },
            })
                .then(() => {
                    commit('ADD_PARALLEL', {
                        parallelToAddNumber,
                        newParallelsList,
                    });
                    // updating createdParallelsNumbers because parallels array was changed
                    commit('INITIALIZE_CREATED_PARALLELS_NUMBERS');
                    // everything is fine so we need to emit "close" event
                    commit('CHANGE_EMITTED_EVENT', 'close');
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    commit('SHOW_OR_HIDE_ERROR_MESSAGE', error.response.data.description);
                    // an error occured so we don't need to emit "close" event
                    commit('CHANGE_EMITTED_EVENT', '');
                    setTimeout(() => {
                        // hide error message in 4 seconds
                        commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                    }, 4000);
                    resolve();
                });
        });
    },
    approveParallelChanges({ commit, state }, payload) {
        // check were teacher classes changed

        const { parallelId, parallelNumber } = payload;

        if (checkDoWeNeedToMakeRequest(state.parallels[parallelId].classes, state.arrayOfLettersToAdd)) {
            console.log('close');
            commit('CHANGE_EMITTED_EVENT', 'close');
            return;
        }

        const newParallelsList = JSON.parse(JSON.stringify(state.parallels));
        const classes = JSON.parse(JSON.stringify(state.arrayOfLettersToAdd)).map((item) => {
            const objectToReturn = item;
            delete objectToReturn.isChoosed;
            delete objectToReturn.isClicked;
            return {
                ...objectToReturn,
            };
        });
        const newParallel = {
            number: parallelNumber,
            classes,
        };

        if (newParallel.classes.length === 0) {
            newParallelsList.splice(parallelId, 1);
        } else {
            newParallelsList.splice(parallelId, 1, newParallel);
        }

        return new Promise((resolve) => {
            HTTP.put('approveparallelchanges', newParallel, {
                validateStatus(status) {
                    // 403 status code means that user is not authoraized.then(redirect user to login form)
                    if (status === 403) {
                        const urlToRedirect = 'https://temp1.effor.by/teacher/schoolsettings';
                        window.location.replace(urlToRedirect);
                    }
                    return true;
                },
            })
                .then(() => {
                    commit('APPROVE_PARALLEL_CHANGES', newParallelsList);
                    // updating createdParallelsNumbers because parallels array was changed
                    commit('INITIALIZE_CREATED_PARALLELS_NUMBERS');
                    // everything is fine so we need to emit "close" event
                    commit('CHANGE_EMITTED_EVENT', 'close');
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    commit('SHOW_OR_HIDE_ERROR_MESSAGE', error.response.data.description);
                    // an error occured so we don't need to emit "close" event
                    commit('CHANGE_EMITTED_EVENT', '');
                    setTimeout(() => {
                        // hide error message in 4 seconds
                        commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
                    }, 4000);
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
