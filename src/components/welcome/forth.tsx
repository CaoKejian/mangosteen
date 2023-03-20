import { defineComponent, PropType } from 'vue';
import s from './first.module.scss';
import cloud from '../../assets/icon/cloud.svg'
import { RouterLink } from 'vue-router'
export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.pig} src={cloud} />
          <h2 >云备份 <br /> 再也不怕数据丢失</h2>
        </div>
        <div class={s.actions}>
          <div class={s.fake}>跳过</div>
          <RouterLink to='/start'>下一页</RouterLink>
          <RouterLink to='/start' class={s.right}>跳过</RouterLink>
        </div>
      </div>
    )
  }
})