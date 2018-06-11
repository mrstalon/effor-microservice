import parallelsList from '../../response-mocks/parallels';
import teachersList from '../../response-mocks/teachers';


import sortFunctions from '../../helpers/quick-sorts';

const { quickTeacherClassesSort } = sortFunctions;


const CHANGE_CHOOSED_TEACHER = 'CHANGE_CHOOSED_TEACHER';
const CLEAR_TEMP_VARIABLES = 'CLEAR_TEMP_VARIABLES';
const CHOOSE_PARALLEL = 'CHOOSE_PARALLEL';
const CHOOSE_LETTER = 'CHOOSE_LETTER';
const APPROVE_TEACHER_CHANGES = 'APPROVE_TEACHER_CHANGES';
const REMOVE_TEACHER = 'REMOVE_TEACHER';


const state = {
    parallels: parallelsList,
    teachers: teachersList,
    choosedParallel: null,
    tempTeacher: null,
    tempClasses: null,
};

const mutations = {
    [CHANGE_CHOOSED_TEACHER](state, newTeacherId) {
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
                return classObj.letter === item.classLetter;
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
                return classObj.classLetter === letter && classObj.parNumber === parallelNumber;
            });

            state.tempClasses.splice(classId, 1);
            const choosedParallel = JSON.parse(JSON.stringify(state.choosedParallel));
            choosedParallel.classes[letterId].isChoosed = false;
            state.choosedParallel = choosedParallel;
        } else {
            // adding this class to tempClasses and set isChoosed of this letter to true

            state.tempClasses.push({
                parNumber: parallelNumber,
                classLetter: letter,
            });
            const choosedParallel = JSON.parse(JSON.stringify(state.choosedParallel));
            choosedParallel.classes[letterId].isChoosed = true;
            state.choosedParallel = choosedParallel;
        }
    },
    [APPROVE_TEACHER_CHANGES](state) {
        // approving changes of teacher data
        const tempTeacher = JSON.parse(JSON.stringify(state.tempTeacher));
        const newTeacher = {
            name: tempTeacher.name,
            id: tempTeacher.id,
            classes: quickTeacherClassesSort(JSON.parse(JSON.stringify(state.tempClasses))),
        };
        state.teachers.splice(tempTeacher.id, 1, newTeacher);
    },
    [REMOVE_TEACHER](state, teacherId) {
        state.teachers.splice(teacherId, 1);

        // updating teacher's id
        state.teachers = state.teachers.map((teacher, index) => {
            return {
                ...teacher,
                id: index,
            };
        });
    },
};

export default {
    state,
    mutations,
};
