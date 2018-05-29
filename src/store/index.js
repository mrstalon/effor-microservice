import alphabet from './alphabet';
import teachers from './teachers';
import parallels from './parallels';
import sortFunctions from './quickSorts';

const { quickAlphabetSort, quickParallelSort, quickTeacherClassesSort } = sortFunctions;

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
        tempClasses: null,
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

            const classes = JSON.parse(JSON.stringify(state.arrayOfLettersToAdd)).map((item) => {
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
                return {
                    ...item,
                    isChoosed: false,
                };
            });
        },
        changeIsLetterChoosed(state, letterId) {
            const newAlphabet = JSON.parse(JSON.stringify(state.alphabet));
            newAlphabet[letterId].isChoosed = !newAlphabet[letterId].isChoosed;
            state.alphabet = newAlphabet;
        },
        sortArrayOfLetters(state) {
            state.arrayOfLettersToAdd = quickAlphabetSort(state.arrayOfLettersToAdd);
        },
        lightChoosedClassesLettersInAlphabet(state, parNumber) {
            const classesLetters = JSON.parse(JSON.stringify(state.parallels[parNumber].classes)).map((item) => {
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
        fillArrayOfLettersToAdd(state, parId) {
            // filling arrayOfLettersToAdd with already added letters(making arrayOfLettersToAdd state initial)
            state.arrayOfLettersToAdd = JSON.parse(JSON.stringify(state.parallels[parId].classes)).map((item) => {
                return item.letter;
            });
        },
        approveParallelChanges(state, payload) {
            // approving changes of parallel data
            const { parId, parNumber } = payload;

            const classes = JSON.parse(JSON.stringify(state.arrayOfLettersToAdd)).map((item) => {
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
            // changing choosed teacher + lighting parallels and classes teached by this teacher
            const newChoosedTeacher = JSON.parse(JSON.stringify(state.teachers[newTeacherId]));
            let newTempParallels = JSON.parse(JSON.stringify(state.parallels));

            newTempParallels = newTempParallels.map((item) => {
                return {
                    ...item,
                    isChoosed: false,
                    isTeached: false,
                };
            });

            newChoosedTeacher.classes.forEach((item) => {
                newTempParallels[item.parNumber - 1].isTeached = true;
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
                const id = newTempParallels[item.parNumber - 1].classes.findIndex((classObj) => {
                    return classObj.letter === item.classLetter;
                });
                if (id >= 0) {
                    newTempParallels[item.parNumber - 1].classes[id].isChoosed = true;
                }
            });

            newChoosedTeacher.tempParallels = newTempParallels;

            state.tempTeacher = newChoosedTeacher;
            state.tempClasses = JSON.parse(JSON.stringify(state.tempTeacher.classes));
        },
        clearTempVariables(state) {
            state.choosedParallel = null;
            state.tempClasses = null;
            state.tempTeacher = null;
        },
        chooseParallel(state, parId) {
            // changing choosed parallel
            const newTempTeacher = JSON.parse(JSON.stringify(state.tempTeacher));
            newTempTeacher.tempParallels = newTempTeacher.tempParallels.map((parallel) => {
                return {
                    ...parallel,
                    isChoosed: false,
                };
            });

            newTempTeacher.tempParallels[parId].isChoosed = !state.tempTeacher.tempParallels[parId].isChoosed;
            state.tempTeacher = newTempTeacher;
            state.choosedParallel = state.tempTeacher.tempParallels[parId];
        },
        chooseLetter(state, payload) {
            const { parId, letter } = payload;
            const letterId = state.choosedParallel.classes.findIndex((item) => {
                return item.letter === letter;
            });

            if (state.choosedParallel.classes[letterId].isChoosed === true) {
                // deleting this class from tempClasses and set isChoosed of this letter to false
                const classId = state.tempClasses.findIndex((classObj) => {
                    return classObj.classLetter === letter && classObj.parNumber === parId + 1;
                });

                state.tempClasses.splice(classId, 1);
                const choosedParallel = JSON.parse(JSON.stringify(state.choosedParallel));
                choosedParallel.classes[letterId].isChoosed = false;
                state.choosedParallel = choosedParallel;
            } else {
                // adding this class to tempClasses and set isChoosed of this letter to true
                state.tempClasses.push({
                    parNumber: parId + 1,
                    classLetter: letter,
                });
                const choosedParallel = JSON.parse(JSON.stringify(state.choosedParallel));
                choosedParallel.classes[letterId].isChoosed = true;
                state.choosedParallel = choosedParallel;
            }
        },
        approveTeacherChanges(state) {
            // approving changes of teacher data
            const tempTeacher = JSON.parse(JSON.stringify(state.tempTeacher));
            const newTeacher = {
                name: tempTeacher.name,
                id: tempTeacher.id,
                classes: quickTeacherClassesSort(JSON.parse(JSON.stringify(state.tempClasses))),
            };
            state.teachers.splice(tempTeacher.id, 1, newTeacher);
        },
        removeTeacher(state, teacherId) {
            state.teachers.splice(teacherId, 1);

            // updating teacher's id
            state.teachers = state.teachers.map((teacher, index) => {
                return {
                    ...teacher,
                    id: index,
                };
            });
        },
    },
    actions: {

    },
};

export default store;
