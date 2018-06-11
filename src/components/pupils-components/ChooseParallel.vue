<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1><span>Выберите параллель</span></h1>
                    <div class="parallel-list-container">
                        <span
                            v-for="(parallel, parallelId) in $store.state.pupilsModule.parallels"
                            v-bind:key="parallelId"
                            v-bind:class="[parallel.id === choosedParallelId ? 'parallel-is-choosed' : 'parallel-is-not-choosed']"
                            @click="chooseParallel(parallel.id, parallel.number)"
                         >
                            {{parallel.number}}
                        </span>
                    </div>
                    <button @click="$emit('close')">Закрыть</button>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    props: {
        choosedParallelId: {
            type: Number,
            required: true,
        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        chooseParallel(parallelId, parallelNumber) {
            this.$store.commit('CHOOSE_PARALLEL_TO_RENDER', { parallelId: parallelId, parallelNumber: parallelNumber });
            this.$emit('close');
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
}

.modal-container > button {
    text-align: center;
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
    width: 160px;
    height: 30px;
    margin-top: 80px;
    margin-left: 125px;
}

.modal-container > button:hover {
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

.parallel-list-container > span{
    display: inline-block;
    width: 33px;
    height: 25px;
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;
    background: transparent url('../../assets/zero.png') no-repeat 3px 3px;
    border: 1px solid white;
    color: black;
    margin-right: 4px;
    margin-left: 4px;
    padding-top: 6px;
}

.parallel-list-container {
    margin-left: 10px;
}

.parallel-is-choosed {
    background-color: #ff8d00 !important;
}

.parallel-is-not-choosed {
    background-color: 0;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
        min-height: 250px;
    }

    .parallel-list-container {
        height: 140px;
    }

    .modal-container > button {
        width: 95%;
        margin: auto;
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

</style>