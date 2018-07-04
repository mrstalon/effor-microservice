<template>
    <div class="classes-container">
        <button class="add-parallel-button" @click="showAddParallelMenu">Добавить параллель</button>
        <add-parallel-menu
            v-if="isAddParallelMenuShown"
            @close="isAddParallelMenuShown = false"
        />
        <edit-parallel-menu
            v-if="isEditParallelMenuShown"
            @close="isEditParallelMenuShown = false"
            :parallelNumber="choosedParallelNumber"
            :parallelId="choosedParallelId"
        />
        <table class="classes-info-table">
            <tr class="classes-info-table-header">
                <td>Параллель</td>
                <td>Буквы класса</td>
                <td class="add-class-button"></td>
            </tr>
            <tr
                v-for="(parallel, parallelId) in $store.state.classesModule.parallels"
                :key="parallelId"
            >
                <td class="parallel-number-cell">{{parallel.number}}</td>
                <td class="classes-list-cell">
                    <span
                        v-for="(clas, classId) in parallel.classes"
                        :key="classId"
                    >
                        {{clas.letter}}
                    </span>
                </td>
                <td class="add-class-button">
                    <button
                        class="settings-edit-button"
                        @click="showEditParallelMenu(parallel.number, parallelId)"
                    >
                        <img
                            title="Редактировать буквы классов"
                            class="settings-edit-icon"
                            src="../../assets/settings_edit_active.png"
                            alt="Could not load an image"
                        >
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>


<script>
import AddParallelMenu from '../../components/school/classes-components/AddParallelMenu.vue';
import EditParallelMenu from '../../components/school/classes-components/EditParallelMenu.vue';

export default {
    components: {
        AddParallelMenu,
        EditParallelMenu,
    },
    beforeMount() {
        this.$store.dispatch('getParallelsList');
        this.$store.commit('INITIALIZE_CREATED_PARALLELS_NUMBERS');
    },
    data() {
        return {
            isAddParallelMenuShown: false,
            isEditParallelMenuShown: false,
            choosedParallelNumber: '',
            choosedParallelId: '',
        }
    },
    methods: {
        showAddParallelMenu() {
            this.isAddParallelMenuShown = true;
        },
        showEditParallelMenu(parallelNumber, parallelId) {
            this.isEditParallelMenuShown = true;
            this.choosedParallelNumber = parallelNumber;
            this.choosedParallelId = parallelId;
        },
    }
}
</script>

<style scoped>

.add-parallel-button {
    background: none;
    border: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #898887;
    cursor: pointer;
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
}

.add-parallel-button:hover {
    color: #ff8d00;
}

.classes-container {
    width: 800px;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 3px;
    height: fit-content;
}

.classes-info-table {
    width: 800px;
    height: fit-content;
    border: 1px black solid;
    border-collapse: collapse;
    color: #333;
}

.classes-info-table-header {
    font-weight: bold;
}

.classes-info-table-header > :first-child {
    width: 90px;
}

.classes-info-table > tr {
    margin: 0;
    padding: 0;
    height: 10px;
}

.classes-info-table > tr > td {
    padding: 3px 5px;
    word-break: break-all;
}

th, td {
    border: 1px solid black;
}

.parallel-number-cell {
    width: 80px;
    text-align: center;
}

.classes-list-cell > span {
    margin: 0px;
    margin-left: 5px;
}

.add-class-button {
    width: 20px;
    padding: 0;
}

.settings-edit-button {
    cursor: pointer;
    background: none;
    border: 0;
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

.choosed-letter {
    background-color: #ff8d00;
}

@media (max-width: 850px) {
    .classes-container {
        width: 600px;
    }

    .classes-info-table {
        width: 600px;
    }
}

@media (max-width: 650px) {
    .classes-container {
        width: 100%;
    }

    .classes-info-table {
        width: 100%;
    }
}

</style>