<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" @click="preventBubling">
                    <h1><span>Добавление параллели</span></h1>
                    <div class="error-message-container" v-if="errorMessage">
                        {{errorMessage}}
                    </div>
                    <div class="choose-parallel-number-container">
                        <span>Введите параллель: </span>
                        <button @click="decrementParNumber">-</button>
                        <span class="parallel-number">{{parallelToAddNumber}}</span>
                        <button @click="incrementParNumber">+</button>
                    </div>
                    <div class="alphabet-container">
                        <span
                            v-for="(letterObj, letterId) in $store.state.classesModule.alphabet"
                            :key="letterId"
                            @click="checkShouldWeAddOrDeleteLetter(letterObj.letter, letterId)"
                            :class="[letterObj.isChoosed ? 'letter-is-choosed' : 'letter-is-not-choosed']"
                        >
                            {{letterObj.letter}}
                        </span>
                    </div>
                    <div class="add-parallel-menu-buttons-container">
                        <button @click="validateParallelToAdd">Добавить</button>
                        <button @click="$emit('close')">Закрыть</button>
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
            parallelToAddNumber: 1,
            errorMessage: '',
        }
    },
    beforeDestroy() {
        this.$store.commit('MAKE_STATE_OF_ALPHABET_INITIAL');
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        decrementParNumber() {
            if (this.parallelToAddNumber === 1) {
                return;
            } else {
                this.parallelToAddNumber = this.parallelToAddNumber - 1;
            }
        },
        incrementParNumber() {
            if (this.parallelToAddNumber === 11) {
                return;
            } else {
                this.parallelToAddNumber = this.parallelToAddNumber + 1;
            }
        },
        checkShouldWeAddOrDeleteLetter(letter, letterId) {
            if (this.$store.state.classesModule.arrayOfLettersToAdd.includes(letter)) {
                this.$store.commit('DELETE_LETTER_FROM_ARRAY_OF_LETTERS', letter);
            } else {
                this.$store.commit('ADD_LETTER_TO_ARRAY_OF_LETTERS', letter);
            }
            this.$store.commit('CHANGE_IS_LETTER_CHOOSED', letterId);
        },
        validateParallelToAdd() {
            if (this.$store.state.classesModule.arrayOfLettersToAdd == false) {
                this.showErrorMessage('Нельзя создать пустую параллель');
                return;
            }
            if (!this.$store.state.classesModule.createdParallelsNumbers.includes(this.parallelToAddNumber)) {
                this.$store.commit('ADD_PARALLEL', this.parallelToAddNumber);
                this.$store.commit('CLEAR_ARRAY_OF_LETTERS_TO_ADD');
                this.$store.commit('MAKE_STATE_OF_ALPHABET_INITIAL');
                this.$emit('close');
            } else {
                this.showErrorMessage('Параллель с таким номером уже существует');
            }
        },
        showErrorMessage(errorMessage) {
            this.errorMessage = errorMessage;

            setTimeout(() => {
                this.clearErrorMessage();
            }, 4000);
        },
        clearErrorMessage() {
            this.errorMessage = '';
        },
    }
}
</script>

<style scoped>

.about-info-container {
    width: 300px;
    font-family: 'Open Sans', sans-serif;
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
    min-height: 350px;
    height: fit-content;
    margin: 0px auto;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Open Sans', sans-serif;
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

.choose-parallel-number-container {
    margin-top: 5px;
    color: #333;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.choose-parallel-number-container > button {
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
    width: 30px;
    height: 25px;
}

.choose-parallel-number-container > button:hover {
    background-color: #ff8d00;
}

.choose-parallel-number-container > :first-child {
    margin-left: 30px;
}

.choose-parallel-number-container > :nth-child(2) {
    margin-left: 10px;
}

.parallel-number {
    width: 20px;
    height: 20px;
    border: 1px solid rgb(185, 185, 185);
    margin-left: 5px;
    text-align: center;
}

.choose-parallel-number-container > :last-child {
    margin-left: 5px;
}

.alphabet-container > span {
    display: inline-block;
    width: 33px;
    height: 25px;
    margin-top: 5px;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;
    background: transparent url('../../assets/zero.png') no-repeat 3px 3px;
    border: 1px solid white;
    color: black;
    margin-right: 4px;
    margin-left: 4px;
    padding-top: 5px;
}

.alphabet-container {
    width: 270px;
    margin: 10px auto;
}

.alphabet-container > :first-child {
    margin-left: 30px;
}

.alphabet-container > :nth-child(6) {
    margin-left: 30px;
}

.alphabet-container > :nth-child(11) {
    margin-left: 30px;
}

.alphabet-container > :nth-child(16) {
    margin-left: 30px;
}

.alphabet-container > :nth-child(21) {
    margin-left: 30px;
}

.add-parallel-menu-buttons-container > button{
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

.add-parallel-menu-buttons-container > button:hover {
    background-color: #ff8d00;
}

.add-parallel-menu-buttons-container {
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

.error-message-container {
    color: red;
    margin: auto;
    width: 230px;
    font-size: 19px;
}

.letter-is-choosed {
    background-color: #ff8d00 !important;
}

.letter-is-not-choosed {
    background-color: none !important;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .modal-container > h1 {
        width: 592px;
    }

    .alphabet-container {
        width: 530px;
    }

    .alphabet-container > span {
        margin-right: 4px !important;
        margin-left: 4px !important;
    }

    .alphabet-container > :first-child {
        margin-left: 4px;
    }

    .alphabet-container > :nth-child(6) {
        margin-left: 4px;
    }

    .alphabet-container > :nth-child(11) {
        margin-left: 4px;
    }

    .alphabet-container > :nth-child(16) {
        margin-left: 4px;
    }

    .alphabet-container > :nth-child(21) {
        margin-left: 4px;
    }

    .alphabet-container > :last-child {
        margin-left: 245px !important;
    }

    .add-parallel-menu-buttons-container {
        width: 100%;
        margin-left: 0px;
    }

    .add-parallel-menu-buttons-container > button {
        width: 95%;
    }

    .error-message-container {
        width: 550px;
        text-align: center;
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

    .alphabet-container {
        width: 305px;
    }

    .alphabet-container > span {
        margin-right: 4px !important;
        margin-left: 4px !important;
    }

    .alphabet-container > :first-child {
        margin-left: 4px;
    }

    .alphabet-container > :nth-child(6) {
        margin-left: 4px;
    }

    .alphabet-container > :nth-child(11) {
        margin-left: 4px;
    }

    .alphabet-container > :nth-child(16) {
        margin-left: 4px;
    }

    .alphabet-container > :nth-child(21) {
        margin-left: 4px;
    }

    .alphabet-container > :last-child {
        margin-left: 4px !important;
    }
    
    .alphabet-container > :nth-child(22) {
        margin-left: 70px !important;
    }

    .add-parallel-menu-buttons-container {
        width: 100%;
        margin-left: 0px;
    }

    .add-parallel-menu-buttons-container > button {
        width: 95%;
    }

    .error-message-container {
        width: 550px;
        text-align: center;
    }
}
</style>