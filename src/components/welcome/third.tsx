import s from './first.module.scss';
import chart from '../../assets/icon/chart.svg'
import { WelcomeLayout } from './WelcomeLayout'
import { RouterLink } from 'vue-router'
export const Third = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={chart} alt="" />,
      title: () => <><h2>数据可视化 <br /> 收支一目了然</h2></>,
      buttons: () => <>
        <RouterLink class={s.fake} to='/start'>跳过</RouterLink>
        <RouterLink to='/welcome/4'>下一页</RouterLink>
        <RouterLink to='/start' class={s.right}>跳过</RouterLink>
      </>
    }
    }
  </WelcomeLayout >
)
Third.displayName = 'Third'