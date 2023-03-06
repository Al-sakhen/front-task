import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from 'axios'

axios.defaults.withCredentials = true;

const options = {
    // You can set your default options here
};

createApp(App)
.use(router)
.use(Toast, options)
.mount('#app')
