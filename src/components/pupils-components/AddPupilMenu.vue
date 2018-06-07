<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1><span>Добавление ученика</span></h1>
                    <div class="input-container">
                        <span>Введите логин:</span>
                        <input
                            type="text"
                            v-model="userInput"
                        >
                    </div>
                    <div class="error-container">
                        <span v-if="errorMessage">
                            {{errorMessage}}
                        </span>
                    </div>
                    <div class="buttons-container">
                        <button @click="verifyUserInput">Добавить</button>
                        <button @click="$emit('close')" class="exit-button">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    data() {
        return {
            errorMessage: '',
            userInput: '',
        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        verifyUserInput() {
            if (!(this.userInput.trim() == '')) {
                // here should be verification of user input
                // specifically if login can be added and etc...
                this.$emit('close');
            } else {
                this.showErrorMessage('Логин не может быть пустой строкой');
            }
        },
        showErrorMessage(errorMessage) {
            this.errorMessage = errorMessage;

            setTimeout(() => {
                this.hideErrorMessage();
            }, 4000);
        },
        hideErrorMessage() {
            this.errorMessage = '';
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
    min-height: 200px;
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

.input-container {
    min-height: 20px;
    display: flex;
    margin-left: 30px;
    flex-direction: row;
}

.input-container > input {
    height: 20px;
    text-align: center;
    width: 120px;
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 100%;
    margin-left: 5px;
}

.error-container {
    min-height: 120px;
    font-family: 'Open Sans', sans-serif;
    color: red;
    text-align: center;
    font-size: 19px;
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

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
    }

    .input-container {
        margin: auto;
    }

    .buttons-container {
        width: 100%;
        margin: 0px;
        margin-bottom: 10px;
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
}

</style>