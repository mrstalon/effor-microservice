import axios from 'axios';

import removeElementFromArray from '../../helpers/remove-element-from-array';
import sortFunctions from '../../helpers/quick-sorts';

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


const state = {
    arrayOfLettersToAdd: [],
    createdParallelsNumbers: null,
    alphabet,
    parallels: [],
    wereTeacherClassesChanged: false,
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
    [ADD_LETTER_TO_ARRAY_OF_LETTERS](state, letter) {
        state.arrayOfLettersToAdd.push(letter);
    },
    [DELETE_LETTER_FROM_ARRAY_OF_LETTERS](state, letter) {
        removeElementFromArray(state.arrayOfLettersToAdd, letter);
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
        state.alphabet = state.alphabet.map((item) => {
            return {
                ...item,
                isChoosed: false,
            };
        });
    },
    [CHANGE_IS_LETTER_CHOOSED](state, letterId) {
        const newAlphabet = JSON.parse(JSON.stringify(state.alphabet));
        newAlphabet[letterId].isChoosed = !newAlphabet[letterId].isChoosed;
        state.alphabet = newAlphabet;
        state.wereTeacherClassesChanged = true;
    },
    [LIGHT_CHOOSED_CLASSES_LETTERS_IN_ALPHABET](state, parallelNumber) {
        console.log(state);
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
            return item.letter;
        });
        state.wereTeacherClassesChanged = false;
    },
    [APPROVE_PARALLEL_CHANGES](state, newParallelsList) {
        // approving changes of parallel data
        state.parallels = newParallelsList;
    },
};

const actions = {
    getParallelsList({ commit }) {
        axios({
            url: 'http://192.168.1.39:8090/teacher/api/getparallels',
            method: 'get',
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                commit('SET_PARALLELS_LIST', response.data.parallels);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    addParallel({ commit, state }, parallelToAddNumber) {
        let newParallelsList = JSON.parse(JSON.stringify(state.parallels));

        const parallelToAdd = {
            number: parallelToAddNumber,
        };

        const classes = JSON.parse(JSON.stringify(state.arrayOfLettersToAdd)).map((item) => {
            return {
                letter: item,
            };
        });
        parallelToAdd.classes = quickAlphabetSort(classes);


        newParallelsList.push(parallelToAdd);
        newParallelsList = quickParallelsSort(state.parallels);
        newParallelsList = state.parallels.map((parallel, id) => {
            return {
                ...parallel,
                id,
            };
        });

        axios({
            url: 'http://192.168.1.39:8090/teacher/api/approveparallelchanges',
            method: 'post',
            data: { data: JSON.stringify(parallelToAdd) },
            withCredentials: true,
        })
            .then(() => {
                commit('ADD_PARALLEL', {
                    parallelToAddNumber,
                    newParallelsList,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    approveParallelChanges({ commit, state }, payload) {
        // check were teacher classes changed
        const { parallelId, parallelNumber } = payload;

        // console.log(state.parallels[parallelId].classes);
        // console.log(state.arrayOfLettersToAdd);
        // if (JSON.stringify(state.parallels[parallelId].classes) == JSON.stringify(state.arrayOfLettersToAdd.forEach(()))) {
        //     console.log('return');
        // }

        const newParallelsList = JSON.parse(JSON.stringify(state.parallels));

        const classes = JSON.parse(JSON.stringify(state.arrayOfLettersToAdd)).map((item) => {
            return {
                ...item,
                letter: item,
            };
        });

        console.log(classes);

        const newParallel = {
            number: parallelNumber,
            classes,
        };

        console.log(JSON.stringify(newParallel));

        newParallelsList.splice(parallelId, 1, newParallel);


        axios({
            url: 'http://192.168.1.39:8090/teacher/api/approveparallelchanges',
            method: 'post',
            data: newParallel,
            // data: JSON.stringify(newParallel),
            withCredentials: true,
        })
            .then(() => {
                commit('APPROVE_PARALLEL_CHANGES', newParallelsList);
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
