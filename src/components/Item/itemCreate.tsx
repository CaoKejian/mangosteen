import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import s from './itemCreate.module.scss';
export const itemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout class={s.main}>{
        {
          title: () => '记一笔',
          icon: () => <svg class={s.svg}><use xlinkHref='#return'></use></svg>,
          default: () =>
            <div>1</div>
        }
      }</MainLayout>
    )
  }
})