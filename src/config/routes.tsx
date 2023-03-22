import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/first";
import { FirstActions } from "../components/welcome/firstActions";
import { Forth } from "../components/welcome/forth";
import { ForthActions } from "../components/welcome/forthActions";
import { Second } from "../components/welcome/second";
import { SecondActions } from "../components/welcome/secondActions";
import { Third } from "../components/welcome/third";
import { ThirdActions } from "../components/welcome/thirdActions";
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
]