import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
const onClick = () => {
  localStorage.setItem('skip', '1')
}
export const ForthActions = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <span onClick={onClick} class={s.true} >
      <RouterLink to="/items" >完成</RouterLink>
    </span>
    <SkipFeatures class={s.true} />
  </div>
)

ForthActions.displayName = 'ForthActions'