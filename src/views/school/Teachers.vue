<template>
    <div class="teachers-container">
        <edit-teacher-menu
            v-if="isEditTeacherMenuShown"
            @close="isEditTeacherMenuShown = false"
        />
        <error-message
            v-if="$store.state.teachersModule.errorMessage"
        />
        <table class="teachers-info-table">
            <tr class="teachers-info-table-header">
                <td>№</td>
                <td>Учителя</td>
                <td class="settings-edit-cell"></td>
                <td class="settings-remove-cell"></td>
            </tr>
            <tr
                v-for="(teacher, teacherId) in $store.state.teachersModule.teachers"
                :key="teacherId"
            >
                <td class="parallel-number-cell">{{teacherId + 1}}</td>
                <td class="teachers-list-cell">
                    <span>{{teacher.firstName}} {{teacher.lastName}}</span>
                    (<span
                        v-for="(classObj, classId) in teacher.classes"
                        :key="classId">{{classObj.parNumber}}-{{classObj.letter}};
                    </span>)
                </td>
                <td class="add-class-button">
                    <button class="settings-edit-button" @click="showEditTeacherMenu(teacherId)">
                        <img
                            title="Редактировать классы учителя"
                            class="settings-edit-icon"
                            src="../../assets/settings_edit_active.png"
                            alt="Could not load an image"
                        >
                    </button>
                </td>
                <td>
                    <button class="settings-remove-button" @click="checkCanTeacherBeRemoved(teacher, teacherId)">
                        <img
                            title="Удалить учителя из школы"
                            class="settings-remove-icon"
                            src="../../assets/settings_remove.png"
                            alt="Could not load an image"
                        >
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>


<script>
import EditTeacherMenu from '../../components/school/teacher-components/EditTeacherMenu.vue';
import ErrorMessage from '../../components/school/errors/ErrorMessage.vue';

export default {
    components: {
        EditTeacherMenu,
        ErrorMessage,
    },
    beforeMount() {
        this.$store.dispatch('getTeachersList');
        this.$store.dispatch('getParallelsList');
    },
    data() {
        return {
            isEditTeacherMenuShown: false,
        }
    },
    methods: {
        showEditTeacherMenu(teacherId) {
            this.isEditTeacherMenuShown = true;
            this.$store.commit('CHANGE_CHOOSED_TEACHER', teacherId);
        },
        checkCanTeacherBeRemoved(teacher ,teacherId) {
            if (this.$store.state.teachersModule.teachers[teacherId].classes.length === 0) {
                this.$store.dispatch('removeTeacher', {teacherId, teacherDataBaseId: teacher.dataBaseId});
            } else {
                this.showErrorMessage('Невозможно удалить учителя, так как к нему привязаны классы');
            }
        },
        showErrorMessage(errorMessage) {
            this.$store.commit('SHOW_OR_HIDE_ERROR_MESSAGE', errorMessage);
        },
    }
};
</script>

<style scoped>

.teachers-container {
    width: 800px;
    margin: auto;
    margin-top: 15px;
    height: fit-content;
    margin-top: 20px;
    margin-bottom: 15px;
}

.teachers-info-table {
    width: 800px;
    height: fit-content;
    border: 1px black solid;
    border-collapse: collapse;
    color: #333;
}

.teachers-info-table-header {
    font-weight: bold;
}

.teachers-info-table-header > :first-child {
    width: 25px;
    text-align: center;
}

.teachers-info-table > tr {
    margin: 0;
    padding: 0;
    height: 10px;
}

.teachers-info-table > tr > td {
    padding: 3px 5px;
    word-break: break-all;
}

th, td {
    border: 1px solid black;
}

.parallel-number-cell {
    text-align: center;
}

.teachers-list-cell > span {
    margin: 0px;
    margin-left: 5px;
}

.settings-edit-cell {
    width: 20px;
    padding: 0;
}

.settings-edit-button {
    cursor: pointer;
    background: none;
    border: 0;
}

.settings-remove-cell {
    width: 15px;
}

.settings-edit-icon {
    width: 15px;
    height: 15px;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
}

.settings-edit-icon:hover {
    -webkit-filter: none;
    filter: none;
}

.settings-remove-button {
    cursor: pointer;
    background: none;
    border: 0;
}

.settings-remove-icon {
    width: 15px;
    height: 15px;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
}

.settings-remove-icon:hover {
    -webkit-filter: none;
    filter: none;
}

.choosed-letter {
    background-color: #ff8d00;
}

.parallel-number-cell {
    width: 15px;
}

@media (max-width: 850px) {
    .teachers-container {
        width: 632px;
        margin-bottom: 0;
    }

    .teachers-info-table {
        width: 602px;
        margin: 0;
    }
}

@media (max-width: 650px) {
    .teachers-container {
        width: 100%;
        margin-bottom: 0;
    }

    .teachers-info-table {
        width: 100%;
        margin: 0;
    }
}

</style>