import { defineComponent, PropType } from 'vue'
import s from './ComingSoon.module.scss'
export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>
        <div class={s.svg_wrapper}>
          <svg>
            <use xlinkHref='#pig'></use>
          </svg>
        </div>
        <p class={s.text}>敬请期待</p>
      </div>
    )
  }
})