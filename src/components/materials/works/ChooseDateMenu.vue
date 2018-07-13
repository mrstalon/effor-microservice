<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1><span>Назначение работы</span></h1>
                    <div class="calendar">
                        <flat-pickr
                            v-model="date"
                            :config="config"
                            class="button"
                            placeholder="Выберите дату"
                        >
                    </flat-pickr>
                    </div>
                    <div class="buttons-container">
                        <button @click="setDate()" >Назначить</button>
                        <button @click="$emit('close')">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { Russian } from "flatpickr/dist/l10n/ru.js";

export default {
    beforeMount() {

    },
    components: {
        flatPickr,
    },
    data() {
        return {
            date: new Date,
            config: {
                locale: Russian,
            }
        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        setDate() {
            this.$store.commit('SET_WORK_CONDUCTING_DATE', this.computedDate);
            this.$emit('close');
        },
    },
    computed: {
        computedDate() {
            return this.date.split('-').reverse().join('.');
        }
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
    min-height: 150px;
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
    margin-left: 80px;
    align-items: center;
    margin-left: 110px;
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

.parallel-list-container > span{
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

.parallel-list-container {
    margin-left: 10px;
}

.parallel-is-choosed {
    background-color: #ff8d00 !important;
}

.parallel-is-not-choosed {
    background-color: 0;
}

.button {
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
    width: 200px;
    height: 30px;
    margin: 0 auto;
}

.button:hover {
    background-color: #ff8d00;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: white;
}

.calendar {
    margin: 0 auto;
    margin-top: 10px;
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