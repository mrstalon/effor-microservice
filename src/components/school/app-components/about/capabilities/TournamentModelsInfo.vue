<template>
    <div class="education-models-container">
        <span class="headline-span">Модели для онлайн-соревнований</span>
        <div>
            <div @click="showOrHideFirstInfo()">
                <span v-if="!firstInfoShown" class="bold-span">+</span>
                <span v-if="firstInfoShown" class="bold-span">-</span>
                <span class="bold-span">Блицтурнир на уроке</span>
            </div>
            <transition name="slide-fade">
                <div v-if="firstInfoShown" class="first-info-container">
                    <p>Устным фронтальным опросом сложно охватить всех учеников класса. Письменный фронтальный опрос требует много времени на подготовку и проверку. В условиях, когда почти у каждого ученика есть смартфон, перспективным методом оперативного контроля усвоения материала является блиц-опрос на основе онлайн-турниров EFFOR.BY (блицтурнир).</p>
                    <p>В блицтурнир включаются одинаковые для всех задания. Онлайн-подготовка к блицтурниру не нужна. В каталоге EFFOR.BY есть более 500 готовых блицтурниров по разным предметам. На создание своего блицтурнира у учителя уйдет несколько минут.</p>
                    <p>Проведение в конце урока блицтурнира займет не более 3-5 минут вместе с подведением его итогов. При этом блиц турнир выполнит две задачи: создаст соревновательный элемент вокруг контроля знаний и позволит выявить тех учащихся, которые материал усвоили плохо.</p>
                    <p>Блицтурниры более уместны в средних и старших классах, так как в этом возрасте смартфоны учащихся уже как правило подключены к мобильному интернету.</p>
                </div>
            </transition>
        </div>
        <div>
            <div @click="showOrHideSecondInfo()" class="bold-span">
                <span v-if="!secondInfoShown">+</span>
                <span v-if="secondInfoShown">-</span>
                <span>Турнир учебного назначения</span>
            </div>
            <transition name="slide-fade">
                <div v-if="secondInfoShown" class="second-info-container">
                    <p>Эта модель наиболее эффективна, когда учащиеся должны усвоить фиксированный объем знаний или умений. Например, отработать правописание 50 словарных слов, выучить введенные ранее иностранные слова, запомнить набор формул и примеров их применения. В этом случае в учебный турнир включается полный набор заданий для усвоения. Далее учитель на определенное время открывает всем своим ученикам доступ к онлайн-подготовке по этим заданиям. Каждый ученик готовится в своем темпе, отрабатывая повторно только те задания, в которых допустил ошибку.</p>
                    <p>Затем в заранее оговоренное время учитель на уроке проводит итоговый турнир. Каждому ученику из полного набора заданий будет случайно сформирован тест турнира. Результаты, как и для блицтурнира, моментально будут показаны в сводной таблице.</p>
                    <p>Учебный турнир решает уже три задачи: мотивационную, учебную и контрольную. Для проведения итогового турнира можно использовать компьютерный класс. Возможно также и итоговое прохождение учебного турнира дома.</p>
                </div>
            </transition>
        </div>
        <div>
            <div @click="showOrHideThirdInfo()" class="bold-span">
                <span v-if="!thirdInfoShown">+</span>
                <span v-if="thirdInfoShown">-</span>
                <span>Предметные викторины и конкурсы</span>
            </div>
            <transition name="slide-fade">
                <div v-if="thirdInfoShown" class="third-info-container">
                    <p>Школы и гимназии ежегодно проводят предметные недели. Учебные и развивающие онлайн-турниры EFFOR.BY помогут разнообразить эти недели интересными, современными по формату мероприятиями. Очень важно, что подготовка к онлайн-турнирам простая, проведение быстрое и зрелищное, подведение итогов моментальное.</p>
                    <p>Онлайн-турниры предметных недель могут по формату быть и блицтурнирами (без предварительной подготовки) и учебными турнирами (с предварительной подготовкой). Например, на неделе русского языка уместно для каждой параллели сформировать учебные турниры, в которые будут включены избыточные комплекты словарных слов. И за месяц до проведения итоговых турниров по параллелям дать учащимся доступ к онлайн-подготовке.</p>
                </div>
            </transition>
        </div>
        <div>
            <div @click="showOrHideForthInfo()" class="bold-span">
                <span v-if="!forthInfoShown">+</span>
                <span v-if="forthInfoShown">-</span>
                <span>Важные примечания</span>
            </div>
            <transition name="slide-fade">
                <div v-if="forthInfoShown" class="forth-info-container">
                    <p>Смартфоны сегодня есть почти у каждого, а вот к интернету родители своих детей подключать не спешат. Поэтому участие в учебных и развивающих онлайн-турнирах может стать для ребенка отличным аргументом в разговоре с родителями на этот счет.</p>
                    <p>Участие в итоговых блицтурнирах и учебных турнирах для учащихся бесплатное. По желанию семьи может быть оплачен сервис онлайн-подготовки. Но если у ребенка нет проблем с усвоением учебного материала, он может участвовать в турнирах без предварительной подготовки и, соответственно, без оплаты данного сервиса.</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstInfoShown: false,
            secondInfoShown: false,
            thirdInfoShown: false,
            forthInfoShown: false,
        };
    },
    methods: {
        showOrHideFirstInfo() {
            this.firstInfoShown = !this.firstInfoShown;
        },
        showOrHideSecondInfo() {
            this.secondInfoShown = !this.secondInfoShown;
        },
        showOrHideThirdInfo() {
            this.thirdInfoShown = !this.thirdInfoShown;
        },
        showOrHideForthInfo() {
            this.forthInfoShown = !this.forthInfoShown;
        }
    }
}
</script>

<style scoped>

.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

.education-models-container {
    margin-bottom: 40px;
    margin-top: 20px;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
}

.headline-span {
    font-weight: bold;
    color: #ff8d00;
}

.first-info-container > p {
    text-indent: 1.5em;
    margin-top: 5px;
    margin-bottom: 5px;
}

.second-info-container > p {
    text-indent: 1.5em;
    margin-top: 5px;
    margin-bottom: 5px;
}

.third-info-container > p {
    text-indent: 1.5em;
    margin-top: 5px;
    margin-bottom: 5px;
}

.forth-info-container > p {
    text-indent: 1.5em;
    margin-top: 5px;
    margin-bottom: 5px;
}

.bold-span {
    font-weight: bold;
}

.education-models-container > div {
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    -webkit-transition: all 1s ease-in-out;
    cursor: pointer;
}

</style>
