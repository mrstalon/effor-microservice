<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1>Добавление параллели</h1>
                    <div class="error-message-container" v-if="errorMessage">
                        {{errorMessage}}
                    </div>
                    <div class="choose-parallel-number-container">
                        <span>Введите параллель: </span>
                        <button v-on:click="decrementParNumber">-</button>
                        <span class="parallel-number">{{parToAddNumber}}</span>
                        <button v-on:click="incrementParNumber">+</button>
                    </div>
                    <div class="alphabet-container">
                        <span v-for="(letter, letterId) in this.$store.state.alphabet" v-bind:key="letterId" @click="checkShouldWeAddOrDeleteLetter(letter, letterId)" v-bind:class="[letter.isClicked ? 'letter-is-choosed' : 'letter-is-not-choosed']">{{letter.letter}}</span>
                    </div>
                    <div class="choose-parallel-buttons-container">
                        <button v-on:click="validateParallelToAdd">Добавить</button>
                        <button @click="$emit('close')">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    beforeUpdate() {
        console.log(this.$store.state.alphabet);
    },
    data() {
        return {
            parToAddNumber: 1,
            errorMessage: '',
        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        decrementParNumber() {
            if (this.parToAddNumber === 1) {
                return;
            } else {
                this.parToAddNumber = this.parToAddNumber - 1;
            }
        },
        incrementParNumber() {
            if (this.parToAddNumber === 11) {
                return;
            } else {
                this.parToAddNumber = this.parToAddNumber + 1;
            }
        },
        checkShouldWeAddOrDeleteLetter(letter, letterId) {
            if (this.$store.state.arrayOfLettersToAdd.includes(letter)) {
                this.$store.commit('deleteLetterFromArrayOfLetters', letter);
                this.$store.commit('changeIsLetterClicked', letterId)
            } else {
                this.$store.commit('addLetterToArrayOfLetters', letter);
                this.$store.commit('changeIsLetterClicked', letterId)
            }
        },
        validateParallelToAdd() {
            if (!this.$store.state.createdParallelsNumbers.includes(this.parToAddNumber)) {
                this.$store.commit('addParallel', this.parToAddNumber);
            } else {
                this.addErrorMessage('Параллель с таким номером уже существует');
            }
        },
        addErrorMessage(errorMessage) {
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
    min-height: 350px;
    height: fit-content;
    margin: 0px auto;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Philosopher, sans-serif;
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

.choose-parallel-buttons-container > button{
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

.choose-parallel-buttons-container {
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
}

.choose-parallel-buttons-container > :first-child {
    margin-left: 50px;
}

.choose-parallel-buttons-container > :last-child {
    margin-left: 10px;
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

</style>