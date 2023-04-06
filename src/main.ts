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
import { http } from './shared/Http';
import { fetchMe, mePromise } from './shared/me';


const router = createRouter({
  history,
  routes,
})
fetchMe()
router.beforeEach((to, from) => {
  if (to.path === '/' || to.path === '/start' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in')) {
    return true
  } else {
    return mePromise!.then(
      () => true,
      () => '/sign_in?return_to=' + to.path
    )
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')