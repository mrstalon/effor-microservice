<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1>Классы: {{this.$store.state.tempTeacher.name}}</h1>
                    <div>Выберите параллель:</div>
                    <div class="parallel-list-container">
                        <span
                        class="parallel-number"
                        v-for="(parallel, parId) in this.$store.state.tempTeacher.tempParallels"
                        v-bind:key="parId"
                        @click="chooseParallel(parId)"
                        v-bind:class="[parallel.isTeached ? 'parallel-is-teached' : 'parallel-is-not-teached', parallel.isChoosed ? 'parallel-is-choosed' : 'parallel-is-not-choosed']">
                            {{parallel.number}}
                        </span>
                        <div class="parallel-letters-container"  v-if="isParallelChoosed">
                            <div>Выберите классы:</div>
                            <span
                            v-for="(classObj, classId) in this.$store.state.choosedParallel.classes"
                            v-bind:key="classId"
                            v-bind:class="[classObj.isChoosed ? 'class-is-choosed' : 'class-is-not-choosed']"
                            @click="chooseLetter(classObj.letter)">
                                {{classObj.letter}}
                            </span>
                        </div>
                    </div>
                    <div class="buttons-container">
                        <button @click="approveTeacherChanges">Назначить</button>
                        <button @click="$emit('close')">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    beforeDestroy() {
        this.$store.commit('clearTempVariables');
    },
    data() {
        return {
            isParallelChoosed: null,
            choosedParallelId: null,
        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        chooseParallel(parId) {
            this.$store.commit('chooseParallel', parId);
            this.isParallelChoosed = true;
            this.choosedParallelId = parId;
        },
        chooseLetter(letter) {
            this.$store.commit('chooseLetter', {parId: this.choosedParallelId, letter: letter});
        },
        approveTeacherChanges() {
            this.$store.commit('approveTeacherChanges');
            this.$emit('close');
        },
    }
}
</script>

<style scoped>

.about-info-container {
    width: 300px;
    font-family: Philosopher;
    color: #222222;
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
    width: 300px;
    min-height: 250px;
    height: fit-content;
    margin: 0px auto;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Philosopher, sans-serif;
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

.modal-container > :nth-child(2) {
    margin-left: 15px;
    margin-top: 5px;
}

.modal-body {
    margin: 20px 0;
}

.parallel-number {
    margin: 0;
    padding: 0;
    font-family: 'Philosopher', sans-serif;
    font-size: 100%;
}

.parallel-list-container {
    text-align: left;
    margin-left: 15px;
    min-height: 150px;
    height: fit-content;
}

.parallel-number {
    display: inline-block;
    width: 33px;
    height: 25px;
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;
    background: transparent url('../assets/zero.png') no-repeat 3px 3px;
    border: 1px solid white;
    color: black;
    margin-right: 4px;
    margin-left: 4px;
    padding-top: 8px;
}

.parallel-is-teached {
    border: 1px solid #ff8d00;
}

.parallel-is-not-teached {
    border: none;
}

.buttons-container {
    margin-left: 90px;
    margin-bottom: 10px;
}

.buttons-container > button{
    padding: 3px 15px;
    border: 0;
    background-color: #898887;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    font-size: 100%;
    margin-top: 0px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    font-family: Philosopher, sans-serif;
}

.parallel-is-choosed, .class-is-choosed {
    background-color: #ff8d00 !important;
}

.parallel-is-not-choosed, .class-is-not-choosed {
    background-color: none;
}

.parallel-letters-container {
    margin-top: 10px;
    height: 100px;
}

.parallel-letters-container > span{
    display: inline-block;
    width: 33px;
    height: 25px;
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;
    background: transparent url('../assets/zero.png') no-repeat 3px 3px;
    border: 1px solid white;
    color: black;
    margin-right: 4px;
    margin-left: 4px;
    padding-top: 8px;
}

</style>