import { defineComponent, PropType, reactive, ref } from 'vue';

import s from './TimeTabsLayout.module.scss';
import { Overlay } from 'vant';
import { Form, FormItem } from '../shared/Form';
import { OverLay } from '../shared/OverLay';
import { Time } from '../shared/time';
import { MainLayout } from './MainLayout';
import { Tab, Tabs } from '../shared/Tabs';
import { Button } from '../shared/Button';

const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
})
export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true
    }
  },
  setup: (props, context) => {
    const refSelected = ref('本月')
    const time = new Time()
    const customtime = reactive<{
      start?:string 
      end?:string
    }>({})
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
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value
    }
    return () => (
      <MainLayout>{
        {
          title: () => '山竹记账',
          icon: () => <svg class={s.svg} onClick={onClickMenu}><use xlinkHref='#menu'></use></svg>,
          default: () => <>
            <Tabs v-model:selected={refSelected.value}
              onUpdate:selected={onSelect}
            >
              <Tab name='本月'>
                <props.component
                  startDate={timeList[0].start.format()}
                  endDate={timeList[0].end.format()}>
                </props.component>
              </Tab>
              <Tab name='上个月'>
                <props.component
                  startDate={timeList[1].start.format()}
                  endDate={timeList[1].end.format()}>
                </props.component>
              </Tab>
              <Tab name='今年'>
                <props.component
                  startDate={timeList[2].start.format()}
                  endDate={timeList[2].end.format()}
                >
                </props.component>
              </Tab>
              <Tab name='自定义时间'>
                <props.component
                  startDate={customtime.start}
                  endDate={customtime.end}
                >
                </props.component>
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
            {
              overlayVisible.value &&
              <OverLay onClose={() => overlayVisible.value = false} />
            }
          </>
        }
      }</MainLayout >
    )
  }
})