import HTTP from '../../../http-config/index';


const SET_SUBJECT_LIST = 'SET_SUBJECT_LIST';
const SET_PARALLEL_NUMBERS = 'SET_PARALLEL_NUMBERS';
const SET_WORKS_ARRAY = 'SET_WORKS_ARRAY';
const SET_TASKS_TREE = 'SET_TASKS_TREE';
const SET_CHOOSED_WORK = 'SET_CHOOSED_WORK';
const SET_SERIE_VARIANTS = 'SET_SERIE_VARIANTS';
const CHANGE_IS_DATA_LOADED = 'CHANGE_IS_DATA_LOADED';
const INITIALIZE_NEEDED_DATA = 'INITIALIZE_NEEDED_DATA';
const CHANGE_CHOOSED_SUBJECT = 'CHANGE_CHOOSED_SUBJECT';
const CHANGE_CHOOSED_PARALLEL_NUMBER_AND_ID = 'CHANGE_CHOOSED_PARALLEL_NUMBER_AND_ID';
const SHOW_OR_HIDE_CATALOG_MENU = 'SHOW_OR_HIDE_CATALOG_MENU';
const CHOOSE_OR_UNCHOOSE_WORK_TO_ADD = 'CHOOSE_OR_UNCHOOSE_WORK_TO_ADD';
const ADD_CHOOSED_WORKS = 'ADD_CHOOSED_WORKS';
const CLEAR_TEMP_VARIABLES = 'CLEAR_TEMP_VARIABLES';
const CHANGE_CHOOSED_WORK = 'CHANGE_CHOOSED_WORK';
const SET_WORK_CONDUCTING_DATE = 'SET_WORK_CONDUCTING_DATE';
const CREATE_DEFAULT_WORK = 'CREATE_DEFAULT_WORK';
const SET_CREATED_WORK_TASK_COUNT = 'SET_CREATED_WORK_TASK_COUNT';
const SET_CREATED_WORK_TIME = 'SET_CREATED_WORK_TIME';
const SET_CREATED_WORK_TYPE = 'SET_CREATED_WORK_TYPE';
const SET_CREATED_WORK_NAME = 'SET_CREATED_WORK_NAME';
const CHANGE_CHOOSED_TASK = 'CHANGE_CHOOSED_TASK';
const SHOW_OR_HIDE_NESTED_TASKS = 'SHOW_OR_HIDE_NESTED_TASKS';
const CHANGE_IS_TASK_CHOOSED = 'CHANGE_IS_TASK_CHOOSED';
const LIGHT_CHOOSED_TASKS = 'LIGHT_CHOOSED_TASKS';
const ADD_WORK = 'ADD_WORK';
const CLEAR_TASK_CREATION_TEMP_VARIABLES = 'CLEAR_TASK_CREATION_TEMP_VARIABLES';
const SET_EDITING_WORK = 'SET_EDITING_WORK';
const APPROVE_WORK_CHANGES = 'APPROVE_WORK_CHANGES';
const CHOOSE_OR_UNCHOOSE_VARIANT = 'CHOOSE_OR_UNCHOOSE_VARIANT';
const LIFTING_VARIANTS_CHANGES = 'LIFTING_VARIANTS_CHANGES';
const SET_TEMP_TASK = 'SET_TEMP_TASK';
const SET_SERIE_ID_IN_CREATED_WORK = 'SET_SERIE_ID_IN_CREATED_WORK';
const SET_TYPES = 'SET_TYPES';
const LIGHT_IS_CONTAIN_CHOOSED_VARIANTS = 'LIGHT_IS_CONTAIN_CHOOSED_VARIANTS';
const CLEAR_WORK_STATE_MODULE = 'CLEAR_WORK_STATE_MODULE';


const state = {
    isDataLoaded: false,
    subjects: [],
    worksArray: [],
    worksCatalog: [],
    worksToAdd: [],
    choosedSubject: null,
    choosedParallelNumber: null,
    createdParallelNumbers: [],
    choosedParallelId: null,
    isWorksCatalogMenuShown: false,
    choosedWork: null,
    createdWork: null,
    choosedTaskId: 0,
    tempTask: null,
    taskList: [],
    serieIdInCreatedWork: null,
    types: [],
};

const mutations = {
    [SET_SERIE_ID_IN_CREATED_WORK](state, taskObj) {
        const taskObjId = state.createdWork.tasks[state.choosedTaskId].tasks.findIndex((task) => {
            return taskObj.seriesId === task.seriesId;
        });
        state.serieIdInCreatedWork = taskObjId;
    },
    [SET_SUBJECT_LIST](state, subjects) {
        state.subjects = subjects;
    },
    [SET_PARALLEL_NUMBERS](state, parallelNumbers) {
        state.createdParallelNumbers = parallelNumbers.map((parallelNumberObj, id) => {
            return {
                ...parallelNumberObj,
                id,
            };
        });
    },
    [SET_WORKS_ARRAY](state, worksArray) {
        if (worksArray === '') {
            state.worksArray = [];
        }
        if (worksArray instanceof Array) {
            state.worksArray = worksArray;
        }
    },
    [SET_TASKS_TREE](state, tasksTree) {
        if (tasksTree === '') {
            state.taskList = [];
        }
        state.taskList = tasksTree;
    },
    [SET_CHOOSED_WORK](state, choosedWork) {
        state.choosedWork = choosedWork;
    },
    [SET_SERIE_VARIANTS](state, payload) {
        const { taskObj, variants } = payload;
        const taskObjId = state.createdWork.tasks[state.choosedTaskId].tasks.findIndex((task) => {
            return taskObj.seriesId === task.seriesId;
        });
        if (state.createdWork.tasks[state.choosedTaskId].tasks[taskObjId].variants.length > 0) {
            return;
        }
        state.createdWork.tasks[state.choosedTaskId].tasks[taskObjId].variants = variants;
    },
    [CHANGE_IS_DATA_LOADED](state, isDataLoaded) {
        state.isDataLoaded = isDataLoaded;
    },
    [INITIALIZE_NEEDED_DATA](state) {
        if (state.choosedSubject === null) {
            state.choosedSubject = state.subjects[0];
        }
        state.choosedParallelNumber = state.createdParallelNumbers[0].number;
        state.choosedParallelId = state.createdParallelNumbers[0].id;
    },
    [CHANGE_CHOOSED_SUBJECT](state, newSubject) {
        state.choosedSubject = newSubject;
    },
    [CHANGE_CHOOSED_PARALLEL_NUMBER_AND_ID](state, newParallel) {
        state.choosedParallelNumber = newParallel.number;
        state.choosedParallelId = newParallel.id;
    },
    [SHOW_OR_HIDE_CATALOG_MENU](state) {
        state.isWorksCatalogMenuShown = !state.isWorksCatalogMenuShown;
    },
    [CHOOSE_OR_UNCHOOSE_WORK_TO_ADD](state, choosedWorkId) {
        if (state.worksCatalog[state.choosedParallelId].works[state.choosedSubject][choosedWorkId].isChoosed) {
            state.worksCatalog[state.choosedParallelId].works[state.choosedSubject][choosedWorkId].isChoosed = false;
        } else {
            state.worksCatalog[state.choosedParallelId].works[state.choosedSubject][choosedWorkId].isChoosed = true;
        }
    },
    [ADD_CHOOSED_WORKS](state) {
        const worksToAdd = state.worksCatalog[state.choosedParallelId].works[state.choosedSubject].filter((work) => {
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

            state.worksCatalog[state.choosedParallelId].works[state.choosedSubject] = state.worksCatalog[state.choosedParallelId].works[state.choosedSubject].map((workToChange) => {
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
        state.worksCatalog[state.choosedParallelId].works[state.choosedSubject] = state.worksCatalog[state.choosedParallelId].works[state.choosedSubject].map((work) => {
            return {
                ...work,
                isChoosed: false,
                isAdded: false,
            };
        });
    },
    [CHANGE_CHOOSED_WORK](state, newWork) {
        state.choosedWork = newWork;
    },
    [SET_WORK_CONDUCTING_DATE](state, date) {
        const choosedWorkId = state.worksArray.findIndex((work) => {
            return state.choosedWork.id === work.id;
        });
        state.worksArray[choosedWorkId].dateStart = date;
    },
    [CREATE_DEFAULT_WORK](state, userNameInfo) {
        const { firstName, secondName } = userNameInfo;
        const workToCreate = {
            taskCount: 10,
            workTime: 30,
            title: 'Проверочная работа',
            tasks: [],
            author: firstName + ' ' + secondName,
            parallel: state.choosedParallelNumber,
            subjectId: state.choosedSubject.id,
            controlTestTypeId: state.types[0].id,
            controlTestType: state.types[0].title,
        };
        for (let i = 0; i < workToCreate.taskCount; i++) {
            const taskNumber = i + 1;
            workToCreate.tasks.push({
                tasks: [],
                number: taskNumber,
            });
        }
        state.createdWork = workToCreate;
    },
    [SET_CREATED_WORK_TASK_COUNT](state, taskCount) {
        if (+taskCount === 0) {
            state.createdWork.tasks.length = 0;
            state.createdWork.taskCount = 0;
            return;
        }

        if (taskCount === '') {
            state.createdWork.tasks.length = 0;
            state.createdWork.taskCount = '';
            return;
        }

        if (+state.createdWork.taskCount > +taskCount) {
            if (state.choosedTaskId === --state.createdWork.tasks.length) {
                state.choosedTaskId = taskCount - 1;
            }
            state.createdWork.tasks.length = taskCount;
        } else if (+state.createdWork.taskCount < +taskCount) {
            const tasksToAddAmount = taskCount - state.createdWork.taskCount;
            for (let i = 0; i < tasksToAddAmount; i++) {
                state.createdWork.tasks.push({
                    tasks: [],
                });
            }
            state.createdWork.tasks = state.createdWork.tasks.map((task, taskId) => {
                return {
                    ...task,
                    number: taskId + 1,
                };
            });
        }
        state.createdWork.taskCount = taskCount;
    },
    [SET_CREATED_WORK_TIME](state, time) {
        state.createdWork.workTime = time;
    },
    [SET_CREATED_WORK_TYPE](state, type) {
        state.createdWork.controlTestType = type;
        const workTypeId = state.types.find((typeObj) => {
            return typeObj.title === type;
        }).id;
        state.createdWork.controlTestTypeId = workTypeId;
    },
    [SET_CREATED_WORK_NAME](state, name) {
        state.createdWork.title = name;
    },
    [CHANGE_CHOOSED_TASK](state, taskId) {
        state.choosedTaskId = taskId;
    },
    [SHOW_OR_HIDE_NESTED_TASKS](state, args) {
        if (args.length === 1) {
            state.taskList[args[0]].isOpened = !state.taskList[args[0]].isOpened;
        } else if (args.length === 2) {
            state.taskList[args[0]].childrenList[args[1]].isOpened = !state.taskList[args[0]].childrenList[args[1]].isOpened;
        } else if (args.length === 3) {
            state.taskList[args[0]].childrenList[args[1]].childrenList[args[2]].isOpened = !state.taskList[args[0]].childrenList[args[1]].childrenList[args[2]].isOpened;
        } else if (args.length === 4) {
            state.taskList[args[0]].childrenList[args[1]].childrenList[args[2]].childrenList[args[3]].isOpened = !state.taskList[args[0]].childrenList[args[1]].childrenList[args[2]].childrenList[args[3]].isOpened;
        }
    },
    [CHANGE_IS_TASK_CHOOSED](state, args) {
        if (state.taskList[args[0]].childrenList[args[1]].childrenList[args[2]].childrenList[args[3]].taskSeries[args[4]].isChoosed) {
            // delete task
            const taskId = state.createdWork.tasks[state.choosedTaskId].tasks.findIndex((task) => {
                return args[5].seriesId === task.seriesId;
            });
            state.createdWork.tasks[state.choosedTaskId].tasks.splice(taskId, 1);
        } else {
            // add task
            state.createdWork.tasks[state.choosedTaskId].tasks.push(args[5]);
        }
        state.taskList[args[0]].childrenList[args[1]].childrenList[args[2]].childrenList[args[3]].taskSeries[args[4]].isChoosed = !state.taskList[args[0]].childrenList[args[1]].childrenList[args[2]].childrenList[args[3]].taskSeries[args[4]].isChoosed;
    },
    [LIGHT_CHOOSED_TASKS](state) {
        state.taskList = state.taskList.map((task) => {
            let isTaskOpened = false;
            return {
                ...task,
                childrenList: task.childrenList.map((subTask) => {
                    let isSubTaskOpened = false;
                    return {
                        ...subTask,
                        childrenList: subTask.childrenList.map((subSubTask) => {
                            let isSubSubTaskOpened = false;
                            return {
                                ...subSubTask,
                                childrenList: subSubTask.childrenList.map((subSubSubTask) => {
                                    let isSubSubSubTaskOpened = false;
                                    return {
                                        ...subSubSubTask,
                                        taskSeries: subSubSubTask.taskSeries.map((serieObj) => {
                                            let isTaskMustBeLighted = false;
                                            let containsChoosedVariant = false;
                                            if (state.createdWork.tasks.length === 0) {
                                                return {
                                                    ...serieObj,
                                                    isChoosed: false,
                                                };
                                            }
                                            state.createdWork.tasks[state.choosedTaskId].tasks.forEach((tempTask) => {
                                                if (serieObj.seriesId === tempTask.seriesId) {
                                                    isTaskMustBeLighted = true;
                                                    if (serieObj.seriesId === tempTask.seriesId && tempTask.containsChoosedVariant) {
                                                        containsChoosedVariant = true;
                                                    }
                                                }
                                            });
                                            if (isTaskMustBeLighted) {
                                                isTaskOpened = true;
                                                isSubTaskOpened = true;
                                                isSubSubTaskOpened = true;
                                                isSubSubSubTaskOpened = true;
                                            }
                                            return {
                                                ...serieObj,
                                                isChoosed: isTaskMustBeLighted,
                                                containsChoosedVariant,
                                            };
                                        }),
                                        isOpened: isSubSubSubTaskOpened,
                                    };
                                }),
                                isOpened: isSubSubTaskOpened,
                            };
                        }),
                        isOpened: isSubTaskOpened,
                    };
                }),
                isOpened: isTaskOpened,
            };
        });
        state.createdWork.tasks = state.createdWork.tasks.map((task) => {
            if (task.tasks.length > 0) {
                return {
                    ...task,
                    isContainChoosedTask: true,
                };
            }
            return {
                ...task,
                isContainChoosedTask: false,
            };
        });
    },
    [ADD_WORK](state, newWork) {
        const workToAdd = newWork;
        delete workToAdd.tasks;
        state.worksArray.push(workToAdd);
    },
    [CLEAR_TASK_CREATION_TEMP_VARIABLES](state) {
        state.createdWork = null;
        state.taskList = state.taskList.map((task) => {
            return {
                ...task,
                childrenList: task.childrenList.map((subTask) => {
                    return {
                        ...subTask,
                        childrenList: subTask.childrenList.map((subSubTask) => {
                            return {
                                ...subSubTask,
                                isOpened: false,
                            };
                        }),
                        isOpened: false,
                    };
                }),
                isOpened: false,
            };
        });
    },
    [SET_EDITING_WORK](state, workToSet) {
        state.createdWork = workToSet;
    },
    [APPROVE_WORK_CHANGES](state) {
        const workToSetId = state.worksArray.findIndex((work) => {
            return state.createdWork.id === work.id;
        });
        const workToAdd = {
            ...state.createdWork,
        };
        delete workToAdd.tasks;
        state.worksArray.splice(workToSetId, 1, workToAdd);
    },
    [CHOOSE_OR_UNCHOOSE_VARIANT](state, variantId) {
        state.createdWork.tasks[state.choosedTaskId].tasks[state.serieIdInCreatedWork].variants[variantId].isChoosed = !state.createdWork.tasks[state.choosedTaskId].tasks[state.serieIdInCreatedWork].variants[variantId].isChoosed;
        let isContainChoosedVariants = false;
        state.createdWork.tasks[state.choosedTaskId].tasks[state.serieIdInCreatedWork].variants.forEach((variant) => {
            if (variant.isChoosed) {
                isContainChoosedVariants = true;
            }
        });
        console.log(isContainChoosedVariants);
        state.createdWork.tasks[state.choosedTaskId].tasks[state.serieIdInCreatedWork].containsChoosedVariant = isContainChoosedVariants;
    },
    [LIFTING_VARIANTS_CHANGES](state) {
        state.createdWork.tasks[state.choosedTaskId].tasks[state.serieIdInCreatedWork].variants = JSON.parse(JSON.stringify(state.tempTask.variants));
        state.createdWork.tasks[state.choosedTaskId].tasks[state.serieIdInCreatedWork].containsChoosedVariant = state.tempTask.containsChoosedVariant;
    },
    [SET_TEMP_TASK](state, taskObj) {
        const taskObjId = state.createdWork.tasks[state.choosedTaskId].tasks.findIndex((task) => {
            return task.seriesId === taskObj.seriesId;
        });
        const tempTask = JSON.parse(JSON.stringify(state.createdWork.tasks[state.choosedTaskId].tasks[taskObjId]));
        state.tempTask = tempTask;
    },
    [SET_TYPES](state, types) {
        state.types = types;
    },
    [LIGHT_IS_CONTAIN_CHOOSED_VARIANTS](state) {
        state.taskList = state.taskList.map((task) => {
            return {
                ...task,
                childrenList: task.childrenList.map((subTask) => {
                    return {
                        ...subTask,
                        childrenList: subTask.childrenList.map((subSubTask) => {
                            return {
                                ...subSubTask,
                                childrenList: subSubTask.childrenList.map((subSubSubTask) => {
                                    return {
                                        ...subSubSubTask,
                                        taskSeries: subSubSubTask.taskSeries.map((serieObj) => {
                                            let containsChoosedVariant = false;
                                            state.createdWork.tasks[state.choosedTaskId].tasks.forEach((tempTask) => {
                                                if (serieObj.seriesId === tempTask.seriesId && tempTask.containsChoosedVariant) {
                                                    containsChoosedVariant = true;
                                                }
                                            });
                                            return {
                                                ...serieObj,
                                                containsChoosedVariant,
                                            };
                                        }),
                                    };
                                }),
                            };
                        }),
                    };
                }),
            };
        });
    },
    [CLEAR_WORK_STATE_MODULE](state) {
        state.isDataLoaded = false;
        state.subjects = [];
        state.worksArray = [];
        state.worksCatalog = [];
        state.worksToAdd = [];
        state.createdParallelNumbers = [];
        state.isWorksCatalogMenuShown = false;
        state.choosedWork = null;
        state.createdWork = null;
        state.choosedTaskId = 0;
        state.tempTask = null;
        state.taskList = [];
        state.serieIdInCreatedWork = null;
        state.types = [];
    },
};

const actions = {
    getWorkTypes({ commit }) {
        return new Promise((resolve) => {
            HTTP.get('controltest/type')
                .then((response) => {
                    commit('SET_TYPES', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    getSubjectsArray({ commit }) {
        return new Promise((resolve) => {
            HTTP.get('subjects')
                .then((response) => {
                    commit('SET_SUBJECT_LIST', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    getParallelNumbers({ commit }) {
        return new Promise((resolve) => {
            HTTP.get('parallelnumbers')
                .then((response) => {
                    commit('SET_PARALLEL_NUMBERS', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    getWorksArray({ state, commit }) {
        return new Promise((resolve) => {
            const url = 'controltest/parallel/' + state.choosedParallelNumber + '/subject/' + state.choosedSubject.id;
            HTTP.get(url)
                .then((response) => {
                    commit('SET_WORKS_ARRAY', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    changeWorkDate({ state, commit }, newDate) {
        return new Promise((resolve) => {
            const url = 'controltest/date';
            HTTP.put(url, {
                id: state.choosedWork.id,
                dateStart: newDate,
            })
                .then((response) => {
                    commit('SET_WORK_CONDUCTING_DATE', newDate);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    getTasksTree({ state, commit }) {
        return new Promise((resolve) => {
            const url = 'taskclassifier/subject/' + state.choosedSubject.id;
            HTTP.get(url)
                .then((response) => {
                    commit('SET_TASKS_TREE', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    getEditingWork({ commit }, workId) {
        return new Promise((resolve) => {
            const url = 'controltest/' + workId;
            HTTP.get(url)
                .then((response) => {
                    commit('SET_EDITING_WORK', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    getVariantsForChoosedWork({ state, commit }, taskObj) {
        commit('SET_SERIE_ID_IN_CREATED_WORK', taskObj);
        return new Promise((resolve) => {
            const url = 'controltest/' + state.choosedWork.id + '/tasks/' + Number(state.choosedTaskId + 1)  +  '/series/' + taskObj.seriesId + '/variants';
            HTTP.get(url)
                .then((response) => {
                    commit('SET_SERIE_VARIANTS', { taskObj, variants: response.data });
                    commit('SET_TEMP_TASK', taskObj);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    getVariantsForNewWork({ state, commit }, taskObj) {
        return new Promise((resolve) => {
            const url = 'controltest/tasks/' + Number(state.choosedTaskId + 1) + '/series/' + taskObj.seriesId + '/variants';
            HTTP.get(url)
                .then((response) => {
                    commit('SET_SERIE_VARIANTS', { taskObj, variants: response.data });
                    commit('SET_SERIE_ID_IN_CREATED_WORK', taskObj);
                    commit('SET_TEMP_TASK', taskObj);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    createWork({ state, commit }) {
        let workToCreate = JSON.parse(JSON.stringify(state.createdWork));
        workToCreate = {
            ...workToCreate,
            tasks: workToCreate.tasks.map((task) => {
                return {
                    ...task,
                    tasks: task.tasks.map((subTask) => {
                        return {
                            ...subTask,
                            variants: subTask.variants.filter((variant) => {
                                return variant.isChoosed;
                            }),
                        };
                    }),
                };
            }),
        };
        return new Promise((resolve) => {
            HTTP.post('controltest', workToCreate)
                .then((response) => {
                    commit('ADD_WORK', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    resolve();
                });
        });
    },
    approveWorkChanges({ state, commit }) {
        return new Promise((resolve) => {
            HTTP.put('controltest', state.createdWork)
                .then(() => {
                    commit('APPROVE_WORK_CHANGES', state.createdWork);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
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
