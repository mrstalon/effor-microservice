const CHANGE_USER_AVATAR = 'CHANGE_USER_AVATAR';
const CHANGE_USER_LOGIN = 'CHANGE_USER_LOGIN';
const CHANGE_EMAIL_LOGIN = 'CHANGE_EMAIL_LOGIN';
const CHANGE_SUR_NAME = 'CHANGE_SUR_NAME';
const CHANGE_NAME = 'CHANGE_NAME';
const CHANGE_PATRONYMIC = 'CHANGE_PATRONYMIC';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const CHANGE_SCHOOL_INFO = 'CHANGE_SCHOOL_INFO';
const CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE';

const state = {
    userAvatar: null,
    login: 'Безымянный',
    email: 'sobaka_i_kot@mail.ru',
    surName: 'Безымянновый',
    name: 'Безымянная',
    patronymic: 'Безымянновый',
    password: '',
    school: {
        name: 'Тестовая школа №1',
        needsToBeRemoved: false,
    },
    fontSize: 'Средний',
};

const mutations = {
    [CHANGE_USER_AVATAR](state, newAvatar) {
        state.userAvatar = newAvatar;
    },
    [CHANGE_USER_LOGIN](state, newUserLogin) {
        state.login = newUserLogin;
    },
    [CHANGE_EMAIL_LOGIN](state, newEmail) {
        state.email = newEmail;
    },
    [CHANGE_SUR_NAME](state, newSurName) {
        state.surName = newSurName;
    },
    [CHANGE_NAME](state, newName) {
        state.name = newName;
    },
    [CHANGE_PATRONYMIC](state, newPatronymic) {
        state.patronymic = newPatronymic;
    },
    [CHANGE_PASSWORD](state, newPassword) {
        state.password = newPassword;
    },
    [CHANGE_SCHOOL_INFO](state, needsToBeRemoved) {
        state.school.needsToBeRemoved = needsToBeRemoved;
    },
    [CHANGE_FONT_SIZE](state, newFontSize) {
        state.fontSize = newFontSize;
    },
};

const actions = {
    sendProfileSchoolData() {
        console.log('data has been sent');
    },
    sendProfileMainData() {
        console.log('data has been sent');
    },
};

export default {
    state,
    mutations,
    actions,
};
