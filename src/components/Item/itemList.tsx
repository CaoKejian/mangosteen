import { customRef, defineComponent, PropType, reactive, ref, watchEffect } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Tab, Tabs } from '../../shared/Tabs';
import { ItemSummary } from './ItemSummary';
import s from './itemList.module.scss';
import { Time } from '../../shared/time';
import { Overlay } from 'vant';
import { Form, FormItem } from '../../shared/Form';
import { Button } from '../../shared/Button';

export const itemList = defineComponent({
  setup: (props, context) => {
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
    const refOverlayVisible = ref(false)
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refOverlayVisible.value = false
    }
    const onSelect = (value: string) => {
      if (value == '自定义时间') {
        refOverlayVisible.value = true
      }
    }
    return () => (
      <MainLayout>{
        {
          title: () => '山竹记账',
          icon: () => <svg class={s.svg}><use xlinkHref='#menu'></use></svg>,
          default: () => <>
            <Tabs v-model:selected={refSelected.value}
              onUpdate:selected={onSelect}
            >
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
            <Overlay show={refOverlayVisible.value} class={s.overlay} >
              <div class={s.overlay_inner}>
                <header>请选择时间</header>
                <main>
                  <Form onSubmit={onSubmitCustomTime}>
                    <FormItem label='开始时间'
                      v-model={customtime.start} type='date'
                    ></FormItem>
                    <FormItem label='结束时间'
                      v-model={customtime.end} type='date'
                    ></FormItem>
                    <FormItem class={s.actions}>
                      <div>
                        <Button onClick={() => refOverlayVisible.value = false} >取消</Button>
                        <Button type='submit'>确认</Button>
                      </div>
                    </FormItem>
                  </Form>
                </main>
              </div>
            </Overlay>
          </>
        }
      }</MainLayout >
    )
  }
})