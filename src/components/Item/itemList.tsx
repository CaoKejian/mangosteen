import { defineComponent, PropType, reactive, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Tab, Tabs } from '../../shared/Tabs';
import { ItemSummary } from './ItemSummary';
import s from './itemList.module.scss';
import { Time } from '../../shared/time';
import { Overlay } from 'vant';

export const itemList = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false)
    const refSelected = ref('本月')
    const time = new Time()
    const customtime = reactive({
      start: new Time().format(),
      end: new Time().format()
    })
    const timeList = [
      {
        start: time.firstDayOfMonth(),
        end: time.lastDayOfMonth()
      },
      {
        start: time.add(-1, 'month').firstDayOfMonth(),
        end: time.add(-1, 'month').lastDayOfMonth()
      },
      {
        start: time.firstDayOfYear(),
        end: time.lastDayOfYear()
      }
    ]
    return () => (
      <MainLayout>{
        {
          title: () => '山竹记账',
          icon: () => <svg class={s.svg}><use xlinkHref='#menu'></use></svg>,
          default: () => <>
            <Tabs v-model:selected={refSelected.value}>
              <Tab name='本月'>
                <ItemSummary
                  startDate={timeList[0].start.format()}
                  endDate={timeList[0].end.format()}>
                </ItemSummary>
              </Tab>
              <Tab name='上个月'>
                <ItemSummary
                  startDate={timeList[1].start.format()}
                  endDate={timeList[1].end.format()}>
                </ItemSummary>
              </Tab>
              <Tab name='今年'>
                <ItemSummary
                  startDate={timeList[2].start.format()}
                  endDate={timeList[2].end.format()}
                >
                </ItemSummary>
              </Tab>
              <Tab name='自定义时间'>
                <ItemSummary
                  startDate={customtime.start}
                  endDate={customtime.end}
                >
                </ItemSummary>
              </Tab>
            </Tabs>
            <overlay show={refOverlayVisible.value} class={s.overlay} >
              
              </overlay>
          </>
        }
      }</MainLayout>
    )
  }
})