import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import { http } from '../../shared/Http';
import { LineChart } from '../echarts/LineChart';
import { Time } from '../../shared/time';
import { PieChart } from '../echarts/PieChart';
import { BallChart } from '../echarts/BallChart';

type Data1Item = { happen_at: string, amount: number }
type Data1 = Data1Item[]
const DAY = 24 * 3600 * 1000
export const Charts = defineComponent({
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

  setup: (props, context) => {
    const refDiv2 = ref<HTMLDivElement>()
    const refDiv3 = ref<HTMLDivElement>()
    const kind = ref('expenses')
    const data1 = ref<Data1>([])
    const betterData1 = computed<[string, number][]>(() => {
      if (!props.startDate || !props.endDate) { return [] }
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
      const n = diff / DAY + 1
      return Array.from({ length: n }).map((_, i) => {
        const time = new Time(props.startDate + 'T00:00:00.000+0800').add(i, 'day').getTimestamp()
        const item = data1.value[0]

        const amount = (item && new Date(item.happen_at).getTime() === time)
          ? data1.value.shift()!.amount
          : 0
        return [new Date(time).toISOString(), amount]
      })
    })
    const data3 = reactive([
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
      { tag: { id: 2, name: '吃饭', sign: 'x' }, amount: 1000 },
      { tag: { id: 3, name: '娱乐', sign: 'x' }, amount: 900 },
    ])
    const betterData3 = computed(() => {
      const total = data3.reduce((sum, item) => sum + item.amount, 0)
      return data3.map(item => ({
        ...item,
        percent: Math.round(item.amount / total * 100) + '%'
      }))
    })

    onMounted(async () => {
      // 问题出在这里，因为没有筛选查找！
      const response = await http.get<{ groups: Data1, summary: number }>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        _mock: 'itemSummary'
      })
      //  data1.value.slice(-2)[0]
      data1.value = response.data.groups
    })
    onMounted(() => { })
    return () => (
      <div class={s.wrapepr}>
        <FormItem label='类型' type='select'
          px='level'
          options={[
            { value: 'expenses', text: '支出' },
            { value: 'income', text: '收入' }
          ]} v-model={kind.value}
        ></FormItem>
        <LineChart data={betterData1.value} />
        <PieChart />
        <BallChart />
        <div ref={refDiv3} class={s.demo3}></div>
        <div class={s.demo3}>
          {betterData3.value.map(({ tag, amount, percent }) => {
            return (
              <div class={s.topItem}>
                <div class={s.sign}>
                  {tag.sign}
                </div>
                <div class={s.bar_wrapper}>
                  <div class={s.bar_text}>
                    <span> {tag.name} - {percent} </span>
                    <span> ￥{amount} </span>
                  </div>
                  <div class={s.bar}>
                    <div class={s.bar_inner}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
})