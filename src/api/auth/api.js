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

//=======================USERS API=======================

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
//Edit user
export const editUser = (id, username, fullName, avatar, role) => api.post('/update-infor', {
  id, username, fullName, avatar, role
})




//=======================CATEGORY API=======================
//All Category
export const getAllCategory = () => api.get('/category/public/find-all-list')
//Create Category
export const createCategory = (name, image, categoryType) => api.post('/category/admin/saveOrUpdate', {
  name, image, categoryType
})
// Edit Category
export const editCategory = (id, name, image, categoryType) => api.post('/category/admin/saveOrUpdate', {
  id, name, image, categoryType
})
// Delete Category
export const deleteCategory = (id) => api.delete(`/category/admin/delete?id=${id}`)


//=======================POSTS API=======================

//For Admin
export const getAllPost = (pageNum) => api.get(`/blog/blog-manager/find-all?page=${pageNum}&size=5`)

export const createPost = (title, description, image, content, linkFiles, listCategoryId) => api.post('/blog/all/save', {
  title, description, image, content, linkFiles, listCategoryId
})
export const activePost = (postId) => api.post(`blog/blog-manager/active-or-unacative?blogId=${postId}`)
// For User
export const getAllPostPublic = (pageNum) => api.get(`/blog/public/get-all-blog?page=${pageNum}&size=3`)

// Get post by Id
export const getPostById = (id) => api.get(`/blog/all/get-blog-by-id?id=${id}`)

//Comment
// Get cmt
export const getCommentById = (id) => api.get(`comment/public/find-by-blog?blogId=${id}`)
// Write cmt
export const commentPost = (content, blogId) => api.post('/comment/all/save', { content, blogId })
//Get post for user
export const getPostByUser = (userId) => api.get(`blog/all/get-blog-by-user?userId=${userId}`)
