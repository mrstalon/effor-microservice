<template>
    <div class="container" v-on:click="hideShowedComponents">
        <About v-if="showAboutMenu" @close="showAboutMenu = false" />
        <header>
            <a href="https://new.effor.by/home">
                <img src="./assets/header_logo.png" alt="Could not load an image" class="header-logo-img">
            </a>
            <div class="user-profile-container">
                <button class="user-info-button" @click="showNavComponent">
                  <img :src="$store.state.appModule.avatar" alt="Could not load an image" class="avatar-logo-img">
                  <p>{{$store.state.appModule.userName}}</p>
                </button>
                <div class="user-info-button-mobile" @click="showMobileNavMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav-desktop-menu
                    v-if="showNavDesktop"
                    class="nav-component-desktop"
                />
                <nav-mobile-menu
                    v-if="showNavMobile"
                    class="nav-component-mobile"
                    @showNav="showAboutMenu = true"
                    @close="showNavMobile = false"
                />
            </div>
        </header>

        <main>
            <router-view/>
        </main>

        <footer>
            <div>
                <p class="footer-text">
                  © Интеллект Онлайн, 2014-2018
                </p>
            </div>

            <button class="about-button" @click="showAboutInfo">
                <p>
                    О платформе
                </p>
            </button>
        </footer>
    </div>
</template>


<script>
import About from './components/school/app-components/About.vue';
import NavDesktopMenu from './components/school/app-components/NavDesktopMenu.vue';
import NavMobileMenu from './components/school/app-components/NavMobileMenu.vue';

import axios from 'axios';

export default {
    beforeMount() {
        this.$store.dispatch('getUserInfo');
    },
    components: {
        About,
        NavDesktopMenu,
        NavMobileMenu,
    },
    data() {
        return {
            showAboutMenu: false,
            showNavDesktop: false,
            showNavMobile: false,
        }
    },
    methods: {
        showAboutInfo(e) {
            this.showAboutMenu = true;
            e.stopPropagation();
        },
        showAboutMenuFunc() {
            this.showAboutMenu = true;
        },
        showNavComponent(e) {
            this.showNavDesktop = !this.showNavDesktop;
            e.stopPropagation();
        },
        showMobileNavMenu(e) {
            if (this.showNavMobile === true) {
                this.showNavMobile = false;
            } else {
                this.showNavMobile = true;
                e.stopPropagation();
            }

        },
        hideShowedComponents() {
            this.showNavDesktop = false;
            this.showNavMobile = false;
            this.showAboutMenu = false;
        }
    }
}
</script>

<style scoped>

.container {
    height: 100%;
    width: 100%;
    display: table;
    flex-direction: column;
    font-family: 'Open Sans', sans-serif;
    color: #898887;
    max-width: 100%;
}

header, main, footer {
    width: 100%;
    display: flex;
}

header {
    flex-direction: row;
    height: 75px;
    border-bottom: 1px solid #89888752;
    justify-content: space-between;
    align-items: center;
    background: url('./assets/header_background.jpg') center bottom;
    background-repeat: no-repeat;
}

header > a {
    margin-left: 10px;
}

.user-profile-container {
    margin-right: 20px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    min-width: 100px;
    justify-content: space-between;
}

.user-profile-container > button:hover {
    cursor: pointer;
    color: #ff8d00;
}

.user-info-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    color: #898887;
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: 700;
    background: none;
    border: 0;
}

.user-info-button > p {
    margin: 6px;
}

.nav-component-desktop {
    position: absolute;
    right: 0;
    border-radius: 3px;
    border: 1px black solid;
    top: 55px;
    width: 170px;
    height: 320px;
    background-color: white;
}

.nav-component-mobile {
    position: absolute;
    right: 0;
    top: 45px;
    background-color: white;
}

.avatar-logo-img {
    width: 27px;
    height: 27px;
    border: 2px #898887 solid;
    border-radius: 17px;
    margin-right: 5px;
}

.user-profile-info {
    display: flex;
    flex-direction: row;
}



main {
    background: url('./assets/main_background.jpg');
    height: 100%;
    display: table-row;
}

footer {
    border-top: 1px solid #89888752;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

footer > div {
    font-size: 16px;
    display: flex;
    margin-left: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.about-button {
    display: flex;
    flex-direction: row;
    width: 170px;
    justify-content: space-around;
    align-items: center;
    font-family: 'Open Sans', sans-serif;
    color: #898887;
    font-size: 18px;
    border: 0;
}

.about-button:hover {
    cursor: pointer;
}

.about-button > p {
    margin: 0;
}

.footer-text > a{
    text-decoration: none;
    color: #898887;
}

.user-info-button {
    display: flex;
}

.user-info-button-mobile {
    display: none;
}

@media screen and (max-width: 650px) {
    .user-info-button {
        display: none;
    }

    .user-info-button-mobile {
        display: inline-block;
        margin-top: 10px;
        margin-left: 55px;
        width: 25px;
        height: 25px;
        position: relative;
        cursor: pointer;
        transition: .25s ease-in-out;
    }

    .user-info-button-mobile > span {
        display: block;
        position: absolute;
        height: 4px;
        width: 100%;
        background: #898887;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }

    .user-info-button-mobile > :first-child {
        top: 0px;
    }

    .user-info-button-mobile > :nth-child(2) {
        top: 8px;
    }

    .user-info-button-mobile > :nth-child(3) {
        top: 16px;
    }

    header {
        height: 45px;
    }

    .header-logo-img {
        height: 30px;
        width: 120px;
        margin-top: 13px;
    }

    .main-content-container {
        width: 85%;
        max-width: 402px;
    }

    .content-nav-container {
        max-width: 400px;
        width: 100%;
    }

    main {
        min-height: 720px;
    }

    .about-button {
        display: none;
    }
}

</style>