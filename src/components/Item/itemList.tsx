import { defineComponent, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Tab, Tabs } from '../../shared/Tabs';
import s from './itemList.module.scss';
export const itemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refSelected = ref('本月')
    return () => (
      <MainLayout>{
        {
          title: () => '山竹记账',
          icon: () => <svg class={s.svg}><use xlinkHref='#menu'></use></svg>,
          default: () => <>
            <Tabs class={s.tabs} v-model:selected={refSelected.value}>
              <Tab name='本月'>1</Tab>
              <Tab name='上个月'>2</Tab>
              <Tab name='今年'>3</Tab>
              <Tab name='自定义'>4</Tab>
            </Tabs>
          </>
        }
      }</MainLayout>
    )
  }
})