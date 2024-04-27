import './assets/main.css'
import './assets/ckeditor.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import axios from 'axios'
window.axios = axios

import firebase from 'firebase/compat/app';
import 'firebase/storage'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyCHSxwRox6f2b8No6UWQUJPKis1W-De1sw",
  authDomain: "vnua-forums-upload.firebaseapp.com",
  projectId: "vnua-forums-upload",
  storageBucket: "vnua-forums-upload.appspot.com",
  messagingSenderId: "197561392",
  appId: "1:197561392:web:89d293507bdce62ec771f5"
};

const db = firebase.initializeApp(firebaseConfig)
export default db
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import CKEditor from '@ckeditor/ckeditor5-vue';
import store from './store'
//Components
import 'aos/dist/aos.css';
import 'ant-design-vue/dist/reset.css';
import 'tailwindcss/tailwind.css'
import 'flowbite/dist/flowbite.min.css'
import ModalComp from './components/Modal/ModalComp.vue'
import Button from './components/Button/Button.vue'
import InputField from './components/Input/InputField.vue'
import Pagination from './components/Pagination/Pagination.vue'
import AsideView from './components/AsideView.vue'
const app = createApp(App)

app.use(store)
app.use(CKEditor)
app.use(Vue3Toastify)
app.use(Antd)
app.use(router)
app.component('ModalComp', ModalComp)
app.component('AsideView', AsideView)
app.component('InputField', InputField)
app.component('Pagination', Pagination)
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Button', Button)
app.mount('#app')

