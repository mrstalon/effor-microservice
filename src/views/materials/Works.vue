<template>
    <div class="works-container" v-if="$store.state.worksModule.isDataLoaded">
        <subjects-menu
            v-if="isSubjectsMenuShown"
            @close="isSubjectsMenuShown = false"
        />
        <choose-parallel-menu
            v-if="isChooseParallelMenuShown"
            @close="isChooseParallelMenuShown = false"
        />
        <choose-date-menu
            v-if="isChooseDateMenuShown"
            @close="isChooseDateMenuShown = false"
        />
        <work-reports-menu
            v-if="isWorkReportsMenuShown"
            @close="isWorkReportsMenuShown = false"
        />
        <create-work-menu
            v-if="isCreateWorkMenuShown"
            @close="isCreateWorkMenuShown = false"
        />
        <edit-work-menu
            v-if="isEditWorkMenuShown"
            @close="isEditWorkMenuShown = false"
        />
        <add-districts-menu
            v-if="isAddDistrictsShown"
            @close="isAddDistrictsShown = false"
        />
        <div class="choosing-buttons-container-horisontal">
            <button @click="showSubjectsMenu()">{{$store.state.worksModule.choosedSubject.title}},</button>
            <button @click="showChooseParallelMenu()" >{{$store.state.worksModule.choosedParallelNumber}} классы</button>
        </div>
        <div
            class="choosing-buttons-container-vertical"
            v-if="!$store.state.worksModule.isWorksCatalogMenuShown"
        >
            <button @click="showWorksCatalogMenu()" >Выбрать из каталога</button>
            <button @click="showCreateWorkMenu()">Создать новую</button>
        </div>
        <table
            class="works-info-table"
            v-if="!$store.state.worksModule.isWorksCatalogMenuShown"
        >
            <tr class="main-table-row">
                <th>Название</th>
                <th>Доступ</th>
            </tr>
            <tr
                v-for="(work, workId) in $store.state.worksModule.worksArray"
                :key="workId"
            >
                <td class="work-info-td">
                    <div class="work-info-container">
                        <span @click="showEditWorkMenu(work)">{{work.title}}</span>
                        <div>
                            <span>{{work.controlTestType}};</span>
                            <span>заданий: {{work.taskCount}};</span>
                            <span>время: {{work.workTime}} мин.</span>
                        </div>
                    </div>
                    <div class="work-info-buttons-container">
                        <a
                            title="Просмотреть отчет"
                            @click="showWorkReportsMenu(work)"
                        >
                            <img src="../../assets/teacher-icon.png">
                        </a>
                        <a
                            :href="work.startTestUrl"
                            title="Просмотреть проверочную работу"
                            target="_blank"
                        >
                            <img src="../../assets/start-test.png">
                        </a>
                        <button
                            v-if="$store.state.appModule.isMonitoring"
                            class="add-districts-button"
                            @click="showAddDistrictsMenu()"
                        >
                            <img src="../../assets/monitoring-active.png">
                        </button>
                    </div>
                </td>
                <td class="conducted-info-td">
                    <div v-if="work.dateStart">
                        <button @click="showChooseDateMenu(work)" >{{work.dateStart}}</button>
                    </div>
                    <div v-else>
                        <button @click="showChooseDateMenu(work)" >назначить</button>
                    </div>
                </td>
            </tr>
        </table>
        <div v-if="$store.state.worksModule.isWorksCatalogMenuShown" >
            <table class="works-catalog-info-table" >
                <tr class="main-table-row">
                    <th>Название</th>
                    <th>Автор</th>
                </tr>
                <tr
                    v-for="(work, workId) in $store.state.worksModule.worksArray[$store.state.worksModule.choosedParallelId].works[$store.state.worksModule.choosedSubject]"
                    :key="workId"
                >
                    <td class="work-info-td">
                        <img
                            class="checkbox-img"
                            src="../../assets/checkbox-icon-active.png"
                            v-if="work.isChoosed && !work.isAdded"
                            @click="chooseCheckbox(workId)"
                        >
                        <img
                            class="checkbox-img"
                            src="../../assets/checkbox-icon.png"
                            v-if="!work.isChoosed && !work.isAdded"
                            @click="chooseCheckbox(workId)"
                        >
                        <div
                            class="work-info-container"
                            :class="[work.isAdded ? 'work-is-added' : '']"
                        >
                            <span>{{work.name}}</span>
                            <div>
                                <span>заданий: {{work.taskCount}};</span>
                                <span>время: {{work.time}} мин.</span>
                            </div>
                        </div>
                        <div class="work-catalog-info-button-container">
                            <a href="" title="Просмотреть проверочную работу">
                                <img src="../../assets/start-test.png">
                            </a>
                        </div>
                    </td>
                    <td class="author-info-td">
                        <div>
                            {{work.author}}
                        </div>
                    </td>
                </tr>
            </table>
            <div class="works-catalog-buttons-container">
                <button @click="hideWorksCatalogMenu()" >Назад</button>
                <button @click="addChoosedWorks()" >Добавить</button>
            </div>
        </div>
    </div>
</template>

<script>
import SubjectsMenu from '../../components/materials/works/SubjectsMenu';
import ChooseParallelMenu from '../../components/materials/works/ChooseParallelMenu';
import ChooseDateMenu from '../../components/materials/works/ChooseDateMenu';
import WorkReportsMenu from '../../components/materials/works/WorkReportsMenu';
import CreateWorkMenu from '../../components/materials/works/CreateWorkMenu';
import EditWorkMenu from '../../components/materials/works/EditWorkMenu';
import AddDistrictsMenu from '../../components/materials/works/AddDisctrictsMenu';


export default {
    components: {
        SubjectsMenu,
        ChooseParallelMenu,
        ChooseDateMenu,
        WorkReportsMenu,
        CreateWorkMenu,
        EditWorkMenu,
        AddDistrictsMenu,
    },
    beforeMount() {
        this.$store.dispatch('getSubjectsArray')
            .then(() => {
                this.$store.dispatch('getParallelNumbers')
                    .then(() => {
                        this.$store.commit('INITIALIZE_NEEDED_DATA');
                        this.$store.dispatch('getWorksArray')
                        .then(() => {
                                this.$store.commit('CHANGE_IS_DATA_LOADED', true);
                                this.$store.dispatch('getWorkTypes');
                                this.$store.dispatch('getTasksTree');
                        });
                    });
            });
    },
    beforeDestroy() {
        this.$store.commit('CLEAR_WORK_STATE_MODULE');
    },
    data() {
        return {
            isSubjectsMenuShown: false,
            isChooseParallelMenuShown: false,
            isChooseDateMenuShown: false,
            isWorkReportsMenuShown: false,
            isCreateWorkMenuShown: false,
            isEditWorkMenuShown: false,
            isAddDistrictsShown: false,
        };
    },
    methods: {
        showSubjectsMenu() {
            this.isSubjectsMenuShown = true;
        },
        showChooseParallelMenu() {
            this.isChooseParallelMenuShown = true;
        },
        showAddDistrictsMenu() {
            this.isAddDistrictsShown = true;
        },
        showWorksCatalogMenu() {
            this.$store.commit('SHOW_OR_HIDE_CATALOG_MENU');
        },
        chooseCheckbox(choosedWorkId) {
            this.$store.commit('CHOOSE_OR_UNCHOOSE_WORK_TO_ADD', choosedWorkId);
        },
        addChoosedWorks() {
            this.$store.commit('ADD_CHOOSED_WORKS');
        },
        hideWorksCatalogMenu() {
            this.$store.commit('CLEAR_TEMP_VARIABLES');
            this.$store.commit('SHOW_OR_HIDE_CATALOG_MENU');
        },
        showChooseDateMenu(newWork) {
            this.changeChoosedWork(newWork);
            this.isChooseDateMenuShown = true;
        },
        showWorkReportsMenu(newWork) {
            this.changeChoosedWork(newWork);
            this.isWorkReportsMenuShown = true;
        },
        showCreateWorkMenu() {
            this.isCreateWorkMenuShown = true;
        },
        showEditWorkMenu(workToShow) {
            this.$store.dispatch('getEditingWork', workToShow.id)
                .then(() => {
                    this.isEditWorkMenuShown = true;
                });
        },
        changeChoosedWork(work) {
            this.$store.commit('CHANGE_CHOOSED_WORK', work);
        }
    },
}
</script>

<style scoped>

.works-container {
    width: 800px;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 3px;
    height: fit-content;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #898887;
}

.choosing-buttons-container-horisontal {
    margin-top: 10px;
}

.choosing-buttons-container-horisontal > button{
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

.choosing-buttons-container-vertical > button:hover {
    color: #ff8d00;
}

.choosing-buttons-container-horisontal > button:hover {
    color: #ff8d00;
}

.choosing-buttons-container-vertical {
    margin-top: 15px;
}

.choosing-buttons-container-vertical > button{
    border: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: bold;
    margin: 0px;
    padding-left: 0px;
    padding-right: 0px;
    color: #898887;
    cursor: pointer;
    display: flex;
    flex-direction: column;
}

.works-info-table {
    margin-top: 10px;
    width: 800px;
    height: fit-content;
    border: 1px black solid;
    border-collapse: collapse;
    color: #333;
}

.main-table-row {
    font-size: 17px;
    height: 30px;
    color: #333;
    font-family: 'Open Sans', sans-serif;
}

.main-table-row > :first-child{
    width: 85%;
    text-align: left;
}

.main-table-row > :last-child {
    width: 15%;
    text-align: center;
}

th, td {
    border: 1px solid black;
    padding: 3px 5px;
}

tr {
    height: 40px;
}

.conducted-info-td > div > button {
    border: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    margin: 0px;
    padding-left: 14%;
    color: #898887;
    cursor: pointer;
    display: flex;
    flex-direction: column;
}

.conducted-info-td > div {
    text-align: center;
}

.conducted-info-td > div > button:hover {
    color: #ff8d00;
}

.work-info-container {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    float: left;
    width: 80%;
}

.work-info-container > span {
    width: fit-content;
}

.work-info-container > span:hover {
    cursor: pointer;
    color: #ff8d00;
}

.work-info-container > :first-child {
    color: #898887;
    font-size: 16px;
}

.work-info-buttons-container {
    vertical-align: middle;
    margin-top: 7px;
    float: right;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 11%;
}

.work-info-buttons-container > button {
    border: 0;
}

.work-info-buttons-container > :nth-child(2) > img {
    width: 12px;
    height: 21px;
    margin-left: 5px;
}

.work-info-buttons-container > a {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    cursor: pointer;
}

.work-info-buttons-container > a:hover {
    -webkit-filter: none;
    filter: none;
}

.works-catalog-info-table {
    margin-top: 10px;
    width: 800px;
    height: fit-content;
    border: 1px black solid;
    border-collapse: collapse;
    color: #333;
}

.works-catalog-info-table > :first-child > :first-child{
    text-align: center;
}

.author-info-td {
    width: fit-content;
}

.work-catalog-info-button-container {
    float: right;
    margin-right: 5px;
    margin-top: 7px;
}

.work-catalog-info-button-container > a {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    cursor: pointer;
}

.work-catalog-info-button-container > a:hover {
    -webkit-filter: none;
    filter: none;
}

.work-catalog-info-button-container > a > img {
    width: 13px;
    height: 23px;
}

.works-catalog-buttons-container {
    width: 60%;
    margin-top: 15px;
    margin-left: 40%;
}

.works-catalog-buttons-container > button {
    padding: 3px 15px;
    border: 0;
    background-color: #898887;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    font-size: 100%;
    margin-top: 0px;
    width: 45%;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    font-family: 'Open Sans', sans-serif;
}

.works-catalog-buttons-container > :last-child {
    margin-left: 10px;
}

.works-catalog-buttons-container > button:hover {
    background-color: #ff8d00;
}

.checkbox-img {
    float: left;
    margin-right: 5px;
    margin-left: 3px;
    margin-top: 1.5%;
}

.work-is-added {
    margin-left: 30px;
}

.add-districts-button > img {
    width: 20px;
    height: 25px;
}

.work-info-buttons-container > button {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    cursor: pointer;
}

.work-info-buttons-container > button:hover {
    -webkit-filter: none;
    filter: none;
}

.work-info-buttons-container > * {
    margin-right: 5px;
}

@media (max-width: 850px) {
    .works-container {
        width: 600px;
    }

    .works-info-table {
        width: 600px;
    }

    .works-catalog-info-table {
        width: 600px;
    }

    .conducted-info-td > div > button {
        padding-left: 5%;
    }

    .work-info-buttons-container {
        width: 15%;
    }

    .works-catalog-buttons-container {
        width: 80%;
        margin-left: 13%;
    }
}

@media (max-width: 650px) {
    .works-container {
        width: 100%;
    }

    .works-info-table {
        width: 100%;
    }

    .work-info-container > :last-child {
        display: none;
    }

    .work-info-container {
        width: 70%;
    }

    .work-info-buttons-container {
        width: 27%;
    }

    .works-catalog-info-table {
        width: 100%;
    }

    .works-catalog-buttons-container {
        margin-left: 5%;
        width: 100%;
    }
}

</style>
