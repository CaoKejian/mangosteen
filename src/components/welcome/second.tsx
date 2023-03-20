import { defineComponent, PropType } from 'vue';
import s from './first.module.scss';
import clock from '../../assets/icon/clock.svg'
import { RouterLink } from 'vue-router'
export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.pig} src={clock} />
          <h2>每日提醒 <br /> 不会遗漏每一笔账单</h2>
        </div>
        <div class={s.actions}>
          <div class={s.fake}>跳过</div>
          <RouterLink to='/welcome/3'>下一页</RouterLink>
          <RouterLink to='/start' class={s.right}>跳过</RouterLink>
        </div>
      </div>
    )
  }
})