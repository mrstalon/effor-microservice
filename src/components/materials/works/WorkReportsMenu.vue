<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" @click="preventBubling">
                    <h1><span>Просмотр отчетов</span></h1>
                    <div class="links-container">
                        <a href="">Получить версию для печати</a>
                        <a href="">Экспортировать в MS Excel</a>
                    </div>
                    <button @click="$emit('close')" >Закрыть</button>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
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
    min-height: 150px;
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


button{
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
    margin: 20px auto;
}

button:hover {
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

a {
    text-decoration: none;
    color: #898887;
    font-size: 18px;
}

a:hover {
    color: #ff8d00;
}

.links-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 70px;
}

@media (max-width: 850px) {
    .modal-container {
        width: 632px;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .modal-container > h1 {
        width: 592px;
    }

    button {
        width: 90%;
        margin: 30px auto;
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

}
</style>