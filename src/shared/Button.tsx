import { defineComponent, PropType } from 'vue';
import s from './Button.module.scss';
interface X {
  onClick?: (e: Event) => void
}
export const Button = defineComponent<X>({
  setup: (props, context) => {
    return () => (
      <button class={s.button}>
        {context.slots.default?.()}
      </button>
    )
  }
})