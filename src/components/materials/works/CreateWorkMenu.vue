<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1><span>Создание проверочной работы</span></h1>
                    <div class="work-info-container">
                        <div class="navigation-buttons-container">
                            <button @click="showDescription()" :class="[isDescriptionShown ? 'light-choosed-button' : '']">Описание</button>
                            <button @click="showTasks()" :class="[areTasksShown ? 'light-choosed-button' : '']">Задания</button>
                        </div>
                        <description
                            v-if="isDescriptionShown"
                        />
                        <tasks
                            v-if="areTasksShown"
                        />
                    </div>
                    <div class="buttons-container">
                        <button @click="addWork()">Сохранить</button>
                        <button @click="closeMenu()">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
import Description from './create-work/Description';
import Tasks from './create-work/Tasks';

export default {
    components: {
        Description,
        Tasks,
    },
    beforeMount() {
        this.$store.commit('CREATE_DEFAULT_WORK', {
            firstName: this.$store.state.appModule.firstUserName,
            secondName: this.$store.state.appModule.secondUserName,
        });
        this.$store.commit('LIGHT_CHOOSED_TASKS');
    },
    beforeDestroy() {
        this.$store.commit('CLEAR_TASK_CREATION_TEMP_VARIABLES');
    },
    data() {
        return {
            isDescriptionShown: true,
            areTasksShown: false,
        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        showDescription() {
            this.isDescriptionShown = true;
            this.areTasksShown = false;
        },
        showTasks() {
            this.isDescriptionShown = false;
            this.areTasksShown = true;
        },
        addWork() {
            this.$store.dispatch('createWork')
                .then(() => {
                    this.$emit('close');
                });
        },
        closeMenu() {
            this.$store.commit('CLEAR_TASK_CREATION_TEMP_VARIABLES');
            this.$emit('close');
        }
    },
}
</script>

<style scoped>

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(187, 187, 187, 0.5);
    display: table;
    transition: opacity .0s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    display: flex;
    flex-direction: column;
    width: 830px;
    min-height: 450px;
    height: fit-content;
    margin: 0px auto;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Open Sans', sans-serif;
}

.buttons-container {
    margin-top: 30px;
    margin-bottom: 15px;
    width: 350px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-left: 55%;
}

.buttons-container > button {
    padding: 3px 15px;
    border: 0;
    background-color: #898887;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    font-size: 100%;
    margin-top: 0px;
    width: 160px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    font-family: 'Open Sans', sans-serif;
}

.buttons-container > button:hover {
    background-color: #ff8d00;
}

.modal-container > h1 {
    padding: 10px 30px 10px 10px;
    text-align: left;
    background-color: #ff8d00;
    color: White;
    margin-top: 0px;
    font-size: 16px;
    font-weight: 400;
}

.modal-body {
    margin: 20px 0;
}

.modal-container > h1 {
    padding: 10px 30px 10px 10px;
    text-align: left;
    background-color: #ff8d00;
    color: White;
    margin-top: 0px;
    font-size: 16px;
    font-weight: 400;
}

.navigation-buttons-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 30px;
    justify-content: space-around;
}

.navigation-buttons-container > button {
    padding: 3px 15px;
    border: 0;
    background-color: #898887;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    font-size: 100%;
    margin-top: 0px;
    width: 49.5%;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    font-family: 'Open Sans', sans-serif;
}

.navigation-buttons-container > button:hover {
    background-color: #ff8d00;
}

.work-info-container {
    width: 97%;
    margin: auto;
    margin-top: 5px;
}

.light-choosed-button {
    background-color: #ff8d00 !important;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
        min-height: 150px;
    }

    .buttons-container {
        width: 100%;
        margin-left: 0px;
        display: flex;
        height: 70px;
        flex-direction: column;
    }

    .buttons-container > button {
        width: 90%;
    }
}

@media (max-width: 650px) {
    .modal-container {
        max-width: 402px;
        width: 90%;
    }

    .modal-container > h1 {
        width: 100%;
        height: 40px;
        padding: 0;
        display: flex;
        align-items: center;
    }

    .modal-container > h1 > span {
        margin-left: 10px;
    }
}

@media (max-width: 400px) {
    .modal-container {
        width: 300px;
    }
}

</style>