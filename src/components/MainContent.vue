<template>
    <div class="main-content-container">
        <div class="content-nav-container">
            <button v-on:click="showClasses" v-bind:class="[showClassesInfo ? 'buttonActive' : 'buttonIsNotActive']">Классы</button>
            <button v-on:click="showTeachers" v-bind:class="[showTeachersInfo ? 'buttonActive' : 'buttonIsNotActive']">Учителя</button>
            <button v-on:click="showStudents" v-bind:class="[showStudentsInfo ? 'buttonActive' : 'buttonIsNotActive']">Ученики</button>
        </div>
        <Classes v-if="showClassesInfo"/>
        <Teachers v-if="showTeachersInfo" />
        <Students v-if="showStudentsInfo" />
    </div>
</template>


<script>
import Classes from './Classes.vue';
import Teachers from './Teachers.vue';
import Students from './Students.vue';

export default {
    components: {
        Classes,
        Teachers,
        Students,
    },
    data() {
        return {
            showClassesInfo: true,
            showTeachersInfo: false,
            showStudentsInfo: false,
        }
    },
    methods: {
        showClasses() {
            this.showClassesInfo = true;
            this.showTeachersInfo = false;
            this.showStudentsInfo = false;
        },
        showTeachers() {
            this.showClassesInfo = false;
            this.showTeachersInfo = true;
            this.showStudentsInfo = false;
        },
        showStudents() {
            this.showClassesInfo = false;
            this.showTeachersInfo = false;
            this.showStudentsInfo = true;
        }
    }
}
</script>

<style scoped>

.main-content-container {
    width: 830px;
    height: fit-content;
    border: 1px black solid;
    border-radius: 4px;
    background-color: white;
    margin: 0px auto;
    margin-top: 27px;
}

.content-nav-container {
    display: flex;
    flex-direction: row;
    width: 800px;
    margin: 0px auto;
    margin-top: 15px;
}

.content-nav-container > button {
    text-align: center;
    font-family: Philosopher, sans-serif;
    font-size: 16px;
    cursor: pointer;
    color: white;
    display: block;
    background-color: #898887;
    width: 33.33%;
    height: 30px;
    border: 1px solid white;
}

.buttonActive {
    background-color:#ff8d00 !important;
}

</style>