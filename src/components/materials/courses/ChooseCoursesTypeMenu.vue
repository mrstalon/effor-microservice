<template>
    <transition name="modal" >
        <div class="modal-mask" >
            <div class="modal-wrapper">
                <div class="modal-container" @click="preventBubling">
                    <h1><span>Выбор типа курса</span></h1>
                    <div class="subjects-list-container">
                        <button
                            @click="changeChoosedCourseType(type)"
                            v-for="(type, typeId) in $store.state.coursesModule.coursesTypes"
                            :key="typeId"
                        >
                            {{type.title}}
                        </button>
                    </div>
                    <button @click="$emit('close')" class="close-button" >Закрыть</button>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    methods: {
        preventBubling(e) {
            e.stopPropagation();
        },
        changeChoosedCourseType(newType) {
            this.$store.commit('CHANGE_CHOOSED_COURSE_TYPE', newType);
            this.$store.dispatch('getCoursesArray')
                .then(() => {
                    this.$emit('close');
                });
        },
    }
}
</script>

<style scoped>

.about-info-container {
    width: 300px;
    font-family: 'Open Sans', sans-serif;
    color: #222222;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(187, 187, 187, 0.5);
    display: table;
    transition: opacity .0s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 240px;
    margin: 0px auto;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Open Sans', sans-serif;
}

.modal-container > h1 {
    padding: 10px 30px 10px 10px;
    text-align: left;
    background-color: #ff8d00;
    color: White;
    margin-top: 0px;
    font-size: 16px;
    font-weight: 400;
}

.modal-body {
    margin: 20px 0;
}

.close-button {
    padding: 3px 15px;
    border: 0;
    background-color: #898887;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    font-size: 100%;
    margin-top: 0px;
    width: 160px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    font-family: 'Open Sans', sans-serif;
    margin-left: 120px;
    margin-top: 5px;
}

.close-button:hover {
    background-color: #ff8d00;
}

.subjects-list-container {
    flex-direction: column;
    align-items: center;
    margin: auto;
    overflow: scroll;
    width: 90%;
    margin-top: 10px;
    height: 120px;
    margin-bottom: 5px;
}

.subjects-list-container > button {
    width: 100%;
    height: 50px;
    font-stretch: condensed;
    font-size: 16px;
    color: #b9b8b7;
    background: #fff;
    border: 2px solid #b9b8b7;
    border-radius: 2px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 0;
    text-align: center;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 10px;
}

.subjects-list-container > button:hover {
    color: #ff8d00;
    border-color: #ff8d00;
}

</style>