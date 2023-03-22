import { defineComponent, PropType } from 'vue';
import { NavBar } from '../shared/NavBar';
import s from './MainLayout.module.scss';
export const MainLayout = defineComponent({

  setup: (props, context) => {
    return () => (
      <div>
        <NavBar class={s.navbar_wrapper}>{
          {
            default: () => context.slots.title?.(),
            icon: () => context.slots.icon?.(),
          }
        }
        </NavBar>
        {context.slots.default?.()}
      </div>
    )
  }
})