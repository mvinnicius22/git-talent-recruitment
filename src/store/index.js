import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
    clientId: localStorage.getItem('clientId') || null,
    clientSecret: localStorage.getItem('clientSecret') || null,
    personalAccessToken: localStorage.getItem('personalAccessToken') || null,
}

const getters = {
    hasToken: (state, getters) => {
        return state.personalAccessToken ? true : false;
    },

    getCredentials: (state, getters) => {
        return state;
    },
}

const actions = {
    login({commit}, options) {
        commit('SET_LOGGED_USER', {clientId : options.clientId, clientSecret: options.clientSecret, personalAccessToken: options.personalAccessToken});
    },
    logout({commit}) {
        commit('LOGOUT_USER');
    },
}

const mutations = {
    SET_LOGGED_USER (state, { clientId, clientSecret, personalAccessToken }) {
        state.clientId = clientId
        state.clientSecret = clientSecret
        state.personalAccessToken = personalAccessToken
    },
    LOGOUT_USER (state) {
        state.clientId = null
        state.clientSecret = null
        state.personalAccessToken = null
    }
}

export default new Vuex.Store({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
})
