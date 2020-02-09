import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

/**
 * this file is our storage unit, it is vuex you know
 * */

export const CONTACTS_PER_PAGE = 4; // number of contacts per page for a pagination

export const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            paths: ['user'],
        })
    ],

    state: {
        user: null
    },
    getters: {
        getApiToken: state => {
            if (state.user === null)
                return null;
            return state.user.token;
        },
        isAuthenticated: state => {
            if (state.user === null)
                return null;
            return !(state.user.token === null);
        },
        getUser: state => {
            return state.user;
        },
        getRole: state => {
            if (state.user == null)
                return null;

            return state.user.role.name;
        }
    },
    mutations: {
        resetUser: (state) => {
            state.user = null;
        },
        setUser: (state, payload) => {
            state.user = payload;
        }
    },
    actions: {
        setUser: ({commit}, payload) => {
            commit('setUser', payload);
        },
        resetUser: ({commit}) => {
            commit("resetUser");
        }
    },
    modules: {
    }
});