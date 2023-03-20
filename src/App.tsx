import { defineComponent, ref } from "vue";
import { RouterView } from 'vue-router'
export const App = defineComponent({
  setup() {
    return () => (<>
      <RouterView />
    </>
    )
  }
})