<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div @click="preventBubling">
                    <div class="modal-container" v-if="!$store.state.pupilsModule.errorMessage">
                        <h1><span>Добавление новых учеников</span></h1>
                        <div class="choose-checkboxes-container">
                            <span>Выберите класс: </span>
                            <select v-model="choosedParallelNumber">
                                <option
                                    v-for="(parallelNumber, parId) in $store.state.classesModule.createdParallelsNumbers"
                                    :key="parId"
                                >
                                    {{parallelNumber}}
                                </option>
                            </select>
                            <select v-model="choosedClassLetter">
                                <option
                                    v-for="(classObj, classId) in $store.state.pupilsModule.parallels[choosedParallelNumber - 1].classes"
                                    :key="classId"
                                >
                                    {{classObj.letter}}
                                </option>
                            </select>
                        </div>
                        <textarea rows="12" v-model="userInput"></textarea>
                        <div class="buttons-container">
                            <button @click="validateInput()">Добавить</button>
                            <button @click="$emit('close')">Закрыть</button>
                        </div>
                    </div>
                    <div class="modal-container" v-if="$store.state.pupilsModule.errorMessage">
                        <h1>Ошибка!</h1>
                        <div class="error-message-container">
                            <span>{{$store.state.pupilsModule.errorMessage}}</span>
                            <span>{{additionalErrorMessage}}</span>
                        </div>
                        <div class="buttons-container">
                            <button @click="clearErrorMessage">Изменить</button>
                            <button @click="$emit('close')">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
import alphabet from '../../../response-mocks/alphabet';
import findLetterPosition from '../../../helpers/find-letter-position';

export default {
    data() {
        return {
            choosedParallelNumber: 1,
            choosedClassLetter: '',
            userInput: '',
            errorMessage: '',
            additionalErrorMessage: '',
            usersToRegisterList: [],
            lines: [],
        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        validateInput() {
            if (!this.validateSelectData()) {
                return false;
            }

            if (!this.isUserInputEmpty()) {
                return false;
            }

            if (!this.validateLinesData()) {
                return false;
            }

            this.$store.commit('CHANGE_LETTER_POSITION', findLetterPosition(alphabet, this.choosedClassLetter));
            this.$store.dispatch('sendNewPupilsLogins', this.userInput.split(' '))
                .then(() => {
                    this.$emit(this.$store.state.pupilsModule.emittedEvent);
                });
        },
        validateSelectData() {
            if (this.choosedParallelNumber && this.choosedClassLetter) {
                return true;
            }
            this.showErrorMessage('Вы не выбрали класс или параллель');
            return false;
        },
        isUserInputEmpty() {
            if (this.userInput) {
                return true;
            }
            this.showErrorMessage('Поле ввода пустое, напиши пожалуйста имя и фамилию ученика');
        },
        validateLinesData() {
            let boolToReturn = true;
            let lines = this.devideStringToLinesAndClearThem();
            console.log(lines);
            console.log(lines);
            this.lines = lines;
            lines.forEach((line, index) => {
                const lineNumber = index + 1;
                console.log(line)
                if (line.length < 2) {
                    this.showErrorMessage('Поле ввода должно содержать имя и фамилию ученика, разделённые пробелом', '(Ошибка в строке ' + lineNumber + ')');
                    this.lines = [];
                    boolToReturn = false;
                }

                if (boolToReturn && (line[0].length < 3 || line[1].length < 3)) {
                    this.showErrorMessage('Имя и фамилия должны содержать не менее 3 символов', '(Ошибка в строке ' + lineNumber + ')');
                    this.lines = [];
                    boolToReturn = false;
                }
            });
            return boolToReturn;
        },
        devideStringToLinesAndClearThem() {
            let lines = this.userInput.split(/\r?\n/);
            lines = lines.map((line) => {
                let words = line.str.match(/[а-яА-Яa-zA-Z]+/g);
                if (words.length < 2) {
                    return words;
                }
                words.length = 2;
                return words;
            }).filter((line) => {
                return line[0].trim() !== '' && line[1].trim() !== '';
            });
            return lines;
        },
        showErrorMessage(errorMessage, additionalErrorMessage = '') {
            this.$store.commit('SHOW_OR_HIDE_ERROR_MESSAGE', errorMessage);
            this.additionalErrorMessage = additionalErrorMessage;
        },
        clearErrorMessage() {
            this.$store.commit('SHOW_OR_HIDE_ERROR_MESSAGE', '');
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
    width: 600px;
    min-height: 360px;
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

.modal-container > h1 {
    padding: 10px 30px 10px 10px;
    text-align: left;
    background-color: #ff8d00;
    color: White;
    margin-top: 0px;
    font-size: 16px;
    font-weight: 400;
}

.choose-checkboxes-container {
    color: #333;
    display: flex;
    flex-direction: rpw;
    justify-content: center;
    align-items: center;
}

.choose-checkboxes-container > :nth-child(2) {
    margin-left: 10px;
}

.choose-checkboxes-container > :last-child {
    margin-left: 5px;
}

.choose-checkboxes-container > select {
    outline: none;
    height: 30px;
    width: 40px;
    font-size: 15px;
}

textarea {
    border-style: solid;
    margin-top: 10px;
    resize: none;
    width: 95%;
    outline: none;
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 100%;
    margin: 10px auto;
}

.buttons-container {
    margin-left: 380px;
    margin-top: 5px;
    margin-bottom: 10px;
}

.buttons-container > :last-child {
    margin-left: 10px;
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
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    font-family: 'Open Sans', sans-serif;
}

.buttons-container > button:hover {
    background-color: #ff8d00;
}

.error-message-container {
    color: red;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    text-align: center;
    min-height: 270px;
    display: flex;
    flex-direction: column;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
    }

    .buttons-container {
        width: 100%;
        height: 65px;
        display: flex;
        flex-direction: column;
        margin: auto;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 10px;
    }

    .buttons-container > button {
        width: 95%;
    }

    .buttons-container > :last-child {
        margin-left: 0px;
    }
}

@media (max-width: 650px) {
    .modal-container {
        max-width: 402px;
        width: 90%;
        min-height: 440px;
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