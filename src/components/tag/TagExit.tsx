import { defineComponent, PropType } from 'vue';
import s from './TagExit.module.scss';
export const TagExit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>exit
      </div>
    )
  }
})