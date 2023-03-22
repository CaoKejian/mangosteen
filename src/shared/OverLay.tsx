import { defineComponent, PropType } from 'vue';
import s from './OverLay.module.scss';
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
    return () => (<>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section>
          <h2>未登录用户</h2>
          <p>点击登录</p>
        </section>
        <nav>
          <ul>
            <li>
              <svg class={s.svg}><use xlinkHref='#charts'></use></svg>
              <span>统计图表</span>
            </li>
            <li>
              <svg class={s.svg}><use xlinkHref='#export'></use></svg>
              <span>导出数据</span>
            </li>
            <li>
              <svg class={s.svg}><use xlinkHref='#notify'></use></svg>
              <span>记账提醒</span>
            </li>
          </ul>
        </nav>
      </div>
    </>
    )
  }
})