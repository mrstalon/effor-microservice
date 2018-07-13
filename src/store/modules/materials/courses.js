import coursesArray from '../../../response-mocks/courses';

const CHANGE_CHOOSED_SUBJECT = 'CHANGE_CHOOSED_SUBJECT';
const CHANGE_CHOOSED_WORK_TYPE = 'CHANGE_CHOOSED_WORK_TYPE';
const SHOW_OR_HIDE_NESTED_ELEMENTS = 'SHOW_OR_HIDE_NESTED_ELEMENTS';


const state = {
    choosedSubject: 'Белорусский язык',
    choosedWorkType: 'Общие курсы',
    coursesArray,
};

const mutations = {
    [CHANGE_CHOOSED_SUBJECT](state, newSubject) {
        state.choosedSubject = newSubject;
    },
    [CHANGE_CHOOSED_WORK_TYPE](state, newWorkType) {
        state.choosedWorkType = newWorkType;
    },
    [SHOW_OR_HIDE_NESTED_ELEMENTS](state, args) {
        if (args.length === 1) {
            state.coursesArray[state.choosedSubject][state.choosedWorkType][args[0]].isOpened = !state.coursesArray[state.choosedSubject][state.choosedWorkType][args[0]].isOpened;
        } else if (args.length === 2) {
            state.coursesArray[state.choosedSubject][state.choosedWorkType][args[0]].works[args[1]].isOpened = !state.coursesArray[state.choosedSubject][state.choosedWorkType][args[0]].works[args[1]].isOpened;
        } else if (args.length === 3) {
            state.coursesArray[state.choosedSubject][state.choosedWorkType][args[0]].works[args[1]].works[args[2]].isOpened = !state.coursesArray[state.choosedSubject][state.choosedWorkType][args[0]].works[args[1]].works[args[2]].isOpened;
        }
    },
};

const actions = {

};

export default {
    state,
    mutations,
    actions,
};
