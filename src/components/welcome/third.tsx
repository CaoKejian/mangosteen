import s from './welcome.module.scss';
import chart from '../../assets/icon/chart.svg';
import { FunctionalComponent } from 'vue';

export const Third: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <img class={s.icon} src={chart} />
      <h2>数据可视化<br />收支一目了然</h2>
    </div>
  )
}
Third.displayName = 'Third'
