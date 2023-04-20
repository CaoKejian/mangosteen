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
import { createPinia } from 'pinia'
const pinia = createPinia()
import { useMeStore } from './stores/useMeStore';
const app = createApp(App)
app.use(pinia)

const router = createRouter({
  history,
  routes,
})
const meStore = useMeStore()
meStore.fetchMe()
router.beforeEach((to, from) => {
  if (to.path === '/' || to.path === '/items' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in')) {
    return true
  } else {
    return meStore.mePromise!.then(
      () => true,
      () => {
        return '/sign_in?return_to=' + from.path
      }
    )
  }

})
app.use(router)
app.mount('#app')
if (DEBUG) {
  console.log('正在调试');
}