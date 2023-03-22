import { defineComponent, onUpdated, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import s from './itemCreate.module.scss';
export const itemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refkind = ref('支出')
    const onUpdatedSelected = (name: string) => {
      refkind.value = name
    }
    return () => (
      <MainLayout class={s.main}>{
        {
          title: () => '记一笔',
          icon: () => <svg class={s.svg}><use xlinkHref='#return'></use></svg>,
          default: () => <>
            <Tabs v-model:selected={refkind.value}>
              <Tab name='支出'>
                1
              </Tab>
              <Tab name='收入'>
                2
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
            </div>
          </>
        }
      }</MainLayout>
    )
  }
})