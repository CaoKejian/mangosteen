import { defineComponent, PropType } from 'vue';
import s from './FloatButton.module.scss';
export const FloatButton = defineComponent({

  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <svg>
          <use xlinkHref='#add'></use>
        </svg>
      </div>
    )
  }
})