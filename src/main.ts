import { routes } from './config/routes';
import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { history } from './shared/history';
import '@svgstore';
import Vant from 'vant';
import 'vant/lib/index.css';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

const router = createRouter({ history, routes })

const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(ArcoVue);
app.use(Vant)
