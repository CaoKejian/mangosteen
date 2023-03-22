import { defineComponent, PropType } from 'vue';
import { Button } from '../shared/Button';
import { FloatButton } from '../shared/FloatButton';
import { NavBar } from '../shared/NavBar';
import s from './Start.module.scss';
export const Start = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const onClick = () => {
      console.log('hi');
    }
    return () => (
      <div>
        <NavBar class={s.navbar_wrapper}>{
          {
            default: '山竹记账',
            icon: <svg class={s.svg}><use xlinkHref='#menu'></use></svg>
          }
        }
        </NavBar>
        <div class={s.svg_wrapper}>
          <svg>
            <use xlinkHref='#pig'></use>
          </svg>
        </div>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>测试</Button>
        </div>
        <div class={s.float_button}>
          <FloatButton></FloatButton>
        </div>
      </div>
    )
  }
})