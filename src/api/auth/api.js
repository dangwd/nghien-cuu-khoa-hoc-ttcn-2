import store from "@/store";
import axios from "axios"


const api = axios.create({
  baseURL: 'http://localhost:8083/api',
});

api.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;


//Đăng nhập
// export const login = (username, password) => api.post('api/login', {
//   username, password
// })
//Đăng ký tài khoản
export const signup = (username, password, fullName) => api.post('api/regis', {
  username, password, fullName
})