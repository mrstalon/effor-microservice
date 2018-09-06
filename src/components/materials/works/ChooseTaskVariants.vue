<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1><span>{{serieObj.title}}</span></h1>
                    <span>Группы заданий в серии:</span>
                    <div class="series-list-container">
                        <div
                            v-for="(variant, variantId) in $store.state.worksModule.createdWork.tasks[$store.state.worksModule.choosedTaskId].tasks[$store.state.worksModule.serieIdInCreatedWork].variants"
                            :key="variantId"
                            class="serie"
                        >
                            <span>{{variant.number}}</span>
                            <img
                                src="../../../assets/checkbox-icon-active.png"
                                v-if="variant.isChoosed"
                                @click="chooseOrUnchooseSerie(variantId)"
                                class="checkbox-cursor"
                            >
                            <img
                                src="../../../assets/checkbox-icon.png"
                                v-if="!variant.isChoosed"
                                class="checkbox-cursor"
                                @click="chooseOrUnchooseSerie(variantId)"
                            >
                        </div>
                    </div>
                    <div class="buttons-container">
                        <button @click="approveChanges()">Применить</button>
                        <button @click="exitMenu(serieObj)">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    props: {
        taskId: {
            type: Number,
            required: true,
        },
        subTaskId: {
            type: Number,
            required: true,
        },
        nestedSubTaskId: {
            type: Number,
            required: true,
        },
        nestedSubSubTaskId: {
            type: Number,
            required: true,
        },
        serieObjId: {
            type: Number,
            required: true,
        },
        serieObj: {
            type: Object,
            required: true,
        },
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        chooseOrUnchooseSerie(variantId) {
            this.$store.commit('CHOOSE_OR_UNCHOOSE_VARIANT', variantId);
        },
        exitMenu(taskObj) {
            this.$store.commit('LIFTING_VARIANTS_CHANGES', taskObj);
            this.$emit('close');
        },
        approveChanges() {
            this.$store.commit('LIGHT_IS_CONTAIN_CHOOSED_VARIANTS');
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

.modal-container > span {
    margin-left: 15px;
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

.series-list-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 70%;
    justify-content: space-around;
    margin: 15px auto;
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

.serie {
    margin: 0 auto;
    width: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
        min-height: 250px;
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

    .buttons-container {
        width: 100%;
        margin-left: 0px;
    }

    .buttons-container > button {
        width: 95%;
    }
}

</style>