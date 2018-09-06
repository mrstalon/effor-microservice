<template>
    <div class="profile-main-container">
        <div class="avatar-container">
            <img
                :src="$store.state.appModule.avatar"
                class="avatar-logo-img"
                v-if="$store.state.appModule.avatar && !userAvatarChanged"
            >
            <img
                src="../../assets/avatar_default.png"
                v-if="!$store.state.appModule.avatar && !userAvatarChanged"
                class="avatar-logo-img"
            >
            <img id="uploadPreview" v-if="userAvatarChanged">
        </div>
        <form>
            <input type="file" id="uploadImage" @change="changeChoosedFile">
        </form>
        <div class="info-container">
            <div class="profile-item">
                <label for="">Логин:</label>
                <input type="text" v-model="login">
                <h4 class="error-message">{{errorsArray[0]}}</h4>
            </div>
            <div class="profile-item">
                <label for="">E-mail:</label>
                <input type="text" v-model="email">
                <h4 class="error-message">{{errorsArray[1]}}</h4>
            </div>
            <div class="profile-item">
                <label for="">Фамилия:</label>
                <input type="text" v-model="surName">
                <h4 class="error-message">{{errorsArray[2]}}</h4>
            </div>
            <div class="profile-item">
                <label for="">Имя:</label>
                <input type="text" v-model="name">
                <h4 class="error-message">{{errorsArray[3]}}</h4>
            </div>
            <div class="profile-item">
                <label for="">Отчество:</label>
                <input type="text" v-model="patronymic">
                <h4 class="error-message">{{errorsArray[4]}}</h4>
            </div>
            <div class="profile-item">
                <label for="">Новый пароль:</label>
                <input type="password" v-model="password">
                <h4 class="error-message">{{errorsArray[5]}}</h4>
            </div>
            <div class="profile-item">
                <label for="">Новый пароль:</label>
                <input type="password" v-model="confirmPassword">
                <h4 class="error-message">{{errorsArray[6]}}</h4>
            </div>
        </div>
        <button @click="validateData()">
            Изменить
        </button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            userAvatarChanged: false,
            login: this.$store.state.profileModule.login,
            email: this.$store.state.profileModule.email,
            surName: this.$store.state.profileModule.surName,
            name: this.$store.state.profileModule.name,
            patronymic: this.$store.state.profileModule.patronymic,
            password: '',
            confirmPassword: '',
            errorsArray: ['', '', '', '', '', '', ''],
        };
    },
    methods: {
        changeChoosedFile(event) {
            if (event.target.files.length === 0) {
                this.userAvatarChanged = false;
                return;
            }

            var oFReader = new FileReader();
            oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

            oFReader.onload = function (oFREvent) {
                document.getElementById("uploadPreview").src = oFREvent.target.result;
            };

            this.userAvatarChanged = true;
        },
        validateData() {
            this.validatePassword();

            this.$store.dispatch('sendProfileMainData');
        },
        generateError(errorMessage, errorPosition) {
            this.$set(this.errorsArray, errorPosition, errorMessage);
            console.log(this.errorsArray);
            setTimeout(() => {
                this.$set(this.errorsArray, errorPosition, '');
            }, 5000);
        },
        validatePassword() {
            if (this.password === '' && this.confirmPassword.length > 0) {
                this.generateError('Подтвердите пароль', 5);
                return;
            }

            if (this.password.length > 0 && this.confirmPassword === '') {
                this.generateError('Подтвердите пароль', 6);
                return;
            }

            if (this.password !== this.confirmPassword) {
                this.generateError('Пароли не совпадают', 5);
                this.generateError('Пароли не совпадают', 6);
                return;
            }
        },
    },
    watch: {
        login() {
            this.$store.commit('CHANGE_USER_LOGIN', this.login);
        },
        email() {
            this.$store.commit('CHANGE_EMAIL_LOGIN', this.email);
        },
        surName() {
            this.$store.commit('CHANGE_SUR_NAME', this.surName);
        },
        name() {
            this.$store.commit('CHANGE_NAME', this.name);
        },
        patronymic() {
            this.$store.commit('CHANGE_PATRONYMIC', this.patronymic);
        },

    }
}

</script>

<style scoped>

.profile-main-container {
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
}

button:hover {
    background-color:#ff8d00 !important;
}

.avatar-container {
    margin-top: 30px;
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
}

.avatar-container > img {
    width: 100%;
    height: 100%;
}

#uploadImage {
    margin-left: 150px;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    margin-top: 10px;
}

#uploadPreview {
    width: 100px;
    height: 100px;
}

.profile-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 20px;
}

.profile-item > input {
    width: 230px;
    height: 30px;
    font-size: 16px;
    border: 1px solid #333;
    border-radius: 2px;
    padding-left: 5px;
}

.error-message {
    color: red;
    margin-top: 5px;
    margin-bottom: 0px;
}

@media (max-width: 400px) {
    #uploadImage {
        margin-left: 30px;
    }
}

</style>
