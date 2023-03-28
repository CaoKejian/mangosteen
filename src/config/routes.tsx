import { RouteRecordRaw } from "vue-router";
import { itemCreate } from "../components/Item/itemCreate";
import { itemList } from "../components/Item/itemList";
import { TagCreate } from "../components/tag/TagCreate";
import { TagExit } from "../components/tag/TagExit";
import { First } from "../components/welcome/first";
import { FirstActions } from "../components/welcome/firstActions";
import { Forth } from "../components/welcome/forth";
import { ForthActions } from "../components/welcome/forthActions";
import { Second } from "../components/welcome/second";
import { SecondActions } from "../components/welcome/secondActions";
import { Third } from "../components/welcome/third";
import { ThirdActions } from "../components/welcome/thirdActions";
import { ItemPage } from "../views/ItemPage";
import { Start } from "../views/Start";
import { TagPage } from "../views/TagPage";
import { Welcome } from "../views/Welcome";

export const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome', component: Welcome, children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: 'welcome1', components: { main: First, footer: FirstActions }, },
      { path: '2', name: 'welcome2', components: { main: Second, footer: SecondActions }, },
      { path: '3', name: 'welcome3', components: { main: Third, footer: ThirdActions }, },
      { path: '4', name: 'welcome4', components: { main: Forth, footer: ForthActions }, },
    ]
  },
  { path: '/start', component: Start },
  {
    path: '/items', component: ItemPage,
    children: [
      { path: "", component: itemList },
      { path: "create", component: itemCreate },
    ]
  },
  { path: '/tags', component: TagPage,
    children:[
      {path:'create',component:TagCreate},
      {path:':id/edit',component:TagExit}
    ]
  }

]