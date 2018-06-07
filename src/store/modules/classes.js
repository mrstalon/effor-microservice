import removeElementFromArray from '../../helpers/removeElementFromArray';
import sortFunctions from '../../helpers/quick-sorts';

import teachers from '../../response-mocks/teachers';
import parallels from '../../response-mocks/parallels';
import alphabet from '../../response-mocks/alphabet';


const { quickAlphabetSort, quickParallelsSort, quickSort } = sortFunctions;


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
    teachers,
    alphabet,
    parallels,
};


const mutations = {
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
    [ADD_PARALLEL](state, parToAddNumber) {
        const parallelToAdd = {
            number: parToAddNumber,
        };

        const classes = JSON.parse(JSON.stringify(state.arrayOfLettersToAdd)).map((item) => {
            return {
                letter: item,
            };
        });
        parallelToAdd.classes = quickAlphabetSort(classes);

        state.createdParallelsNumbers.push(parToAddNumber);
        state.parallels.push(parallelToAdd);
        state.parallels = quickParallelsSort(state.parallels);
        state.parallels = state.parallels.map((parallel, id) => {
            return {
                ...parallel,
                id,
            };
        });
        state.createdParallelsNumbers = quickSort(state.createdParallelsNumbers);
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
    },
    [APPROVE_PARALLEL_CHANGES](state, payload) {
        // approving changes of parallel data
        const { parallelId, parallelNumber } = payload;

        const classes = JSON.parse(JSON.stringify(state.arrayOfLettersToAdd)).map((item) => {
            return {
                letter: item,
            };
        });

        const newParallel = {
            number: parallelNumber,
            classes,
        };

        state.parallels.splice(parallelId, 1, newParallel);
    },
};

export default {
    state,
    mutations,
};
