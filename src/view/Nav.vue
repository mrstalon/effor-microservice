<template>
    <div class="nav-container">
                <a href="">
                    <div>
                        <img src="../assets/profile-icon.png" alt="Could not load an image">
                    </div>
                    <span>Профиль</span>
                </a>
                <a href="">
                    <div>
                        <img src="../assets/school-monitoring-icon.png" alt="Could not load an image">
                    </div>
                    <span>Школа</span>
                </a>
                <a href="">
                    <div>
                        <img src="../assets/school-monitoring-icon.png" alt="Could not load an image">
                    </div>
                    <span>Мониторинг</span>
                </a>
                <a href="">
                    <div>
                        <img src="../assets/pupils-icon.png" alt="Could not load an image">
                    </div>
                    <span>Ученики</span>
                </a>
                <a href="">
                    <div>
                        <img src="../assets/materials-icon.png" alt="Could not load an image">
                    </div>
                    <span>Материалы</span>
                </a>
                <a href="">
                    <div>
                        <img src="../assets/license-icon.png" alt="Could not load an image">
                    </div>
                    <span>Лицензия</span>
                </a>
                <a href="">
                    <div>
                        <img src="../assets/tournament-icon.png" alt="Could not load an image">
                    </div>
                    <span>Турниры</span>
                </a>
                <a href="">
                    <div>
                        <img src="../assets/logout-icon.png" alt="Could not load an image">
                </div>
            <span>Выход</span>
        </a>
    </div>
</template>


<script>
import {router} from '../main.js';

export default {
    methods: {
        redirect(url) {
            router.push(url);
        },
    }
}
</script>

<style scoped>

.nav-container {
    display: flex;
    flex-direction: column;
}

.nav-container > a {
    display: flex;
    flex-direction: row;
    margin-left: 5px;
    align-items: center;
    text-decoration: none;
    font-family: Philosopher, sans-serif;
    color: #898887;
    height: 12.5%;
    margin-left: 10px;
    margin-top: 2px;
}

.nav-container > a:first-child {
    margin-top: 5px;
}

.nav-container > a > div {
    height: 32px;
    width: 32px;
    margin: -5px 5px 0 0;
    float: left;
    border-radius: 100%;
    border: 2px solid #898887;
}

.nav-container > a > div > img {
    margin-top: 6px;
    width: 16px;
    height: 16px;
    margin-left: 8px;
}

.nav-container > a:hover {
    color: #ff8d00;
}

.nav-container > a > div:hover {
    background-color: #ff8d00;
}

.nav-container > a > span:hover {
    color: #ff8d00;
}

.nav-container > a:first-child > div > img {
    width: 19px;
    margin-left: 7px;
    margin-top: 7px;
}

.nav-container > a:nth-child(2) > div > img {
    width: 19px;
    margin-left: 7px;
}

.nav-container > a:nth-child(3) > div > img {
    width: 19px;
    margin-left: 7px;
}

.nav-container > a:nth-child(4) > div > img {
    height: 23px;
    margin-left: 7px;
    margin-top: 3px;
}

.nav-container > a:nth-child(5) > div > img {
    width: 23px;
    margin-left: 5px;
    margin-top: 6px;
}

.nav-container > a:nth-child(6) > div > img {
    margin-top: 8px;
}

.nav-container > a:nth-child(7) > div > img {
    margin-top: 8px;
}

.nav-container > a > span {
    text-align: center;
    font-weight: normal;
    font-size: 120%;
    margin-bottom: 3px;
    font-weight: bold;
    margin-left: 3px;
}

</style>