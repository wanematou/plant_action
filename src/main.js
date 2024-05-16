import './assets/main.css'
import{createPinia} from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import router from './router/projectRouter'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const pinia= createPinia();
createApp(App)
.component('EasyDataTable', Vue3EasyDataTable)
.use(ElementPlus)
.use(pinia)
.use(router)
.mount('#app')
