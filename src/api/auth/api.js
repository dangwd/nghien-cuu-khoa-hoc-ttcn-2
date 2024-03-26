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


//Dang nhap
export const login = (username, password) => api.post('api/login', {
  username, password
})
//Đăng ký tài khoản
export const signup = (username, password, fullName) => api.post('/regis', {
  username, password, fullName
})
//All user
export const getAllUser = () => api.get('/admin/all-user')


//All Category
export const getAllCategory = () => api.get('/category/public/find-all-list')
//Create Category
export const createCategory = (name, image, categoryType) => api.post('/category/admin/saveOrUpdate', {
  name, image, categoryType
})
export const editCategory = (id, name, image, categoryType) => api.post('/category/admin/saveOrUpdate', {
  id, name, image, categoryType
})
export const deleteCategory = (id) => api.delete(`http://localhost:8083/api/category/admin/delete?id=${id}`)