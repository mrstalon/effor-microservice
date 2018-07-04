<template>
    <div class="nav-container-mobile">
        <h1>{{$store.state.appModule.userName}}</h1>
        <a href="">
            <div>
                <img src="../../../assets/profile-icon-white.png" alt="Could not load an image">
            </div>
            <span>Профиль</span>
        </a>
        <a href="http://192.168.1.38:8080/school">
            <div>
                <img src="../../../assets/school-monitoring-icon-white.png" alt="Could not load an image">
            </div>
            <span>Школа</span>
        </a>
        <a href="">
            <div>
                <img src="../../../assets/school-monitoring-icon-white.png" alt="Could not load an image">
            </div>
            <span>Мониторинг</span>
        </a>
        <a href="">
            <div>
                <img src="../../../assets/pupils-icon-white.png" alt="Could not load an image">
            </div>
            <span>Ученики</span>
        </a>
        <a href="http://192.168.1.38:8080/materials">
            <div>
                <img src="../../../assets/materials-icon-white.png" alt="Could not load an image">
            </div>
            <span>Материалы</span>
        </a>
        <a href="">
            <div>
                <img src="../../../assets/license-icon-white.png" alt="Could not load an image">
            </div>
            <span>Лицензия</span>
        </a>
        <a href="">
            <div>
                <img src="../../../assets/tournament-icon-white.png" alt="Could not load an image">
            </div>
            <span>Турниры</span>
        </a>
        <a @click="showNavMenu">
            <i>i</i>
            <span>О платформе</span>
        </a>
        <a href="">
            <div>
                <img src="../../../assets/logout-icon-white.png" alt="Could not load an image">
        </div>
        <span>Выход</span>
        </a>
    </div>
</template>


<script>

export default {
    data() {
        return {

        };
    },
    methods: {
        showNavMenu(e) {
            this.$emit('showNav');
            e.stopPropagation();
            this.$emit('close');
        }
    }
}

</script>

<style scoped>

.nav-container-mobile {
    width: 100%;
    display: flex;
    z-index: 100;
    flex-direction: column;
    top: 45;
    height: 476px;
    opacity: 0.9;
}

.nav-container-mobile > * {
    width: 100%;
}

.nav-container-mobile > h1 {
    margin-top: 0;
    margin-bottom: 0;
    display: block;
    padding: 10px 10px;
    text-align: left;
    color: #ffffff;
    background-color: #3f3f3f;
    font-size: 19px !important;
    height: 30px;
    opacity: 2;
}

.nav-container-mobile > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 10px;
    text-align: left;
    color: #ffffff;
    background-color: rgb(133, 133, 133);
    text-decoration: none;
}

.nav-container-mobile > a:hover {
    background-color: #ff8d00;
}

.nav-container-mobile > a > span {
    margin-left: 15px;
    font-size: 17px !important;
    font-weight: bold;
}

i {
    font-size: 23px;
}

</style>