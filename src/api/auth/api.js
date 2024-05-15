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
//Edit user
export const editUser = (id, username, fullName, avatar, password) => api.post('/update-infor', {
  id, username, fullName, avatar, password
})

export const sendPostApi = (url, data) => api.post(url, { data })

export const sendGetApi = (url) => api.get(url)

export const sendDeleteApi = (url) => api.delete(url)

export const sendPutApi = (url, data) => api.put(url, { data })
//=======================CATEGORY API=======================
//Top Category
export const getTopCategory = () => api.get('/category/public/get-Top5-category?size=5')
//Create Category
export const getAllCategory = (page, query) => api.get(`/category/public/get-all-and-search-category?name=${query ? query : ""}&page=${page}&size=10`)
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
export const getAllPost = (pageNum) => api.get(`/blog/blog-manager/admin-find-all-blog?keywords&page=${pageNum}&size=10`)

export const getPostUnactive = (pageNum) => api.get(`/blog/public/get-all-blog-unactived?page=${pageNum}&size=10`)

// For User
export const getAllPostPublic = (currentPage, query) => api.get(`/blog/public/get-all-blog`)

export const getPostByCateId = (cateId) => api.get(`/blog/public/get-blog-by-category?categoryId=${cateId}`)
// Get post by Id
export const getPostById = (id) => api.get(`/blog/all/get-blog-by-id?id=${id}`)

//get top 10 post
export const getPostTopTier = () => api.get("blog/public/get-top10-blog?size=10")
//Delete
export const deletePostById = (id) => api.delete(`/blog/all/delete?blogId=${id}`)

//Like
export const likePost = (id) => api.post(`blog-like/all/like-or-unlike?blogId=${id}`)
//Comment
// Get cmt
export const getCommentById = (id) => api.get(`comment/public/find-by-blog?blogId=${id}`)
// Write cmt
export const commentPost = (content, blogId) => api.post('/comment/all/save', { content, blogId })

export const removeCmtPost = (id) => api.delete(`/comment/all/delete?id=${id}`)
//Get post for user
export const getPostByUser = (userId) => api.get(`blog/all/get-blog-by-user?userId=${userId}`)

//=======================DOCS API=======================
export const getAllDpt = () => api.get("/department/public/get-all-department")

export const getAllMajor = (id) => api.get(`/specialize/public/get-specialize-by-department?departmentId=${id}`)
export const getAllSubject = (dptId, mjId, query) => api.get(`/subject/public/get-all-subject?keywords=${query}&departmentId=${dptId}&specializeId=${mjId}`)

export const getSbjById = (sbjId) => api.get(`/document/public/get-document-by-subject?subjectId=${sbjId}`)

export const getDocById = (id) => api.get(`/document/public/findbyid?id=${id}`)


export const createDocument = (name, image, description, linkFile, subjectId) => api.post(`/document/all/save`, {
  name, image, description, linkFile, subjectId
})



//create
export const createNoti = (title, content, image, linkFiles) => api.post("/notification/admin/add-and-update-notification", { title, content, image, linkFiles })