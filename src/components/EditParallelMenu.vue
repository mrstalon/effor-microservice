<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <h1>Классы {{parNumber}} параллели</h1>
                    <div class="error-message-container" v-if="errorMessage">
                        {{errorMessage}}
                    </div>
                    <div class="alphabet-container">
                        <span
                        v-for="(letter, letterId) in this.$store.state.alphabet"
                        v-bind:key="letterId"
                        v-bind:class="[letter.isClicked ? 'letter-is-choosed' : 'letter-is-not-choosed']"
                        @click="checkShouldWeAddOrDeleteLetter(letter.letter, letterId)"
                        >{{letter.letter}}</span>
                    </div>
                    <div class="add-parallel-menu-buttons-container">
                        <button @click="checkShouldWeApproveChanges">Изменить</button>
                        <button @click="$emit('close')">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    props: ['parNumber', 'parId'],
    beforeMount() {
        this.$store.commit('lightClassesLettersInAlphabet', this.parId);
        this.$store.commit('fillArrayOfLettersToAdd', this.parId);
    },
    beforeDestroy() {
        this.$store.commit('makeStateOfAlphabetInitial');
    },
    data() {
        return {
            errorMessage: '',
        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        checkShouldWeAddOrDeleteLetter(letter, letterId) {
            if (this.$store.state.arrayOfLettersToAdd.includes(letter)) {
                console.log('includes');
                this.$store.commit('deleteLetterFromArrayOfLetters', letter);
                this.$store.commit('changeIsLetterClicked', letterId);
            } else {
                console.log('not includes');
                this.$store.commit('addLetterToArrayOfLetters', letter);
                this.$store.commit('changeIsLetterClicked', letterId);
            }
        },
        checkShouldWeApproveChanges() {
            if (this.$store.state.arrayOfLettersToAdd.length > 0) {
                this.$store.commit('approveParallelChanges', {parId: this.parId, parNumber: this.parNumber});
                this.$emit('close');
            } else {
                this.addErrorMessage('Нельзя оставить параллель пустой');
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
    min-height: 320px;
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


.parallel-number {
    width: 20px;
    height: 20px;
    border: 1px solid rgb(185, 185, 185);
    margin-left: 5px;
    text-align: center;
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

.add-parallel-menu-buttons-container > button{
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

.add-parallel-menu-buttons-container {
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
}

.add-parallel-menu-buttons-container > :first-child {
    margin-left: 50px;
}

.add-parallel-menu-buttons-container > :last-child {
    margin-left: 10px;
}
</style>