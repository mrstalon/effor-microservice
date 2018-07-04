<template>
        <div class="capabilities-container">
            <div>
                <span class="headline-span">
                    Актуальность онлайн-обучения
                </span>
                <span>
                    Домашние компьютеры и личные мобильный устройства – это повседневная действительность. Запрещать нашим детям пользоваться ими бесполезно.
                </span>
            </div>
            <span class="headline-span">Если что-то не можешь остановить – значит нужно это возглавить!</span>
            <div>
                <span class="headline-span">EFFOR.BY</span>
                <span>– отличная возможность включить в учебный процесс компьютеры, планшеты и смартфоны учащихся, повысить за счет этого его эффективность.</span>
            </div>
            <img src="../../../../assets/about-effor-picture.png">
            <div>
                <span class="headline-span">Учебные возможности</span>
                <ul>
                    <li>диагностика пробелов в знаниях по пройденному учебному материалу;</li>
                    <li>устранение пробелов в знаниях по индивидуальной программе;</li>
                    <li>умный учебный тренинг для максимального результата с минимальными усилиями;</li>
                    <li>тренинг интеллектуальных способностей, развитие логики, памяти, внимания;</li>
                    <li>тематические проверочные работы для мониторинга прочности усвоения;</li>
                    <li>блиц-опросы для оперативной оценки результатов усвоения новой темы на уроке;</li>
                    <li>дополнительные онлайн-курсы для самоподготовки по разным направлениям;</li>
                    <li>индивидуальная карта знаний как обобщенная картина качественных результатов обучения.</li>
                </ul>
            </div>
            <span class="headline-span">Соревновательные возможности</span>
            <img src="../../../../assets/about-effor-picture_02.png">
            <ul>
                <li>соревнования между учениками класса, которые проводит педагог;</li>
                <li>предметные, познавательные и развивающие викторины школы;</li>
                <li>мобильный смарт-марафон, в котором участвуют школы страны;</li>
                <li>соревнования между командами друзей из разных школ;</li>
                <li>соревнования между семейными командами;</li>
                <li>интеллектуальные битвы игровых кланов и альянсов;</li>
                <li>специализированные открытые и закрытые спонсорские турниры.</li>
            </ul>
            <span class="headline-span">Видео об EFFOR.BY</span>
            <iframe src="https://www.youtube.com/embed/BqCq_WrU4wM"
            allowfullscreen
            frameborder="0"
            allow="autoplay; encrypted-media"
            width="600"
            height="400"
            >
            </iframe>
            <education-models-info />
            <tournament-models-info />
        </div>
</template>

<script>
import EducationModelsInfo from './capabilities/EducationModelsInfo.vue';
import TournamentModelsInfo from './capabilities/TournamentModelsInfo.vue';

export default {
    components: {
        EducationModelsInfo,
        TournamentModelsInfo,
    },
}
</script>

<style scoped>

.capabilities-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.headline-span {
    font-weight: bold;
    color: #ff8d00;
}

.capabilities-container > :first-child {
    display: flex;
    flex-direction: column;
}

.capabilities-container > :nth-child(3) {
    margin-top: 20px;
}

.capabilities-container > :nth-child(4) {
    margin-top: 20px;
    width: 600px;
}

.capabilities-container > :nth-child(5) {
    margin-top: 20px;
}

.capabilities-container > :nth-child(5) > ul {
    line-height: 1.5em;
    margin: 0;
    padding-left: 1.9%;
}

.capabilities-container > :nth-child(6) {
    margin-top: 20px;
}

.capabilities-container > :nth-child(7) {
    width: 463px;
    margin-top: 20px;
}

.capabilities-container > :nth-child(8) {
    line-height: 1.5em;
    margin-top: 20px;
    padding-left: 1.9%;
}

.capabilities-container > :nth-child(10) {
    width: 600px;
    height: 400px;
}

@media (max-width: 650px) {
    .capabilities-container > :nth-child(4) {
        margin-top: 20px;
        width: 500px;
    }

    .capabilities-container > :nth-child(10) {
        width: 500px;
        height: 350px;
    }
}

@media (max-width: 600px) {
    .capabilities-container > :nth-child(4) {
        margin-top: 20px;
        width: 400px;
    }

    .capabilities-container > :nth-child(10) {
        width: 400px;
        height: 300px;
    }
}

@media (max-width: 550px) {
    .capabilities-container > :nth-child(4) {
        margin-top: 20px;
        width: 300px;
    }

    .capabilities-container > :nth-child(7) {
        width: 320px;
        margin-top: 20px;
    }

    .capabilities-container > :nth-child(10) {
        width: 350px;
        height: 250px;
    }
}

@media (max-width: 500px) {
    .capabilities-container > :nth-child(10) {
        width: 300px;
        height: 200px;
    }
}
</style>
