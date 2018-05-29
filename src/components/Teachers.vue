<template>
    <div class="teachers-container">
        <EditTeacherMenu v-if="isEditTeacherMenuShown" @close="isEditTeacherMenuShown = false"/>
        <table class="teachers-info-table">
            <tr class="teachers-info-table-header">
                <td>№</td>
                <td>Учителя</td>
                <td class="settings-edit-cell"></td>
                <td class="settings-remove-cell"></td>
            </tr>
            <tr v-for="(teacher, teacherId) in this.$store.state.teachers" v-bind:key="teacherId">
                <td class="parallel-number-cell">{{teacherId + 1}}</td>
                <td class="teachers-list-cell"><span>{{teacher.name}}</span> (<span v-for="(clas, classId) in teacher.classes" v-bind:key="classId">{{clas.parNumber}}-{{clas.classLetter}};</span>)</td>
                <td class="add-class-button">
                    <button class="settings-edit-button" @click="showEditTeacherMenu(teacherId)">
                        <img class="settings-edit-icon" src="../assets/settings_edit_active.png" alt="Could not load an image">
                    </button>
                </td>
                <td>
                    <button class="settings-remove-button">
                        <img class="settings-remove-icon" src="../assets/settings_remove.png" alt="Could not load an image">
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>


<script>
import EditTeacherMenu from './EditTeacherMenu.vue';

export default {
    components: {
        EditTeacherMenu,
    },
    data() {
        return {
            isEditTeacherMenuShown: false,
        }
    },
    methods: {
        showEditTeacherMenu(teacherId) {
            this.isEditTeacherMenuShown = true;
            this.$store.commit('changeChoosedTeacher', teacherId);
        },
    }
}
</script>

<style scoped>

.teachers-container {
    width: 800px;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 15px;
    height: fit-content;
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
    width: 15px;
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

</style>