<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" @click="preventBubling">
                    <h1><span>Классы: {{$store.state.teachersModule.tempTeacher.name}}</span></h1>
                    <div v-if="$store.state.teachersModule.errorMessage" class="error-message-container">
                        {{$store.state.teachersModule.errorMessage}}
                    </div>
                    <div class="choose-parallel-headline">Выберите параллель:</div>
                    <div class="parallel-list-container">
                        <span
                            class="parallel-number"
                            v-for="(parallel, parallelId) in $store.state.teachersModule.tempTeacher.tempParallels"
                            :key="parallelId"
                            @click="chooseParallel(parallel.id)"
                            :class="[parallel.isTeached ? 'parallel-is-teached' : 'parallel-is-not-teached', parallel.isChoosed ? 'parallel-is-choosed' : 'parallel-is-not-choosed']"
                        >
                            {{parallel.number}}
                        </span>
                        <div class="parallel-letters-container"  v-if="isParallelChoosed">
                            <div>Выберите классы:</div>
                            <span
                                v-for="(classObj, classId) in $store.state.teachersModule.choosedParallel.classes"
                                :key="classId"
                                :class="[classObj.isChoosed ? 'class-is-choosed' : 'class-is-not-choosed']"
                                @click="chooseLetter(classObj.letter)"
                            >
                                {{ classObj.letter }}
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
        this.$store.commit('CLEAR_TEMP_VARIABLES');
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
        chooseParallel(parallelId) {
            this.$store.commit('CHOOSE_PARALLEL', parallelId);
            this.isParallelChoosed = true;
            this.choosedParallelId = parallelId;
        },
        chooseLetter(letter) {
            this.$store.commit('CHOOSE_LETTER', {parallelId: this.choosedParallelId, letter: letter});
        },
        approveTeacherChanges() {
            this.$store.dispatch('approveTeacherChanges')
                .then(() => {
                    this.$emit(this.$store.state.teachersModule.emittedEvent);
                });
        },
    }
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
    width: 300px;
    min-height: 250px;
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

.choose-parallel-headline {
    margin-left: 15px;
    margin-top: 5px;
}

.modal-body {
    margin: 20px 0;
}

.parallel-number {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
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
    background: transparent url('../../../assets/zero.png') no-repeat 3px 3px;
    border: 1px solid white;
    color: black;
    margin-right: 4px;
    margin-left: 4px;
    padding-top: 6px;
}

.parallel-is-teached {
    border: 1px solid #ff8d00;
}

.parallel-is-not-teached {
    border: none;
}

.buttons-container {
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 200px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 80px;
    align-items: center;
    margin-left: 110px;
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
    background: transparent url('../../../assets/zero.png') no-repeat 3px 3px;
    border: 1px solid white;
    color: black;
    margin-right: 4px;
    margin-left: 4px;
    padding-top: 6px;
}

.error-message-container {
    color: red;
    text-align: center;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
    }

    .buttons-container {
        width: 100%;
        margin-left: 0px;
    }

    .buttons-container > button {
        width: 95%;
    }
}

@media (max-width: 650px) {
    .modal-container {
        width: 90%;
        max-width: 402px;
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

    .buttons-container {
        width: 100%;
        margin-left: 0px;
    }

    .buttons-container > button {
        width: 95%;
    }

    .parallel-list-container {
        min-height: 100px;
    }
}

</style>