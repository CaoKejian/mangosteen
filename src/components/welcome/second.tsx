import { defineComponent } from 'vue';
import s from './first.module.scss'
import clock from '../../assets/icon/clock.svg'
import { WelcomeLayout } from './WelcomeLayout'
import { RouterLink } from 'vue-router'
export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img src={clock} alt="" />,
          title: () => <><h2>每日提醒 <br /> 不会遗漏每一笔账单</h2></>,
          buttons: () => <>
            <RouterLink class={s.fake} to='/start'>跳过</RouterLink>
            <RouterLink to='/welcome/3'>下一页</RouterLink>
            <RouterLink to='/start'>跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    )
  }
})