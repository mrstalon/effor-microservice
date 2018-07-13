<template>
    <div class="courses-container">
        <subject-menu
            v-if="isSubjectMenuShown"
            @close="isSubjectMenuShown = false"
        />
        <choose-work-type-menu
            v-if="isWorkTypeMenuShown"
            @close="isWorkTypeMenuShown = false"
        />
        <div class="choose-buttons-container">
            <button  @click="showWorkTypeMenu()">{{$store.state.coursesModule.choosedWorkType}}</button>
            <span>по предмету</span>
            <button @click="showSubjectMenu()">{{$store.state.coursesModule.choosedSubject}}</button>
        </div>
        <div class="courses-container">
            <div
                v-for="(course, courseId) in $store.state.coursesModule.coursesArray[$store.state.coursesModule.choosedSubject][$store.state.coursesModule.choosedWorkType]"
                :key="courseId"
                class="fit-content"
            >
                <div @click="showOrHideNestedElements(courseId)">
                    <span v-if="!course.isOpened" class="bold-span">+</span>
                    <span v-if="course.isOpened" class="bold-span">-</span>
                    <span class="bold-span">Для {{course.parallelNumber}} классов</span>
                </div>
                <transition name="slide-fade">
                    <div v-if="course.isOpened">
                        <div
                            v-for="(subCourse, subCourseId) in course.works"
                            :key="subCourseId"
                            class="one-nested fit-content"
                        >
                            <div @click="showOrHideNestedElements(courseId, subCourseId)">
                                <span v-if="!subCourse.isOpened" class="bold-span">+</span>
                                <span v-if="subCourse.isOpened" class="bold-span">-</span>
                                <span class="bold-span">{{subCourse.name}}</span>
                            </div>
                            <transition name="slide-fade">
                                <div v-if="subCourse.isOpened">
                                    <div
                                        v-for="(nestedSubCourse, nestedSubCourseId) in subCourse.works"
                                        :key="nestedSubCourseId"
                                        class="two-nested fit-content"
                                    >
                                        <div @click="showOrHideNestedElements(courseId, subCourseId, nestedSubCourseId)">
                                            <span v-if="!nestedSubCourse.isOpened" class="bold-span">+</span>
                                            <span v-if="nestedSubCourse.isOpened" class="bold-span">-</span>
                                            <span class="bold-span">{{nestedSubCourse.name}}</span>
                                        </div>
                                        <transition name="slide-fade">
                                            <div v-if="nestedSubCourse.isOpened" class="three-nested works-list">
                                                <a
                                                    :href="work.href"
                                                    v-for="(work, workId) in nestedSubCourse.works"
                                                    :key="workId"
                                                    title="Перейти к работе"
                                                >
                                                    {{work.name}}
                                                </a>
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
import SubjectMenu from '../../components/materials/works/SubjectsMenu';
import ChooseWorkTypeMenu from '../../components/materials/courses/ChooseWorkTypeMenu';

export default {
    components: {
        SubjectMenu,
        ChooseWorkTypeMenu,
    },
    data() {
        return {
            isSubjectMenuShown: false,
            isWorkTypeMenuShown: false,
        }
    },
    methods: {
        showSubjectMenu() {
            this.isSubjectMenuShown = true;
        },
        showWorkTypeMenu() {
            this.isWorkTypeMenuShown = true;
        },
        showOrHideNestedElements() {
            this.$store.commit('SHOW_OR_HIDE_NESTED_ELEMENTS', arguments);
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
}

.works-list > a {
    text-decoration: none;
    color:#898887;
}

.works-list > a:hover {
    color:#ff8d00;
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

