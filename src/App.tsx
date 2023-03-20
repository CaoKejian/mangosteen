import { defineComponent, ref } from "vue";

export const App = defineComponent({
  setup() {
    return () => (<>
      <header>导航
        <ul>
          <li>
            <router-link to='/'>Foo</router-link>
          </li>
          <li>
            <router-link to='/about'>Bar</router-link>
          </li>
        </ul>
      </header>
      <div>
        <router-view></router-view>
      </div>
      <footer>页脚</footer>
    </>
    )
  }
})