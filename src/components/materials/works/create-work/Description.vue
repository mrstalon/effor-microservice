<template>
    <div class="description-container">
        <span>Класс: {{$store.state.worksModule.choosedParallelNumber}}</span>
        <span>Предмет: {{$store.state.worksModule.choosedSubject.title}}</span>
        <div class="task-count-container">
            <span>Заданий:</span>
            <input v-model="tasksCount" type="number">
        </div>
        <div class="work-name-container">
            <span>Название:</span>
            <input type="text" v-model="workName">
        </div>
        <div class="work-time-container">
            <span>Время(мин):</span>
            <input type="text" v-model="workTime">
        </div>
        <div class="work-type-container">
            <span>Вид:</span>
            <select v-model="workType">
                <option
                    v-for="(option, optionId) in $store.state.worksModule.types"
                    :key="optionId"
                    :value="option.title"
                >
                    {{option.title}}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasksCount: this.$store.state.worksModule.createdWork.taskCount,
            workName: this.$store.state.worksModule.createdWork.title,
            workTime: this.$store.state.worksModule.createdWork.workTime,
            workType: this.$store.state.worksModule.createdWork.controlTestType,
            isChooseTaskSeries: false,
        }
    },
    watch: {
        tasksCount() {
            if (this.tasksCount > 100) {
                this.tasksCount = 100;
            }
            if (this.tasksCount < 0) {
                this.tasksCount = 0;
            }
            this.$store.commit('SET_CREATED_WORK_TASK_COUNT', this.tasksCount);
        },
        workName() {
            if (this.workName.length > 50) {
                this.workName = this.workName.split('');
                this.workName.length = 50;
                this.workName = this.workName.join('');
            }
            this.$store.commit('SET_CREATED_WORK_NAME', this.workName);
        },
        workTime() {
            if (this.workTime > 300) {
                this.workTime = 300;
            }
            this.$store.commit('SET_CREATED_WORK_TIME', this.workTime);
        },
        workType() {
            this.$store.commit('SET_CREATED_WORK_TYPE', this.workType);
        }
    },
}
</script>

<style scoped>

.description-container {
    color: #333;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
}

.description-container > * {
    margin-top: 20px;
}

.description-container > :first-child {
    margin-top: 0;
}

.task-count-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.task-count-container > input {
    margin-left: 5px;
    width: 50px;
    height: 20px;
    font-size: 18px;
}

.work-name-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.work-name-container > input {
    margin-left: 5px;
    width: 600px;
    height: 20px;
    font-size: 18px;
}

.work-time-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.work-time-container > input {
    margin-left: 5px;
    width: 50px;
    height: 20px;
    font-size: 18px;
}

.work-type-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.work-type-container > select {
    outline: none;
    height: 30px;
    width: 150px;
    font-size: 15px;
    margin-left: 5px;
}

</style>
