import { defineComponent, PropType } from 'vue';
import s from './first.module.scss';
export const First = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>First
      </div>
    )
  }
})