import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "particles.vue3";
import '@/api/axios.config'

// import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(Particles)

app.mount('#app')
