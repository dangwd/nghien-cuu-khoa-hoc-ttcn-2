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
import { ObserveVisibility } from "vue3-observe-visibility";
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
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara';

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
import AsideRight from './components/AsideRight.vue'
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import StyleClass from 'primevue/styleclass';
import AnimateOnScroll from 'primevue/accordiontab'
import BadgeDirective from 'primevue/badgedirective'
import FocusTrap from 'primevue/focustrap'
import Menu from 'primevue/menu'
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown'
import Image from 'primevue/image';
import Password from 'primevue/password';
import Skeleton from 'primevue/skeleton';
const app = createApp(App)

app.directive('ObserveVisibility', ObserveVisibility)
app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
app.directive('focustrap', FocusTrap);
app.directive('animateonscroll', AnimateOnScroll);
app.use(store)
app.use(CKEditor)
app.use(Vue3Toastify)
app.use(Antd)
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
  ripple: true
});
app.use(router)
app.component('Skeleton', Skeleton)

app.component('Menu', Menu)
app.component('Image', Image)
app.component('InputText', InputText)
app.component('DataTable', DataTable)
app.component('Password', Password)
app.component('Column', Column)
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('AsideRight', AsideRight)
app.component('ModalComp', ModalComp)
app.component('AsideView', AsideView)
app.component('InputField', InputField)
app.component('Pagination', Pagination)
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Button', Button)
app.mount('#app')

