import { defineComponent, PropType, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Button } from '../shared/Button';
import { FloatButton } from '../shared/FloatButton';
import { NavBar } from '../shared/NavBar';
import { OverLay } from '../shared/OverLay';
import s from './Start.module.scss';
export const Start = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value
    }
    return () => (
      <div>
        <NavBar class={s.navbar_wrapper}>{
          {
            default: '山竹记账',
            icon: <svg class={s.svg} onClick={onClickMenu}><use xlinkHref='#menu'></use></svg>
          }
        }
        </NavBar>
        <div class={s.svg_wrapper}>
          <svg>
            <use xlinkHref='#pig'></use>
          </svg>
        </div>
        <div class={s.button_wrapper}>
          <RouterLink to='/items/create'>
            <Button class={s.button}>开始记账</Button>
          </RouterLink>
        </div>
        <div class={s.float_button}>
          <RouterLink to='/items/create'>
            <FloatButton></FloatButton>
          </RouterLink>
        </div>
        {
          overlayVisible.value &&
          <OverLay onClose={() => overlayVisible.value = false} />
        }
      </div>
    )
  }
})