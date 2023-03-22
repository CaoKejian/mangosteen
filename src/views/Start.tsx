import { defineComponent, PropType } from 'vue';
import { Button } from '../shared/Button';
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
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>测试</Button>
        </div>
      </div>
    )
  }
})