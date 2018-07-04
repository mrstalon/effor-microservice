<template>
    <div class="education-models-container">
        <span class="headline-span">Модели для онлайн-обучения</span>
        <div>
            <div @click="showOrHideFirstInfo()">
                <span v-if="!firstInfoShown" class="bold-span">+</span>
                <span v-if="firstInfoShown" class="bold-span">-</span>
                <span class="bold-span">Общая информация</span>
            </div>
            <transition name="slide-fade">
                <div v-if="firstInfoShown" class="first-info-container">
                    <p>База заданий EFFOR.BY содержит более 100 тыс. учебных заданий по белорусскому и русскому языкам, математике, физике, химии, информатике. Есть большое число заданий на развитие интеллектуальных способностей, на формирование читательской, математической и естественно-научной грамотности.</p>
                    <p>Учитель получает бесплатный доступ к базе заданий EFFOR.BY, может составлять из заданий собственные проверочные работы и назначать их ученикам своих классов. Он может распечатать работу, превратив ее в раздаточный материал для урока.</p>
                </div>
            </transition>
        </div>
        <div>
            <div @click="showOrHideSecondInfo()" class="bold-span">
                <span v-if="!secondInfoShown">+</span>
                <span v-if="secondInfoShown">-</span>
                <span>Мониторинг усвоения материала</span>
            </div>
            <transition name="slide-fade">
                <div v-if="secondInfoShown" class="second-info-container">
                    <p>Промежуточный, тематический и итоговый контроль усвоения учащимися класса учебного материала – затратная по времени и непростая по содержанию задача. А если целью является не только количественный результат контроля, но и качественный, то без современных ИКТ ее реализовать практически невозможно. С помощью проверочных онлайн-работ EFFOR.BY учитель может решать ее достаточно просто.</p>
                    <p>Из предметной базы заданий учитель простыми и удобными инструментами формирует контрольную онлайн-работу, включая в нее нужные темы (серии заданий). Затем назначает своим классам время ее выполнения. В результате он получает индивидуальные и групповую карту пробелов в знаниях учащихся класса. Учащиеся после выполнения такой работы могут в режиме онлайн отработать те темы, по которым они допустили ошибки.</p>
                    <p>Проводить контрольную онлайн-работу можно либо в компьютерном классе, либо давать ее учащимся на дом. Понятно, что во втором случае ценность полученных результатов ниже.</p>
                </div>
            </transition>
        </div>
        <div>
            <div @click="showOrHideThirdInfo()" class="bold-span">
                <span v-if="!thirdInfoShown">+</span>
                <span v-if="thirdInfoShown">-</span>
                <span>Отработка базовых знаний и умений</span>
            </div>
            <transition name="slide-fade">
                <div v-if="thirdInfoShown" class="third-info-container">
                    <p>В каждом предмете можно выделить наиболее значимые знания и умения. Некоторые из них влияют на успешность усвоения всего учебного материала (например, без хороших вычислительных навыков сложно будет на любом уроке математики). Другие чаще всего используются при выставлении отметок по предмету (например, в русском языке постоянные ошибки правописания будут негативно влиять на итоговую успеваемость).</p>
                    <p>Онлайн-работы EFFOR.BY позволяют организовать интенсивную отработку таких знаний и умений. При этом каждый ученик будет заниматься по индивидуальной программе, отрабатывая только тот материал, где у него есть реальные проблемы.</p>
                    <p>Формирование тренировочных онлайн-работ выполняется также, как и контрольных. Точно также они назначаются всем учащимся. Но перед итоговым выполнение такой работы каждый ученик может к ней подготовиться в своем темпе по собственной программе. Выполнять итоговую работу ученики могут дома. Учитель всегда сможет сравнить результаты итоговое выполнения и накопленные в ходе подготовки результаты усвоения всех тем, включенных в такую работу.</p>
                </div>
            </transition>
        </div>
        <div>
            <div @click="showOrHideForthInfo()" class="bold-span">
                <span v-if="!forthInfoShown">+</span>
                <span v-if="forthInfoShown">-</span>
                <span>Домашнее онлайн-задание</span>
            </div>
            <transition name="slide-fade">
                <div v-if="forthInfoShown" class="forth-info-container">
                    <p>По формату данная модель не отличается от предыдущей. Только в тренировочную работу отбираются задания по последней пройденной теме. В остальном модель подготовки к работе, ее выполнения и анализа результатов те же самые.</p>
                    <p>Практика показывает, что домашние онлайн-задания серьезно повышают уровень их выполнения учащимися, снижают процент списывания. Домашние задания становятся «умными» за счет того, что каждый ученик выполняет его по сути в индивидуальном режиме.</p>
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
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.education-models-container {
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
