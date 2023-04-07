import { defineComponent, PropType } from 'vue';
import { RouterLink } from 'vue-router';
import s from './OverLay.module.scss';
import 'animate.css'
export const OverLay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const close = () => {
      props.onClose?.()
    }
    const onClickSignIn = () => { }
    return () => (<>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay} class="animate__animated animate__fadeInLeft animate__faster">
        <section class={s.currentUser} onClick={onClickSignIn}>
          <h2>未登录用户</h2>
          <p>点击登录</p>
        </section>
        <nav>
          <ul class={s.action_list}>
            <li>
              <RouterLink to="/statistics" class={s.action}>
                <svg class={s.icon}><use xlinkHref='#charts'></use></svg>
                <span>统计图表</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/export" class={s.action}>
                <svg class={s.icon}><use xlinkHref='#export'></use></svg>
                <span>导出数据</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/notify" class={s.action}>
                <svg class={s.icon}><use xlinkHref='#notify'></use></svg>
                <span>记账提醒</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
    )
  }
})