<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" @click="preventBubling">
                    <h1><span>Классы {{parallelNumber}} параллели</span></h1>
                    <div class="error-message-container" v-if="$store.state.classesModule.errorMessage">
                        {{$store.state.classesModule.errorMessage}}
                    </div>
                    <div class="alphabet-container">
                        <span
                            v-for="(letterObj, letterId) in $store.state.classesModule.alphabet"
                            :key="letterId"
                            :class="[letterObj.isChoosed ? 'letter-is-choosed' : 'letter-is-not-choosed']"
                            @click="checkShouldWeAddOrDeleteLetter(letterObj, letterId)"
                        >
                            {{letterObj.letter}}
                        </span>
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
    props: {
        parallelNumber: {
            type: Number,
            required: true,
        },
        parallelId: {
            type: Number,
            required: true,
        },
    },
    beforeMount() {
        this.$store.commit('MAKE_STATE_OF_ALPHABET_INITIAL');
        this.$store.commit('LIGHT_CHOOSED_CLASSES_LETTERS_IN_ALPHABET', this.parallelId);
        this.$store.commit('FILL_ARRAY_OF_LETTERS_TO_ADD', this.parallelId);
    },
    beforeDestroy() {
        this.$store.commit('MAKE_STATE_OF_ALPHABET_INITIAL');
        this.$store.commit('CLEAR_ARRAY_OF_LETTERS_TO_ADD');
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        checkShouldWeAddOrDeleteLetter(letterObj, letterId) {
            const arrayOfLettersToAdd = this.$store.state.classesModule.arrayOfLettersToAdd.map(item => {
                return item.letter;
            });
            if (arrayOfLettersToAdd.includes(letterObj.letter)) {
                this.$store.commit('DELETE_LETTER_FROM_ARRAY_OF_LETTERS', letterObj);
            } else {
                this.$store.commit('ADD_LETTER_TO_ARRAY_OF_LETTERS', letterObj);
            }
            this.$store.commit('CHANGE_IS_LETTER_CHOOSED', letterId);
        },
        checkShouldWeApproveChanges() {
            if (this.$store.state.classesModule.arrayOfLettersToAdd.length >= 0) {
                this.$store.dispatch('approveParallelChanges', {parallelId: this.parallelId, parallelNumber: this.parallelNumber})
                    .then(()=> {
                        this.$emit(this.$store.state.classesModule.emittedEvent);
                    });
            }
        },
        addErrorMessage(errorMessage) {
            this.$store.commit('SHOW_OR_HIDE_ERROR_MESSAGE', errorMessage);
            setTimeout(() => {
                this.clearErrorMessage();
            }, 4000);
        },
        clearErrorMessage() {
            this.$store.commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
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
    min-height: 320px;
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
    background: transparent url('../../assets/zero.png') no-repeat 3px 3px;
    border: 1px solid white;
    color: black;
    margin-right: 4px;
    margin-left: 4px;
    padding-top: 6px;
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
    width: 160px;
    margin-top: 0px;
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

@media screen and (max-width: 850px) {
    .modal-container {
        width: 632px;
        min-height: 250px;
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
        margin-left: 260px !important;
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

@media screen and (max-width: 650px) {
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