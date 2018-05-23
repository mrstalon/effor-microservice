import alphabet from './alphabet';

function removeElementFromArray(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

const store = {
    state: {
        userName: 'Анна',
        parallels: [
            {
                number: 1,
                classes: [
                    {
                        letter: 'А',
                        
                    },
                    {
                        letter: 'Б',
                    },
                    {
                        letter: 'В',
                    },
                    {
                        letter: 'Г',
                    },
                ],
            },
            {
                number: 2,
                classes: [
                    {
                        letter: 'А',
                    },
                    {
                        letter: 'Б',
                    },
                    {
                        letter: 'В',
                    },
                ],
            },
            {
                number: 3,
                classes: [
                    {
                        letter: 'А',
                    },
                    {
                        letter: 'Б',
                    },
                ],
            },
        ],
        createdParallelsNumbers: [1, 2, 3],
        alphabet,
        arrayOfLettersToAdd: [],
    },
    mutations: {
        addLetterToArrayOfLetters(state, letter) {
            state.arrayOfLettersToAdd.push(letter);
        },
        deleteLetterFromArrayOfLetters(state, letter) {
            removeElementFromArray(state.arrayOfLettersToAdd, letter);
        },
        addParallel(state, parToAddNumber) {
            const parallelToAdd = {
                number: parToAddNumber,
            };

            const classes = state.arrayOfLettersToAdd.map((item) => {
                return {
                    letter: item.letter,
                };
            });
            parallelToAdd.classes = classes;

            state.createdParallelsNumbers.push(parToAddNumber);
            state.parallels.push(parallelToAdd);
        },
        changeIsLetterClicked(state, letterId) {
            state.alphabet[letterId].isClicked = !state.alphabet[letterId].isClicked;
        },
    },
    actions: {

    },
};

export default store;
