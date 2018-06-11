<template>
    <div class="pupils-container">
        <register-and-add-pupils
            v-if="isRegisterAndAddStudentShown"
            @close="isRegisterAndAddStudentShown = false"
        />
        <choose-parallel
            v-if="isChooseParallelShown"
            @close="isChooseParallelShown = false"
            v-bind:choosedParallelId="$store.state.pupilsModule.choosedParallelId"
        />
        <class-reports-menu
            v-if="isReportsMenuShown"
            @close="isReportsMenuShown = false"
        />
        <add-pupil-menu
            v-if="isAddPupilShown"
            @close="isAddPupilShown = false"
        />
        <delete-pupils-menu
            v-if="isDeletePupilsMenu"
            @close="isDeletePupilsMenu = false"
        />
        <div class="buttons-container">
            <button @click="showChooseParallelWindow">{{$store.state.pupilsModule.choosedParallelNumber}} классы</button>
            <button @click="showRegisterAndAddPupilsWindow">Новые ученики</button>
        </div>
        <div class="class-list-container">
            <div
                v-for="(classObj, classId) in $store.state.pupilsModule.parallels[$store.state.pupilsModule.choosedParallelId].classes"
                v-bind:key="classId"
            >
                <div class="class-header">
                    <h1>{{$store.state.pupilsModule.choosedParallelNumber}}-{{classObj.letter}}</h1>
                    <div class="edit-buttons-container" v-if="!isStudentListEmpty(classObj.letter)">
                        <button class="add-pupils-alone-button" @click="showAddPupilMenu()">
                            <img src="../assets/add-pupils-icon.png">
                            <span>Добавить</span>
                        </button>
                    </div>
                    <div class="edit-buttons-container" v-if="isStudentListEmpty(classObj.letter)">
                        <button class="about-pupils-button" @click="showClassReportsMenu(classObj.letter)">
                            <img src="../assets/pupils-info-icon.png" class="pupils-info-img">
                            <span>Отчёты</span>
                        </button>

                        <button class="add-pupils-button" @click="showAddPupilMenu()">
                            <img src="../assets/add-pupils-icon.png">
                            <span>Добавить</span>
                        </button>

                        <button class="print-pupils-button">
                            <img src="../assets/print-pupils-icon.png">
                            <span>Печать</span>
                        </button>

                        <button class="remove-pupils-button" @click="showDeletePupilsMenu(classObj.letter)">
                            <img src="../assets/remove-pupils-icon.png">
                            <span>Удалить</span>
                        </button>
                    </div>
                </div>
                <div class="pupils-list-container">
                    <div
                        v-for="(pupil, pupilId) in classObj.pupils"
                        v-bind:key="pupilId"
                    >
                        <span>
                            {{pupil.login}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ChooseParallel from '../components/pupils-components/ChooseParallel.vue';
import RegisterAndAddPupils from '../components/pupils-components/RegisterAndAddPupils.vue';
import ClassReportsMenu from '../components/pupils-components/ClassReportsMenu.vue';
import AddPupilMenu from '../components/pupils-components/AddPupilMenu.vue';
import DeletePupilsMenu from '../components/pupils-components/DeletePupilsMenu.vue';

export default {
    components: {
        ChooseParallel,
        RegisterAndAddPupils,
        ClassReportsMenu,
        AddPupilMenu,
        DeletePupilsMenu,
    },
    data() {
        return {
            isChooseParallelShown: false,
            isRegisterAndAddStudentShown: false,
            isReportsMenuShown: false,
            isAddPupilShown: false,
            isDeletePupilsMenu: false,
        }
    },
    methods: {
        showChooseParallelWindow() {
            this.isChooseParallelShown = true;
        },
        showRegisterAndAddPupilsWindow() {
            this.isRegisterAndAddStudentShown = true;
        },
        isStudentListEmpty(classLetter) {
            const classId = this.$store.state.pupilsModule.parallels[this.$store.state.pupilsModule.choosedParallelId].classes.findIndex((classObj) => {
                return classLetter === classObj.letter;
            });
            if (this.$store.state.pupilsModule.parallels[this.$store.state.pupilsModule.choosedParallelId].classes[classId].pupils.length === 0) {
                return false;
            }
            return true;
        },
        showClassReportsMenu(newClassLetter) {
            console.log('clickclack');
            this.$store.commit('CHANGE_CHOOSED_CLASS', newClassLetter);
            this.isReportsMenuShown = true;
        },
        showAddPupilMenu() {
            this.isAddPupilShown = true;
        },
        showDeletePupilsMenu(newClassLetter) {
            this.$store.commit('CHANGE_CHOOSED_CLASS', newClassLetter);
            this.isDeletePupilsMenu = true;
        },
    },
}
</script>

<style scoped>

.pupils-container {
    width: 800px;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 5px;
    min-height: 100px;
    height: fit-content;
}

.buttons-container {
    margin-top: 15px;
    height: fit-content;
    width: 100%;
    height: 25px;
}

.buttons-container > button:hover {
    color: #ff8d00;
}

.buttons-container > button {
    font-family: 'Open Sans', sans-serif;
}

.buttons-container > :first-child {
    float: left;
    color: #898887;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 16px;
    background-color: white;
}

.buttons-container > :last-child {
    float: right;
    color: #898887;
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 16px;
    background-color: white;
}

.class-header {
    background-color: #ff8d00;
    color: white;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.class-header > h1 {
    font-size: 16px;
    margin-left: 10px;
    height: fit-content;
}

.class-list-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

.class-list-container > div {
    margin-top: 10px;
}

.edit-buttons-container {
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    width: 380px;
    justify-content: space-around;
    align-items: center;
    height: 100%;
}

.edit-buttons-container > button {
    background: 0;
    border: 0;
    width: 100px;
    height: 15px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'Open Sans', sans-serif;
    color: white;
    height: 100%;
    transition: all 300ms;
}

.edit-buttons-container > button:hover {
    background-color: #e98000;
}

.edit-buttons-container > button > span {
    text-align: center;
    margin-left: 5px;
    font-size: 16px;
}

.pupils-list-container {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 100%;
    margin-top: 5px;
}

.pupils-list-container > div {
    width: 33.33%;
    height: 50px;
    padding-right: 10px;
    margin: 0;
    float: left;
    box-sizing: border-box;
    margin-top: 10px;
}

.pupils-list-container > div > span:hover {
    color: #ff8d00;
    cursor: pointer;
}

.pupils-info-img {
    width: 12px;
}

.add-pupils-alone-button {
    margin-left: 290px;
}

.add-pupils-alone-button > img {
    width: 18px;
}

.about-pupils-button > img{
    width: 16px;
    height: 22px;
}

.print-pupils-button > img{
    width: 16px;
    height: 16px;
}

.remove-pupils-button > img {
    width: 16px;
    height: 16px;
}

@media (max-width: 850px) {
    .pupils-container {
        width: 632px;
    }

    .buttons-container {
        width: 602px;
        margin: 0;
        margin-top: 10px;
    }

    .class-header {
        width: 602px;
        margin: 0;
    }

    .class-list-container > div {
        width: 602px;
        margin: 0;
    }
}

@media (max-width: 650px) {
    .pupils-container {
        width: 100%;
    }

    .buttons-container {
        width: 100%;
        margin: 0;
        margin-top: 10px;
    }

    .class-header {
        width: 100%;
        margin: 0;
    }

    .class-list-container > div {
        width: 100%;
        margin: 0;
    }

    .add-pupils-alone-button > span {
        display: none;
    }

    .about-pupils-button > span {
        display: none;
    }

    .add-pupils-button > span {
        display: none;
    }

    .print-pupils-button > span {
        display: none;
    }

    .remove-pupils-button > span {
        display: none;
    }

    .edit-buttons-container {
        width: 100px;
    }

    .class-header > h1 {
        width: 30px;
    }

    .pupils-list-container > div {
        width: 50%;
    }

    .add-pupils-alone-button {
        margin-left: 100px;
    }
}

</style>