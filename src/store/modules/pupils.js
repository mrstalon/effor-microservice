import parallels from '../../response-mocks/parallels';


const CHOOSE_PARALLEL_TO_RENDER = 'CHOOSE_PARALLEL_TO_RENDER';
const CHANGE_CHOOSED_CLASS = 'CHANGE_CHOOSED_CLASS';
const CHOOSE_PUPIL_TO_DELETE = 'CHOOSE_PUPIL_TO_DELETE';
const APPROVE_PUPIL_LIST_CHANGES = 'APPROVE_PUPIL_LIST_CHANGES';


const state = {
    parallels,
    choosedParallelId: 0,
    choosedParallelNumber: 1,
    choosedClassLetter: null,
    choosedClassId: null,
    choosedClassPupilList: [],
    tempPupilList: [],
};

const mutations = {
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
    [APPROVE_PUPIL_LIST_CHANGES](state) {
        const newParallelsList = JSON.parse(JSON.stringify(state.parallels));
        const classId = newParallelsList[state.choosedParallelId].classes.findIndex((classObj) => {
            return classObj.letter === state.choosedClassLetter;
        });
        newParallelsList[state.choosedParallelId].classes[classId].pupils = state.tempPupilList;

        state.parallels = newParallelsList;
    },
};


export default {
    state,
    mutations,
};
