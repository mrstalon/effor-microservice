import parallels from '../../../response-mocks/parallels';
import worksArray from '../../../response-mocks/works';

const INITIALIZE_NEEDED_DATA = 'INITIALIZE_NEEDED_DATA';
const CHANGE_CHOOSED_SUBJECT = 'CHANGE_CHOOSED_SUBJECT';
const CHANGE_CHOOSED_PARALLEL_NUMBER_AND_ID = 'CHANGE_CHOOSED_PARALLEL_NUMBER_AND_ID';
const SHOW_OR_HIDE_CATALOG_MENU = 'SHOW_OR_HIDE_CATALOG_MENU';
const CHOOSE_OR_UNCHOOSE_WORK_TO_ADD = 'CHOOSE_OR_UNCHOOSE_WORK_TO_ADD';
const ADD_CHOOSED_WORKS = 'ADD_CHOOSED_WORKS';
const CLEAR_TEMP_VARIABLES = 'CLEAR_TEMP_VARIABLES';
const CHANGE_CHOOSED_WORK = 'CHANGE_CHOOSED_WORK';
const SET_WORK_CONDUCTING_DATE = 'SET_WORK_CONDUCTING_DATE';


const state = {
    subjects: [
        'Математика',
        'Русский язык',
        'Белорусский язык',
        'Информатика',
        'Физика',
        'Химия',
        'Астрономия',
        'Развитие',
    ],
    parallels,
    worksArray,
    worksToAdd: [],
    choosedSubject: null,
    choosedParallelNumber: null,
    createdParallelNumbers: [],
    choosedParallelId: null,
    isWorksCatalogMenuShown: false,
    choosedWorkId: null,
};

const mutations = {
    [INITIALIZE_NEEDED_DATA](state) {
        state.choosedSubject = state.subjects[0];
        state.createdParallelNumbers = state.parallels.map((parallel) => {
            return parallel.number;
        });
        state.choosedParallelNumber = state.parallels[0].number;
        state.choosedParallelId = state.parallels[0].id;
    },
    [CHANGE_CHOOSED_SUBJECT](state, newSubject) {
        state.choosedSubject = newSubject;
    },
    [CHANGE_CHOOSED_PARALLEL_NUMBER_AND_ID](state, newParallelNumber) {
        const newParallelId = state.parallels.findIndex((parallel) => {
            return parallel.number === newParallelNumber;
        });
        state.choosedParallelNumber = newParallelNumber;
        state.choosedParallelId = newParallelId;
    },
    [SHOW_OR_HIDE_CATALOG_MENU](state) {
        state.isWorksCatalogMenuShown = !state.isWorksCatalogMenuShown;
    },
    [CHOOSE_OR_UNCHOOSE_WORK_TO_ADD](state, choosedWorkId) {
        if (state.worksArray[state.choosedParallelId].works[state.choosedSubject][choosedWorkId].isChoosed) {
            state.worksArray[state.choosedParallelId].works[state.choosedSubject][choosedWorkId].isChoosed = false;
        } else {
            state.worksArray[state.choosedParallelId].works[state.choosedSubject][choosedWorkId].isChoosed = true;
        }
    },
    [ADD_CHOOSED_WORKS](state) {
        const worksToAdd = state.worksArray[state.choosedParallelId].works[state.choosedSubject].filter((work) => {
            return work.isChoosed;
        });
        worksToAdd.forEach((work) => {
            const workToAdd = {
                ...work,
            };
            delete workToAdd.isChoosed;
            delete workToAdd.isAdded;
            workToAdd.type = 'Тренировочная';

            state.parallels[state.choosedParallelId].works[state.choosedSubject].push(workToAdd);

            state.worksArray[state.choosedParallelId].works[state.choosedSubject] = state.worksArray[state.choosedParallelId].works[state.choosedSubject].map((workToChange) => {
                if (workToChange.isChoosed) {
                    return {
                        ...workToChange,
                        isAdded: true,
                    };
                }
                return workToChange;
            });
        });
    },
    [CLEAR_TEMP_VARIABLES](state) {
        if (!state.choosedParallelId) {
            return;
        }
        state.worksArray[state.choosedParallelId].works[state.choosedSubject] = state.worksArray[state.choosedParallelId].works[state.choosedSubject].map((work) => {
            return {
                ...work,
                isChoosed: false,
                isAdded: false,
            };
        });
    },
    [CHANGE_CHOOSED_WORK](state, newWorkId) {
        state.choosedWorkId = newWorkId;
    },
    [SET_WORK_CONDUCTING_DATE](state, date) {
        state.parallels[state.choosedParallelId].works[state.choosedSubject][state.choosedWorkId].conducted = date;
    },
};

const actions = {

};

export default {
    state,
    mutations,
    actions,
};
