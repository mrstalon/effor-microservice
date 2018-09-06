import HTTP from '../../../http-config/index';

const CHANGE_FIRST_USER_NAME = 'CHANGE_FIRST_USER_NAME';
const CHANGE_SECOND_USER_NAME = 'CHANGE_SECOND_USER_NAME';
const CHANGE_USER_ROLE = 'CHANGE_USER_ROLE';
const CHANGE_AVATAR_PATH = 'CHANGE_AVATAR_PATH';
const CHANGE_IS_MONITORING = 'CHANGE_IS_MONITORING';


const state = {
    firstUserName: 'Безымянный',
    secondUserName: null,
    userRole: 'header',
    avatar: null,
    isMonitoring: false,
};

const mutations = {
    [CHANGE_FIRST_USER_NAME](state, newUserName) {
        state.firstUserName = newUserName;
    },
    [CHANGE_SECOND_USER_NAME](state, newUserName) {
        state.secondUserName = newUserName;
    },
    [CHANGE_USER_ROLE](state, newUserRole) {
        state.userRole = newUserRole;
    },
    [CHANGE_AVATAR_PATH](state, newPath) {
        state.avatar = newPath;
    },
    [CHANGE_IS_MONITORING](state, boolean) {
        state.isMonitoring = boolean;
    },
};

const actions = {
    getUserInfo({ commit }) {
        HTTP.get('userinfo')
            .then((response) => {
                console.log(response);
                commit('CHANGE_FIRST_USER_NAME', response.data.firstName);
                commit('CHANGE_SECOND_USER_NAME', response.data.lastName);
                commit('CHANGE_USER_ROLE', response.data.role);
                commit('CHANGE_AVATAR_PATH', response.data.avatar);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};

export default {
    state,
    mutations,
    actions,
};
