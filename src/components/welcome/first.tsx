import { defineComponent, PropType } from 'vue';
import s from './first.module.scss'
import pig from '../../assets/icon/pig.svg'
import { RouterLink } from 'vue-router'
export const First = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.pig} src={pig} />
          <h1>会挣钱 <br /> 还要会省钱</h1>
        </div>
        <div class={s.actions}>
          <div class={s.fake}>跳过</div>
          <RouterLink to='/welcome/2'>下一页</RouterLink>
          <RouterLink to='/start' class={s.right}>跳过</RouterLink>
        </div>
      </div>
    )
  }
})