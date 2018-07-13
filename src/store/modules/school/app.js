import HTTP from '../../../http-config/index';

const CHANGE_USER_NAME = 'CHANGE_USER_NAME';
const CHANGE_USER_ROLE = 'CHANGE_USER_ROLE';
const CHANGE_AVATAR_PATH = 'CHANGE_AVATAR_PATH';


const state = {
    userName: null,
    userRole: null,
    avatar: null,
};

const mutations = {
    [CHANGE_USER_NAME](state, newUserName) {
        state.userName = newUserName;
    },
    [CHANGE_USER_ROLE](state, newUserRole) {
        state.userRole = newUserRole;
    },
    [CHANGE_AVATAR_PATH](state, newPath) {
        state.avatar = newPath;
    },
};

const actions = {
    getUserInfo({ commit }) {
        HTTP.get('userinfo')
            .then((response) => {
                console.log(response);
                commit('CHANGE_USER_NAME', response.data.firstName);
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
