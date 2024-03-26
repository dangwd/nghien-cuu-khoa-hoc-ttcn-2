import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import api from '../api/auth/api';

export default createStore({
  plugins: [createPersistedState()],

  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/login', credentials);
        const { token, user } = response.data;

        commit('setToken', token);
        commit('setUser', user);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        await api.post('/logout');
        commit('logout');
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },
  },
});
