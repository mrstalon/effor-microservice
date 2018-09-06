<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1><span>Добавление районов</span></h1>
                    <div class="districts-container">

                    </div>
                    <div class="buttons-container">
                        <div>
                            <button>Выбрать все</button>
                            <button>Назначить</button>
                        </div>
                        <button>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
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
    width: 450px;
    min-height: 400px;
    height: fit-content;
    margin: 0px auto;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Open Sans', sans-serif;
}

.buttons-container {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 10px;
    width: 200px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-left: 70px;
}

.buttons-container > button, .buttons-container > div > button {
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

.buttons-container > button:hover, .buttons-container > div > button:hover {
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

.districts-container {
    height: 250px;
    max-height: 250px;
    overflow: auto;
}

.buttons-container {
    width: 400px;
    display: flex;
    flex-direction: column;
}

.buttons-container > :last-child {
    margin-left: 170px;
}

.buttons-container > div {
    width: 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
        min-height: 150px;
    }

    .parallel-list-container {
        height: 140px;
    }

    .buttons-container {
        width: 100%;
        margin-left: 0px;
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

</style>