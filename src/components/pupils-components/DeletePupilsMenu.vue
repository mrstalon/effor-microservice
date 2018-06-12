<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" @click="preventBubling">
                    <h1><span>Добавление ученика</span></h1>
                    <div class="pupils-list">
                        <div
                            v-for="(pupil, pupilId) in $store.state.pupilsModule.choosedClassPupilList"
                            class="pupil-div"
                            :key="pupilId"
                            @click="choosePupil(pupil.login)"
                        >
                            <img
                                src="../../assets/checkbox-icon-active.png"
                                v-if="pupil.isChoosed"
                            >
                            <img
                                src="../../assets/checkbox-icon.png"
                                v-if="!pupil.isChoosed"
                            >
                            <span>{{pupil.login}}</span>
                        </div>
                    </div>
                    <div class="buttons-container">
                        <button @click="approvePupilListChanges">Удалить из школы</button>
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
        choosePupil(pupilLogin) {
            this.$store.commit('CHOOSE_PUPIL_TO_DELETE', pupilLogin);
        },
        approvePupilListChanges() {
            this.$store.commit('APPROVE_PUPIL_LIST_CHANGES');
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
    width: 600px;
    min-height: 100px;
    height: fit-content;
    margin: 0px auto;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Open Sans', sans-serif;
    color: #898887;
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

.pupils-list {
    margin-left: 15px;
    min-height: 100px;
    overflow: auto;
}

.pupil-div {
    width: 33.33%;
    height: 50px;
    padding-right: 10px;
    float: left;
    box-sizing: border-box;
}

.pupil-div > img {
    width: 20px;
    height: 20px;
}

.buttons-container {
    margin: auto;
    margin-top: 10px;
    width: 380px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-left: 80px;
    align-items: center;
    margin-left: 210px;
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

.buttons-container > :first-child {
    width: 180px;
}

.buttons-container > button:hover {
    background-color: #ff8d00;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
    }

    .buttons-container {
        width: 100%;
        height: 65px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 10px;
    }

    .buttons-container > button {
        width: 95% !important;
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

    .pupil-div {
        width: 50% !important;
    }
}

</style>