<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" v-on:click="preventBubling">
                    <div class="header-container">
                        <div class="buttons-container">
                            <button
                                v-bind:class="[capabilitiesComponentShown ? 'button-is-choosed' : 'button-is-not-choosed']"
                                @click="showCapabilitiesComponent()"
                            >
                                Возможности
                            </button>
                            <button
                                @click="showAboutComponent()"
                                v-bind:class="[aboutComponentShown ? 'button-is-choosed' : 'button-is-not-choosed']"
                            >
                                О платформе
                            </button>
                        </div>
                        <button class="close-button" @click="$emit('close')">
                            x
                        </button>
                    </div>
                    <capabilities
                        v-if="capabilitiesComponentShown"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
import Capabilities from './about/Capabilities.vue';

export default {
    components: {
        Capabilities,
    },
    data() {
        return {
            capabilitiesComponentShown: true,
            aboutComponentShown: false,
        };
    },
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        showCapabilitiesComponent() {
            this.capabilitiesComponentShown = true;
            this.aboutComponentShown = false;
        },
        showAboutComponent() {
            this.aboutComponentShown = true;
            this.capabilitiesComponentShown = false;
        },
    }
}
</script>

<style scoped>

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: -56px !important;
    left: 0;
    width: 100%;
    height: 115%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .0s ease;
}

.modal-wrapper {
    height: 100%;
    cursor: pointer;
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    cursor: initial;
    width: 90%;
    height: 700px;
    margin: 0px auto;
    padding: 20px;
    background-color: #fff;
    color: #222222;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Open Sans', sans-serif;
    overflow-y:scroll;
    overflow-x: hidden;
    padding-bottom: 0px;
}

.modal-body {
    margin: 20px 0;
}

.close-button {
    height: 44px;
    width: 36px;
    cursor: pointer;
    font-size: 300%;
    font-weight: bold;
    color: #ff8d00;
    background: 0;
    margin-bottom: 26px;
    border: 0px;
}

.header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 36px;
}

.buttons-container {
    width: 90%;
    height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.buttons-container > button {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    cursor: pointer;
    color: white;
    display: block;
    background-color: #898887;
    width: 50%;
    height: 36px;
    border: 1px solid white;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}

.button-is-choosed {
    background-color: #ff8d00 !important;
}

.button-is-not-choosed {
    background-color: #898887;
}

@media (max-width: 650px) {
    .modal-container {
        width: 85%;
        height: 90%;
    }
}

@media (max-width: 600px) {
    .modal-container {
        width: 80%;
    }
}

@media (max-width: 550px) {
    .modal-container {
        margin-left: 5% !important;
    }

    .close-button {
        font-size: 300% !important;
    }
}

</style>