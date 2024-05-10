import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import api, { getPostById } from '../api/auth/api';
import { getPostByCateId } from '../api/auth/api';
export default createStore({
  plugins: [createPersistedState()],

  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    postData: [],
    postTopTier: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPostData(state, data) {
      state.postData = data
    },
    setPostTopTier(state, data) {
      state.postTopTier = data
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
    async fetchPostByCateId({ commit }, id) {
      try {
        const res = await getPostByCateId(id)
        commit('setPostData', res)
      } catch (err) {
        console.error(err)
      }
    },
    async fetchPostTopTierById({ commit }, id) {
      try {
        const res = await getPostById(id)
        commit('setPostTopTier', res)
      } catch (err) {
        console.error(err)
      }
    }
  },
});
