import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import axios from 'axios'
window.axios = axios
import store from './store'
//Components
import 'aos/dist/aos.css';
import 'ant-design-vue/dist/reset.css';
import 'tailwindcss/tailwind.css'
import 'flowbite/dist/flowbite.min.css'
import ModalComp from './components/Modal/ModalComp.vue'
import Button from './components/Button/Button.vue'
const app = createApp(App)

app.use(store)
app.use(Antd)
app.use(router)
app.component('ModalComp', ModalComp)
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Button', Button)
app.mount('#app')

