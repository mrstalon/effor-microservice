<template>
    <div class="container" v-on:click="hideShowedComponents">
        <About v-if="showModal" @close="showModal = false"/>
        <header>
            <a href="https://new.effor.by/home">
                <img src="../assets/header_logo.jpg" alt="Could not load an image" class="header-logo-img">
            </a>
            <div class="user-profile-container">
                <button class="user-info-button" v-on:click="showNavComponent">
                  <img src="../assets/avatar_default.png" alt="Could not load an image" class="avatar-logo-img">
                  <p>{{this.$store.state.userName}}</p>
                </button>
                <Nav v-if="showNav"/>
            </div>
        </header>

        <main>
            <MainContent />
        </main>

        <footer>
            <div>
                <p class="footer-text">
                  © <a href="https://new.effor.by/home">Интеллект Онлайн, </a> 2014-2017
                </p>
            </div>

            <button class="about-button" v-on:click="showAboutInfo">
                <div class="about-logo">
                    i
                </div>
                <p>
                    О платформе
                </p>
            </button>
        </footer>
    </div>
</template>


<script>
import About from '../components/About.vue';
import MainContent from '../components/MainContent.vue';
import Nav from '../components/Nav.vue';

export default {
    components: {
        About,
        MainContent,
        Nav,
    },
    data() {
        return {
            showModal: false,
            showNav: false,
        }
    },
    methods: {
        showAboutInfo(e) {
            this.showModal = true;
            e.stopPropagation();
        },
        showNavComponent(e) {
            this.showNav = !this.showNav;
            console.log(this.showNav);
            e.stopPropagation();
        },
        hideShowedComponents() {
            this.showNav = false;
            this.showModal = false;
        }
    }
}
</script>

<style scoped>

.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: Philosopher, sans-serif;
    color: #898887;
}

header, main, footer {
    width: 100%;
    display: flex;
}

header {
    flex-direction: row;
    height: 73px;
    border-bottom: 1px black solid;
    justify-content: space-between;
    align-items: center;
    background: url('../assets/header_background.jpg') center bottom;
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
    font-family: Philosopher, sans-serif;
    font-size: 20px;
    font-weight: 700;
    background: none;
    border: 0;
}

.user-info-button > p {
    margin: 6px;
}

.nav-container {
    position: absolute;
    right: 0;
    border-radius: 3px;
    border: 1px black solid;
    top: 55px;
    width: 170px;
    height: 320px;
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
    height: 690px;
    background: url('../assets/main_background.jpg');
    overflow: scroll;
}

footer {
    border-top: 1px black solid;
    height: 35px;
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
    margin-right: 10px;
    display: flex;
    flex-direction: row;
    width: 150px;
    justify-content: space-around;
    align-items: center;
    font-family: Philosopher, sans-serif;
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

.about-logo {
    height: 20px;
    width: 20px;
    margin-top: 1px;
    margin-right: 3px;
    float: left;
    border-radius: 100%;
    border: 1px solid #898887;
    text-align: center;
    font-weight: normal;
    font-size: 120%;
}

.footer-text > a{
    text-decoration: none;
    color: #898887;
}

</style>