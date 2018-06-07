<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <div class="about-info-container">
                        <h3>О платформе</h3>
                    </div>
                    <button class="modal-default-button" @click="$emit('close')">
                        x
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        }
    }
}
</script>

<style scoped>

.about-info-container {
    width: 900px;
    height: 100%;
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
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .0s ease;
}

.modal-wrapper {
    cursor: pointer;
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    cursor: initial;
    display: flex;
    flex-direction: row;
    width: 80%;
    height: 700px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Open Sans', sans-serif;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    height: 20px;
    width: 20px;
    cursor: pointer;
    font-size: 300%;
    font-weight: bold;
    color: #ff8d00;
    background: 0;
    border: 0px;
    margin-left: 20%;
    margin-top: -28px;
}

</style>