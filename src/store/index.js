import alphabet from './alphabet';
import teachers from './teachers';
import parallels from './parallels';
import sortFunctions from './quickSorts';

const quickAlphabetSort = sortFunctions.quickAlphabetSort;
const quickParallelSort = sortFunctions.quickParallelsSort;

function removeElementFromArray(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}


const store = {
    state: {
        userName: 'Анна',
        teachers,
        parallels,
        createdParallelsNumbers: [1, 2, 3],
        alphabet,
        arrayOfLettersToAdd: [],
        choosedParallel: null,
        tempTeacher: null,
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
                    letter: item,
                };
            });
            parallelToAdd.classes = quickAlphabetSort(classes);

            state.createdParallelsNumbers.push(parToAddNumber);
            state.parallels.push(parallelToAdd);
            state.parallels = quickParallelSort(state.parallels);
        },
        clearArrayOfLettersToAdd(state) {
            state.arrayOfLettersToAdd = [];
        },
        makeStateOfAlphabetInitial(state) {
            state.alphabet = state.alphabet.map((item) => {
                item.isClicked = false;
                return item;
            });
        },
        changeIsLetterClicked(state, letterId) {
            state.alphabet[letterId].isClicked = !state.alphabet[letterId].isClicked;
        },
        sortArrayOfLetters(state) {
            state.arrayOfLettersToAdd = quickAlphabetSort(state.arrayOfLettersToAdd);
        },
        lightClassesLettersInAlphabet(state, parNumber) {
            const parallel = state.parallels[parNumber];
            const classesLetters = parallel.classes.map((item) => {
                return item.letter;
            });


            let i = 0;
            const arrayOfLettersLength = classesLetters.length;
            let newAlphabet = [].concat(state.alphabet);
            while (arrayOfLettersLength > i) {
                newAlphabet = newAlphabet.map((item) => {
                    if (item.letter === classesLetters[0]) {
                        item.isClicked = true;
                        return item;
                    }
                    return item;
                });
                classesLetters.shift();
                i += 1;
            }
            state.alphabet = newAlphabet;
        },
        fillArrayOfLettersToAdd(state, parId) {
            const parallel = state.parallels[parId];
            state.arrayOfLettersToAdd = parallel.classes.map((item) => {
                return item.letter;
            });
        },
        approveParallelChanges(state, payload) {
            const parId = payload.parId;
            const parNumber = payload.parNumber;

            const classes = state.arrayOfLettersToAdd.map((item) => {
                return {
                    letter: item,
                };
            });

            const newParallel = {
                number: parNumber,
                classes,
            };

            state.parallels.splice(parId, 1, newParallel);
        },
        changeChoosedTeacher(state, newTeacherId) {
            const choosedTeacher = Object.assign({}, state.teachers[newTeacherId]);
            let tempParallels = [].concat(state.parallels);
            console.log(tempParallels === state.parallels);

            tempParallels = tempParallels.map((item) => {
                item.isChoosed = false;
                item.isTeached = false;
                return item;
            });

            choosedTeacher.classes.forEach((item) => {
                tempParallels[item.parNumber - 1].isTeached = true;
            });

            tempParallels = tempParallels.map((item) => {
                item.classes = item.classes.map((subItem) => {
                    return {
                        letter: subItem.letter,
                    };
                });
                return item;
            });

            choosedTeacher.classes.forEach((item) => {
                const id = tempParallels[item.parNumber - 1].classes.findIndex((classObj) => {
                    return classObj.letter === item.classLetter;
                });
                if (id >= 0) {
                    tempParallels[item.parNumber - 1].classes[id].isChoosed = true;
                }
            });

            choosedTeacher.tempParallels = tempParallels;

            state.tempTeacher = choosedTeacher;
            console.log(choosedTeacher);
        },
        clearChoosedTeacher(state) {
            state.tempTeacher = null;
        },
        clearChoosedParallel(state) {
            state.choosedParallel = null;
        },
        chooseParallel(state, parId) {
            const tempTeacher = Object.assign({}, state.tempTeacher);
            tempTeacher.tempParallels = tempTeacher.tempParallels.map((parallel) => {
                parallel.isChoosed = false;
                return parallel;
            });

            tempTeacher.tempParallels[parId].isChoosed = !state.tempTeacher.tempParallels[parId].isChoosed;
            state.tempTeacher = tempTeacher;
            state.choosedParallel = state.tempTeacher.tempParallels[parId];
        },
    },
    actions: {

    },
};

export default store;
