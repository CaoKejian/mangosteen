import { defineComponent, FunctionalComponent } from 'vue';
import s from './first.module.scss'
export const WelcomeLayout: FunctionalComponent = (props, context) => {
  const { slots: { icon, title, buttons } } = context
  return (
    <div class={s.wrapper}>
      <div class={s.card}>
        {icon?.()}
        {title?.()}
      </div>
      <div class={s.actions}>
        {buttons?.()}
      </div>
    </div>
  )
}