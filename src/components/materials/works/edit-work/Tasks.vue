<template>
    <div class="tasks-info-container">
        <choose-task-variants
            v-if="isChooseTaskSeriesShown"
            @close="isChooseTaskSeriesShown = false"
            :taskId="taskId"
            :subTaskId="subTaskId"
            :nestedSubTaskId="nestedSubTaskId"
            :nestedSubSubTaskId="nestedSubSubTaskId"
            :serieObjId="serieObjId"
            :serieObj="serieObj"
        />
        <div class="tasks-changer-container">
            <div class="tasks-numbers-container">
                <span
                    v-for="(task, taskId) in $store.state.worksModule.createdWork.tasks"
                    :key="taskId"
                    :class="[task.isContainChoosedTask ? 'task-is-contain' : 'task-is-not-contain', taskId === $store.state.worksModule.choosedTaskId ? 'task-is-choosed' : '']"
                    @click="changeChoosedTask(taskId)"
                    v-if="$store.state.worksModule.createdWork.tasks.length > 0"
                >
                    {{task.number}}
                </span>
            </div>
            <span>Серий в задании: {{episodesInTask}}</span>
            <span>Всего серий в работе: {{episodesInWork}}</span>
        </div>
        <div class="tasks-tree-container">
            <div
                v-for="(task, taskId) in $store.state.worksModule.taskList"
                :key="taskId"
                class="fit-content"
            >
                <div @click="showOrHideNestedElements(taskId)">
                    <span v-if="!task.isOpened" class="bold-span">+</span>
                    <span v-if="task.isOpened" class="bold-span">-</span>
                    <span class="bold-span">{{task.title}}</span>
                </div>
                <transition name="slide-fade">
                    <div v-if="task.isOpened">
                        <div
                            v-if="task.childrenList.length !== 0"
                            v-for="(subTask, subTaskId) in task.childrenList"
                            :key="subTaskId"
                            class="one-nested fit-content"
                        >
                            <div @click="showOrHideNestedElements(taskId, subTaskId)">
                                <span v-if="!subTask.isOpened" class="bold-span">+</span>
                                <span v-if="subTask.isOpened" class="bold-span">-</span>
                                <span class="bold-span">{{subTask.title}}</span>
                            </div>
                            <transition name="slide-fade" v-if="subTask.childrenList !== null">
                                <div v-if="subTask.isOpened">
                                    <div
                                        v-if="subTask.childrenList.length !== 0"
                                        v-for="(nestedSubTask, nestedSubTaskId) in subTask.childrenList"
                                        :key="nestedSubTaskId"
                                        class="two-nested fit-content"
                                    >
                                        <div @click="showOrHideNestedElements(taskId, subTaskId, nestedSubTaskId)">
                                            <span v-if="!nestedSubTask.isOpened" class="bold-span">+</span>
                                            <span v-if="nestedSubTask.isOpened" class="bold-span">-</span>
                                            <span class="bold-span">{{nestedSubTask.title}}</span>
                                        </div>
                                        <transition name="slide-fade" v-if="nestedSubTask.childrenList !== null">
                                            <div v-if="nestedSubTask.isOpened" class="three-nested task-list">
                                                <div
                                                    v-if="nestedSubTask.childrenList.length !== 0"
                                                    v-for="(nestedSubSubTask, nestedSubSubTaskId) in nestedSubTask.childrenList"
                                                    :key="nestedSubSubTaskId"
                                                    class="two-nested fit-content"
                                                >
                                                    <div @click="showOrHideNestedElements(taskId, subTaskId, nestedSubTaskId, nestedSubSubTaskId)">
                                                        <span v-if="!nestedSubSubTask.isOpened" class="bold-span">+</span>
                                                        <span v-if="nestedSubSubTask.isOpened" class="bold-span">-</span>
                                                        <span class="bold-span">{{nestedSubSubTask.title}}</span>
                                                    </div>
                                                    <transition name="slide-fade">
                                                        <div v-if="nestedSubSubTask.isOpened" class="three-nested task-list">
                                                                <div
                                                                    class="task"
                                                                    v-if="nestedSubSubTask.taskSeries.length !== 0"
                                                                    v-for="(serieObj, serieObjId) in nestedSubSubTask.taskSeries"
                                                                    :key="serieObjId"
                                                                >
                                                                    <img
                                                                        src="../../../../assets/checkbox-icon-active.png"
                                                                        v-if="serieObj.isChoosed"
                                                                        class="checkbox-cursor"
                                                                        @click="changeIsWorkChoosed(taskId, subTaskId, nestedSubTaskId, nestedSubSubTaskId, serieObjId, serieObj)"
                                                                    >
                                                                    <img
                                                                        src="../../../../assets/checkbox-icon.png"
                                                                        v-if="!serieObj.isChoosed"
                                                                        class="checkbox-cursor"
                                                                        @click="changeIsWorkChoosed(taskId, subTaskId, nestedSubTaskId, nestedSubSubTaskId, serieObjId, serieObj)"
                                                                    >
                                                                    <img
                                                                        src="../../../../assets/settings_edit.png"
                                                                        @click="showChooseTaskVariants(taskId, subTaskId, nestedSubTaskId, nestedSubSubTaskId, serieObjId, serieObj)"
                                                                        v-if="serieObj.isChoosed && !serieObj.containsChoosedVariant"
                                                                        class="edit-img"
                                                                    >
                                                                    <img
                                                                        src="../../../../assets/settings_edit_active.png"
                                                                        @click="showChooseTaskVariants(taskId, subTaskId, nestedSubTaskId, nestedSubSubTaskId, serieObjId, serieObj)"
                                                                        v-if="serieObj.isChoosed && serieObj.containsChoosedVariant"
                                                                        class="edit-img"
                                                                    >
                                                                    <a
                                                                        title="Перейти к работе"
                                                                        :href="serieObj.href"
                                                                    >
                                                                        {{serieObj.title}}
                                                                    </a>
                                                                </div>
                                                        </div>
                                                    </transition>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import ChooseTaskVariants from '../ChooseTaskVariants';


export default {
    components: {
        ChooseTaskVariants,
    },
    update() {
        this.$store.commit('LIGHT_CHOOSED_TASKS');
    },
    data() {
        return {
            isChooseTaskSeriesShown: false,
            taskId: null,
            subTaskId: null,
            nestedSubTaskId: null,
            nestedSubSubTaskId: null,
            serieObj: null,
            serieObjId: null,
        };
    },
    methods: {
        changeChoosedTask(taskId) {
            this.$store.commit('CHANGE_CHOOSED_TASK', taskId);
            this.$store.commit('LIGHT_CHOOSED_TASKS');
        },
        showOrHideNestedElements() {
            this.$store.commit('SHOW_OR_HIDE_NESTED_TASKS', arguments);
        },
        changeIsWorkChoosed() {
            this.$store.commit('CHANGE_IS_TASK_CHOOSED', arguments);
        },
        showChooseTaskVariants(taskId, subTaskId, nestedSubTaskId, nestedSubSubTaskId, serieObjId, serieObj) {
            this.taskId = taskId;
            this.subTaskId = subTaskId;
            this.nestedSubTaskId = nestedSubTaskId;
            this.nestedSubSubTaskId = nestedSubSubTaskId;
            this.serieObjId = serieObjId;
            this.serieObj = serieObj;
            this.$store.dispatch('getVariantsForChoosedWork', serieObj)
                .then(() => {
                    this.isChooseTaskSeriesShown = true;
                });
        }
    },
    computed: {
        episodesInTask() {
            if (this.$store.state.worksModule.createdWork.tasks.length === 0) {
                return 0;
            }
            let numberToReturn = 0;
            this.$store.state.worksModule.createdWork.tasks[this.$store.state.worksModule.choosedTaskId].tasks.forEach(() => {
                numberToReturn++;
            });
            return numberToReturn;
        },
        episodesInWork() {
            if (this.$store.state.worksModule.createdWork.tasks.length === 0) {
                return 0;
            }
            let numberToReturn = 0;
            this.$store.state.worksModule.createdWork.tasks.forEach((task, taskId) => {
                task.tasks.forEach(() => {
                    numberToReturn++;
                });
            });
            return numberToReturn;
        },
    },
}
</script>

<style scoped>

.tasks-info-container {
    color: #333;
}

.tasks-info-container > div {
    border: #333 solid 1px;
}

.tasks-changer-container {
    min-height: 100px;
    height: fit-content;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
}

.tasks-changer-container > span {
    margin-top: 4px;
    margin-left: 7px;
}

.tasks-numbers-container > span {
    display: inline-block;
    width: 33px;
    height: 25px;
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;
    background: transparent url('../../../../assets/zero.png') no-repeat 3px 3px;
    border: 1px solid white;
    color: #333;
    margin-right: 4px;
    margin-left: 4px;
    padding-top: 6px;
}

.tasks-numbers-container > span:hover {
    background-color: #ff8d00;
}

.tasks-tree-container {
    height: 250px;
    margin-top: 5px;
}

.task-is-choosed {
    background-color: #ff8d00 !important;
}

.one-nested {
    margin-top: 4px;
    margin-left: 10px;
}

.two-nested {
    margin-top: 4px;
    margin-left: 20px;
}

.three-nested {
    margin-top: 4px;
    margin-left: 30px;
}

.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.tasks-tree-container {
    overflow: scroll;
    cursor: pointer;
    max-height: 250px;
    overflow: auto;
}

.tasks-tree-container > div {
    margin-left: 10px;
}

.task-list {
    display: flex;
    flex-direction: column;
}

.task > a {
    text-decoration: none;
    color: #333;
    margin-left: 5px;
}

.task > a:hover {
    color: #ff8d00;
}

.checkbox-cursor {
    cursor: initial !important;
}

.task {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.task-is-contain {
    border: 1px solid #ff8d00 !important;
}

.task-is-not-contain {
    border: none;
}

.edit-img {
    margin-left: 5px;
    cursor: pointer !important;
}

</style>
