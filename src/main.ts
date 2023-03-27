import { createApp } from 'vue'
import { App } from './App'
import './assets/css/reset.css'
// 1. 引入你需要的组件
// 2. 引入组件样式
import 'vant/lib/index.css';
import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import '@svgstore'


const router = createRouter({
  history,
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')