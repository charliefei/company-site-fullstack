import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "particles.vue3";
import '@/api/axios.config'
import Mitt from 'mitt'

// import './assets/main.css'
const mitt = Mitt()

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(Particles)
app.config.globalProperties.$bus = mitt
app.mount('#app')
