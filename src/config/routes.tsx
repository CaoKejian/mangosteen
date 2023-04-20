import { RouteRecordRaw } from "vue-router";
import { itemCreate } from "../components/Item/itemCreate";
import { itemList } from "../components/Item/itemList";
import { First } from "../components/welcome/first";
import { FirstActions } from "../components/welcome/firstActions";
import { Forth } from "../components/welcome/forth";
import { ForthActions } from "../components/welcome/forthActions";
import { Second } from "../components/welcome/second";
import { SecondActions } from "../components/welcome/secondActions";
import { Third } from "../components/welcome/third";
import { ThirdActions } from "../components/welcome/thirdActions";
import { ComingSoon } from "../shared/ComingSoon";
import { http } from "../shared/Http";

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome', component: () => import('../views/Welcome'),
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skip') === '1' ? next('/items') : next()
    },
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: 'welcome1', components: { main: First, footer: FirstActions }, },
      { path: '2', name: 'welcome2', components: { main: Second, footer: SecondActions }, },
      { path: '3', name: 'welcome3', components: { main: Third, footer: ThirdActions }, },
      { path: '4', name: 'welcome4', components: { main: Forth, footer: ForthActions }, },
    ]
  },
  {
    path: '/items', component: () => import('../views/ItemPage'),
    children: [
      { path: "", component: itemList },
      { path: "create", component: itemCreate },
    ]
  },
  {
    path: '/tags', component: () => import('../views/TagPage'),
    beforeEnter: async (to, from, next) => {
      await http.get('/me').catch(() => {
        next('/sign_in?return_to=' + to.path)
      })
      next()
    },
    children: [
      { path: 'create', component: () => import('../components/tag/TagCreate') },
      { path: ':id/edit', component: ()=> import('../components/tag/TagEdit')}
    ]
  },
  {
    path: '/sign_in', component: () => import('../views/SignInPage')
  },
  {
    path: '/statistics', component: () => import('../views/StatisticsPage'),
  }, {
    path: '/export', component: ()=> import('../shared/ComingSoon')
  }, {
    path: '/notify', component: ComingSoon
  }
]

