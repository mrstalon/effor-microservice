<template>
    <div class="tasks-info-container" v-if="isLoaded">
        <subject-menu
            v-if="isSubjectMenuShown"
            @close="isSubjectMenuShown = false"
        />
        <div class="choose-buttons-container">
            <span>по предмету</span>
            <button @click="showSubjectMenu()">{{$store.state.taskBaseModule.choosedSubject.title}}</button>
        </div>
        <div class="tasks-tree-container">
            <div
                v-for="(task, taskId) in $store.state.taskBaseModule.taskBaseArray"
                :key="taskId"
                class="fit-content"
            >
                <div @click="showOrHideNestedElements(taskId)" class="element">
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
                            <div @click="showOrHideNestedElements(taskId, subTaskId)" class="element">
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
                                        <div @click="showOrHideNestedElements(taskId, subTaskId, nestedSubTaskId)" class="element">
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
                                                    <div @click="showOrHideNestedElements(taskId, subTaskId, nestedSubTaskId, nestedSubSubTaskId)" class="element">
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
                                                                    <a
                                                                        title="Перейти к работе"
                                                                        :href="serieObj.href"
                                                                        class="href-to-test"
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
import SubjectMenu from '../../components/materials/task-base/SubjectsMenu';

export default {
    beforeMount() {
        if (this.$store.state.coursesModule.choosedSubject === null) {
            this.$store.dispatch('getSubjectsArray')
                .then(() => {
                    this.$store.commit('INITIALIZE_CHOOSED_SUBJECT');
                    this.$store.dispatch('getTaskBaseArray')
                        .then(() => {
                            this.isLoaded = true;
                        });
                });
        } else {
            this.$store.dispatch('getTaskBaseArray')
                .then(() => {
                    this.isLoaded = true;
                })
        }
    },
    beforeDestroy() {
        this.$store.commit('CLEAR_TASK_BASE_STATE_MODULE');
    },
    components: {
        SubjectMenu,
    },
    data() {
        return {
            isSubjectMenuShown: false,
            isLoaded: false,
        };
    },
    methods: {
        showSubjectMenu() {
            this.isSubjectMenuShown = true;
        },
        showOrHideNestedElements() {
            this.$store.commit('SHOW_OR_HIDE_NESTED_TASKS_BASE', arguments);
        },
    },
}
</script>

<style scoped>

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

.tasks-info-container {
    width: 96%;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 3px;
    height: fit-content;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #333;
}

.choose-buttons-container {
    margin-top: 10px;
    align-items: center;
    flex-direction: row;
    font-weight: bold !important;
}

.choose-buttons-container > button {
    border: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: bold;
    margin: 0px;
    padding-left: 0px;
    padding-right: 0px;
    color: #898887;
    cursor: pointer;
}

.choose-buttons-container > span {
    color: black;
}

.choose-buttons-container > button:hover {
    color: #ff8d00;
}

.tasks-tree-container {
    margin-top: 10px;
}

.courses-container > div {
    margin-top: 5px;
    margin-bottom: 5px;
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

.works-list {
    display: flex;
    flex-direction: column;
}

.fit-content {
    width: fit-content;
}

.works-list > a {
    text-decoration: none;
    color:#898887;
}

.href-to-test {
    color: #898887;
    text-decoration: none;
}

.href-to-test:hover {
    color:#ff8d00;
    cursor: pointer;
}

.element {
    width: fit-content;
    cursor: pointer;
}

@media (max-width: 850px) {
    .courses-container {
        width: 600px;
    }
}

@media (max-width: 650px) {
    .courses-container {
        width: 100%;
    }

}

</style>
