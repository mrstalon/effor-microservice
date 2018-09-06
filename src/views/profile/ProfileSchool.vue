<template>
    <div class="profile-school-container">
        <fieldset disabled="disabled" class="school-info-container">
            <legend>Школа</legend>
            <div>
                <p>{{$store.state.profileModule.school.name}}</p>
                <div class="checkbox-container">
                    <img
                        @click="changeIsSchoolNeedsToBeRemoved()"
                        src="../../assets/checkbox-icon-active.png"
                        v-if="isSchoolNeedsToBeRemoved"
                    >
                    <img
                        @click="changeIsSchoolNeedsToBeRemoved()"
                        src="../../assets/checkbox-icon.png"
                        v-if="!isSchoolNeedsToBeRemoved"
                    >
                    <label for="remove-school">Отключить школу</label>
                </div>
            </div>
        </fieldset>
        <div>
            <p>Размер шрифта в заданиях</p>
            <select class="font-size-select" v-model="fontSize">
                <option value="Маленький">Маленький</option>
                <option value="Средний">Средний</option>
                <option value="Большой">Большой</option>
            </select>
        </div>
        <button @click="approveProfileChanges()">
            Изменить
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSchoolNeedsToBeRemoved: false,
            fontSize: this.$store.state.profileModule.fontSize,
        }
    },
    methods: {
        changeIsSchoolNeedsToBeRemoved() {
            this.isSchoolNeedsToBeRemoved = !this.isSchoolNeedsToBeRemoved;
        },
        approveProfileChanges() {
            this.$store.commit('CHANGE_FONT_SIZE', this.fontSize);
            this.$store.commit('CHANGE_SCHOOL_INFO', this.isSchoolNeedsToBeRemoved);
            this.$store.dispatch('sendProfileSchoolData');
        },
    }
}
</script>

<style scoped>

.profile-school-container {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3px;
    margin: 0 auto;
    height: fit-content;
    margin-bottom: 20px;
    color: #333;
}

.school-info-container {
    margin-top: 15px;
    min-width: 250px;
    height: 100px;
}

.school-info-container > div > p {
    margin-top: 0px;
}

.school-info-container > div > input {
    width: 15px;
    height: 15px;
}

.checkbox-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.checkbox-container > label {
    margin-left: 5px;
}

.checkbox-container > img {
    width: 20px;
    height: 20px;
}

.font-size-select {
    outline: none;
    height: 30px;
    width: 150px;
    font-size: 15px;
    margin-left: 30px;
}

button {
    padding: 3px 15px;
    border: 0;
    background-color: #898887;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    font-size: 100%;
    margin-top: 0px;
    width: 160px;
    height: 30px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    font-family: 'Open Sans', sans-serif;
    margin-top: 20px;
}

button:hover {
    background-color:#ff8d00 !important;
}

@media (max-width: 400px) {
    .font-size-select {
        margin-left: 20px;
    }
}

</style>
