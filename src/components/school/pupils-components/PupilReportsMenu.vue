<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" @click="preventBubling">
                    <h1><span>Работы ученика - {{$store.state.pupilsModule.choosedPupilLogin}}</span></h1>
                    <div class="reports-container">
                        <div
                            v-for="(teacher, teacherId) in $store.state.pupilsModule.reportsArray"
                            :key="teacherId"
                        >
                            <div @click="showOrHideNestedElements(teacherId)">
                                <span v-if="!teacher.isOpened" class="bold-span">+</span>
                                <span v-if="teacher.isOpened" class="bold-span">-</span>
                                <span class="bold-span">{{teacher.name}}</span>
                            </div>
                            <transition name="slide-fade">
                                <div v-if="teacher.isOpened" class="one-nested">
                                    <table>
                                        <tr
                                            v-for="(work, workId) in teacher.works"
                                            :key="workId"
                                        >
                                            <td>
                                                <div class="work-info-container">
                                                    <span class="bold">{{work.name}}</span>
                                                    <div>
                                                        <span>{{work.type}};</span>
                                                        <span>заданий- {{work.taskCount}};</span>
                                                        <span>время- {{work.time}} мин;</span>
                                                        <span>{{work.subject}};</span>
                                                    </div>
                                                </div>
                                                <div class="work-info-buttons-container">
                                                    <a
                                                        :href="work.urlExport"
                                                        target="_blank"
                                                        title="Экспортировать отчет в MS Excel"
                                                    >
                                                        <img src="../../../assets/excel.png">
                                                    </a>
                                                    <a
                                                        :href="work.urlReport"
                                                        target="_blank"
                                                        title="Просмотреть отчет"
                                                    >
                                                        <img src="../../../assets/teacher-icon.png">
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <button @click="$emit('close')" class="exit-button">Закрыть</button>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    beforeMount() {
        this.$store.dispatch('getPupilReports');
    },
    beforeDestroy() {
        this.$store.commit('CLEAR_TEMP_VARIABLES');
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        showOrHideNestedElements(teacherId) {
            this.$store.commit('SHOW_OR_HIDE_NESTED_ELEMENTS', teacherId);
        },
    }
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
    width: 600px;
    min-height: 150px;
    height: fit-content;
    margin: 0px auto;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Open Sans', sans-serif;
    color: black;
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

.reports-container {
    min-height: 150px;
}

.work-info-container {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    float: left;
    width: 80%;
}

.exit-button {
    padding: 3px 15px;
    border: 0;
    background-color: #898887;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    font-size: 100%;
    margin-top: 15px;
    width: 160px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    font-family: 'Open Sans', sans-serif;
    margin-left: 430px;
    margin-bottom: 20px;
}

.bold {
    font-weight: bold;
    font-size: 17px;
}

.exit-button:hover {
    background-color: #ff8d00;
}

.reports-container {
    height: fit-content;
    width: fit-content;
    min-height: 50px;
}

.reports-container > div {
    margin-left: 15px;
    width: fit-content;
    cursor: pointer;
}

.one-nested {
    margin-left: 15px;
}

table {
    width: 550px;
    border-collapse: collapse;
    color: #333;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 15px;
    color: black;
}

th, td {
    border: 1px solid black;
    padding: 3px 5px;
    height: 45px;
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

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
    }

    .exit-button {
        width: 95%;
        margin: auto;
        margin-bottom: 20px;
        margin-top: 20px;
    }
}

@media (max-width: 650px) {
    table {
        width: 350px;
    }

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

    .work-info-container > div > :last-child {
        display: none;
    }

    .work-info-container > div > :nth-child(3) {
        display: none;
    }
}

@media (max-width: 430px) {
    table {
        width: 300px;
    }
}

@media (max-width: 320px) {
    table {
        width: 240px;
    }
}

</style>