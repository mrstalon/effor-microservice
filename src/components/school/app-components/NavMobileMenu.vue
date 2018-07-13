<template>
    <div class="nav-container-mobile">
        <h1>{{$store.state.appModule.userName}}</h1>
        <a :href="makeFullHref('teacher/useredit')">
            <div>
                <img src="../../../assets/profile-icon-white.png" alt="Could not load an image">
            </div>
            <span>Профиль</span>
        </a>
        <a :href="makeFullHref('teacher/schoolsetting')" v-if="$store.state.appModule.role === 'header'">
            <div>
                <img src="../../../assets/school-monitoring-icon-white.png" alt="Could not load an image">
            </div>
            <span>Школа</span>
        </a>
        <a :href="makeFullHref('teacher/controlwork')">
            <div>
                <img src="../../../assets/school-monitoring-icon-white.png" alt="Could not load an image">
            </div>
            <span>Мониторинг</span>
        </a>
        <a :href="makeFullHref('teacher/cabinetteacherpupil')">
            <div>
                <img src="../../../assets/pupils-icon-white.png" alt="Could not load an image">
            </div>
            <span>Ученики</span>
        </a>
        <a :href="makeFullHref('teacher/cabinetteachermaterial')">
            <div>
                <img src="../../../assets/materials-icon-white.png" alt="Could not load an image">
            </div>
            <span>Материалы</span>
        </a>
        <a :href="makeFullHref('teacher/license')">
            <div>
                <img src="../../../assets/license-icon-white.png" alt="Could not load an image">
            </div>
            <span>Лицензия</span>
        </a>
        <a :href="makeFullHref('teacher/totourney')">
            <div>
                <img src="../../../assets/tournament-icon-white.png" alt="Could not load an image">
            </div>
            <span>Турниры</span>
        </a>
        <a @click="showNavMenu">
            <i>i</i>
            <span>О платформе</span>
        </a>
        <a :href="url">
            <div>
                <img src="../../../assets/logout-icon-white.png" alt="Could not load an image">
        </div>
        <span>Выход</span>
        </a>
    </div>
</template>


<script>
import HTTPconfig from '../../../http-config/redirect-config';

export default {
    data() {
        return {
            url: HTTPconfig.url,
        };
    },
    methods: {
        showNavMenu(e) {
            this.$emit('showNav');
            e.stopPropagation();
            this.$emit('close');
        },
        makeFullHref(href) {
            return this.url + '/' + href;
        },
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