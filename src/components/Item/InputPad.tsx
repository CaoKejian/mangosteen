import { defineComponent, PropType } from 'vue';
import s from './InputPad.module.scss';
export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const buttons = [
      { text: '1', onClick: () => { } },
      { text: '2', onClick: () => { } },
      { text: '3', onClick: () => { } },
      { text: '全删', onClick: () => { } },
      { text: '4', onClick: () => { } },
      { text: '5', onClick: () => { } },
      { text: '6', onClick: () => { } },
      { text: '+', onClick: () => { } },
      { text: '7', onClick: () => { } },
      { text: '8', onClick: () => { } },
      { text: '9', onClick: () => { } },
      { text: '-', onClick: () => { } },
      { text: '.', onClick: () => { } },
      { text: '0', onClick: () => { } },
      { text: '删', onClick: () => { } },
      { text: '提交', onClick: () => { } },
    ]
    return () => <>
      <div class={s.dateAndAmount}>
        <span class={s.date}>
          <svg class={s.svg}>
            <use xlinkHref='#date'></use>
          </svg>
          <span>2023-3-22</span>
        </span>
        <span class={s.amount}>
          199.12
        </span>
      </div>
      <div class={s.buttons}>
        {buttons.map(button =>
          <button class={s.button} onClick={button.onClick}>{button.text}</button>
        )}
      </div>
    </>
  }
})