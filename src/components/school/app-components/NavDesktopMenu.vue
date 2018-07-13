<template>
    <div class="nav-container-desktop" @click="preventBubling">
        <a :href="makeFullHref('teacher/useredit')">
            <div>
                <img src="../../../assets/profile-icon.png" alt="Could not load an image">
            </div>
            <span>Профиль</span>
        </a>
        <a :href="makeFullHref('teacher/schoolsetting')">
            <div>
                <img src="../../../assets/school-monitoring-icon.png" alt="Could not load an image">
            </div>
            <span>Школа</span>
        </a>
        <a :href="makeFullHref('teacher/controlwork')">
            <div>
                <img src="../../../assets/school-monitoring-icon.png" alt="Could not load an image">
            </div>
            <span>Мониторинг</span>
        </a>
        <a :href="makeFullHref('teacher/cabinetteacherpupil')">
            <div>
                <img src="../../../assets/pupils-icon.png" alt="Could not load an image">
            </div>
            <span>Ученики</span>
        </a>
        <a :href="makeFullHref('teacher/cabinetteachermaterial')">
            <div>
                <img src="../../../assets/materials-icon.png" alt="Could not load an image">
            </div>
            <span>Материалы</span>
        </a>
        <a :href="makeFullHref('teacher/license')">
            <div>
                <img src="../../../assets/license-icon.png" alt="Could not load an image">
            </div>
            <span>Лицензия</span>
        </a>
        <a :href="makeFullHref('teacher/totourney')">
            <div>
                <img src="../../../assets/tournament-icon.png" alt="Could not load an image">
            </div>
            <span>Турниры</span>
        </a>
        <a :href="url">
            <div>
                <img src="../../../assets/logout-icon.png" alt="Could not load an image">
        </div>
        <span>Выход</span>
        </a>
    </div>
</template>


<script>
import HTTPconfig from '../../../http-config/redirect-config';

export default {
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        makeFullHref(href) {
            return this.url + '/' + href;
        },
    },
    data() {
        return {
            url: HTTPconfig.url,
        };
    },
}
</script>

<style scoped>

.nav-container-desktop {
    width: 180px;
    display: flex;
    z-index: 100;
    flex-direction: column;
}

.nav-container-desktop > a {
    display: flex;
    flex-direction: row;
    margin-left: 5px;
    align-items: center;
    text-decoration: none;
    font-family: 'Open Sans', sans-serif;
    color: #898887;
    height: 12.5%;
    margin-left: 10px;
    margin-top: 2px;
}

.nav-container-desktop > a:first-child {
    margin-top: 5px;
}

.nav-container-desktop > a > div {
    height: 32px;
    width: 32px;
    margin: -5px 5px 0 0;
    float: left;
    border-radius: 100%;
    border: 2px solid #898887;
}

.nav-container-desktop > a > div > img {
    margin-top: 6px;
    width: 16px;
    height: 16px;
    margin-left: 8px;
}

/* .nav-container-desktop > a:hover {
    color: #ff8d00;
} */

.nav-container-desktop > a:hover div {
    background-color: #ff8d00;
}

.nav-container-desktop > a:hover span {
    color: #ff8d00;
}

.nav-container-desktop > a:first-child > div > img {
    width: 19px;
    margin-left: 7px;
    margin-top: 7px;
}

.nav-container-desktop > a:nth-child(2) > div > img {
    width: 19px;
    margin-left: 7px;
}

.nav-container-desktop > a:nth-child(3) > div > img {
    width: 19px;
    margin-left: 7px;
}

.nav-container-desktop > a:nth-child(4) > div > img {
    height: 23px;
    margin-left: 7px;
    margin-top: 3px;
}

.nav-container-desktop > a:nth-child(5) > div > img {
    width: 23px;
    margin-left: 5px;
    margin-top: 6px;
}

.nav-container-desktop > a:nth-child(6) > div > img {
    margin-top: 8px;
}

.nav-container-desktop > a:nth-child(7) > div > img {
    margin-top: 8px;
}

.nav-container-desktop > a > span {
    text-align: center;
    font-weight: normal;
    font-size: 120%;
    margin-bottom: 3px;
    font-weight: bold;
    margin-left: 3px;
}

</style>