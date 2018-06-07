<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1>Проверочные работы: ученика {{$store.state.pupilsModule.choosedParallelNumber}}-{{$store.state.pupilsModule.choosedClassLetter}} класса</h1>
                    <div class="reports-container">

                    </div>
                    <button @click="$emit('close')" class="exit-button">Закрыть</button>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
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
    width: 600px;
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

.reports-container {
    min-height: 150px;
}

.exit-button {
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
    margin-left: 430px;
}

.exit-button:hover {
    background-color: #ff8d00;
}

</style>