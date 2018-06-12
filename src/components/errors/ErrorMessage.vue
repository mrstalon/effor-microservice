<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" @click="preventBubling">
                    <h1>Ошибка!</h1>
                    <div class="error-message-container">
                        {{errorMessage}}
                    </div>
                    <div class="button-container">
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
        errorMessage: {
            type: String,
            required: true,
        },
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
    width: 300px;
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

.error-message-container {
    color: red;
    font-family: 'Open Sans', sans-serif;
    height: 140px;
    margin-left: 15px;
    margin-top: 20px;
    font-size: 18px;
}

.button-container {
    margin-left: 190px;
}

.button-container > button {
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

.button-container > button:hover {
    background-color: #ff8d00;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
    }

    .button-container {
        width: 95%;
        margin: auto;
    }

    .button-container > button {
        width: 100%;
    }
}

@media (max-width: 650px) {
    .modal-container {
        width: 402px;
    }

    .button-container {
        width: 95%;
        margin: auto;
    }

    .button-container > button {
        width: 100%;
    }
}

</style>