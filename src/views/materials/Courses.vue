<template>
    <div class="courses-container" v-if="isLoaded">
        <subject-menu
            v-if="isSubjectMenuShown"
            @close="isSubjectMenuShown = false"
        />
        <choose-courses-type-menu
            v-if="isCoursesTypeMenuShown"
            @close="isCoursesTypeMenuShown = false"
        />
        <div class="choose-buttons-container">
            <button  @click="showCoursesTypeMenu()">{{$store.state.coursesModule.choosedCourseType.title}}</button>
            <span>по предмету</span>
            <button @click="showSubjectMenu()">{{$store.state.coursesModule.choosedSubject.title}}</button>
        </div>
        <div class="tasks-tree-container">
            <div
                v-for="(task, taskId) in $store.state.coursesModule.coursesArray"
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
                            v-if="task.courseList.length !== 0"
                            v-for="(subTask, subTaskId) in task.courseList"
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
                                                    class="task"
                                                    v-if="nestedSubTask.childrenList.length !== 0"
                                                    v-for="(serieObj, serieObjId) in nestedSubTask.childrenList"
                                                    :key="serieObjId"
                                                >
                                                    <a
                                                        title="Перейти к работе"
                                                        :href="serieObj.startCourseUrl"
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
    </div>
</template>

<script>
import SubjectMenu from '../../components/materials/courses/SubjectsMenu';
import ChooseCoursesTypeMenu from '../../components/materials/courses/ChooseCoursesTypeMenu';

export default {
    beforeMount() {
        if (this.$store.state.coursesModule.choosedSubject === null) {
            this.$store.dispatch('getSubjectsArray')
                .then(() => {
                    this.$store.commit('INITIALIZE_CHOOSED_SUBJECT');
                    this.$store.dispatch('getCoursesTypes')
                        .then(() => {
                            this.$store.dispatch('getCoursesArray')
                            .then(() => {
                                this.isLoaded = true;
                            });
                        });
                });
        } else {
            this.$store.dispatch('getCoursesTypes')
                .then(() => {
                    this.$store.dispatch('getCoursesArray')
                    .then(() => {
                        this.isLoaded = true;
                    });
            });
        }
    },
    beforeDestroy() {
        this.$store.commit('CLEAR_COURSES_STATE_MODULE');
    },
    components: {
        SubjectMenu,
        ChooseCoursesTypeMenu,
    },
    data() {
        return {
            isSubjectMenuShown: false,
            isLoaded: false,
            isCoursesTypeMenuShown: false,
        }
    },
    methods: {
        showSubjectMenu() {
            this.isSubjectMenuShown = true;
        },
        showCoursesTypeMenu() {
            this.isCoursesTypeMenuShown = true;
        },
        showOrHideNestedElements() {
            this.$store.commit('SHOW_OR_HIDE_NESTED_COURSES', arguments);
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

.courses-container {
    width: 800px;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 3px;
    height: fit-content;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #898887;
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

.courses-container {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    color: black;
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
    margin-top: 5px;
}

.works-list > a {
    text-decoration: none;
    color:#898887;
}

.works-list > a:hover {
    color:#ff8d00;
}

.href-to-test {
    color: #898887;
    text-decoration: none;
}

.href-to-test:hover {
    color:#ff8d00;
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

