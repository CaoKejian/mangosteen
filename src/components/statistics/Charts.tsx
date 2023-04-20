import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import 'echarts-liquidfill';
import { http } from '../../shared/Http';
import { LineChart } from '../echarts/LineChart';
import { Time } from '../../shared/time';
import { PieChart } from '../echarts/PieChart';
import { BallChart } from '../echarts/BallChart';
import { Bars } from '../echarts/Bars';

type Data1Item = { happen_at: string, amount: number }
type Data1 = Data1Item[]
type Data2Item = { tag_id: number; tag: Tag; amount: number }
type Data2 = Data2Item[]
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
    const fetchData1 = async () => {
      // 问题出在这里，因为没有筛选查找！
      const response = await http.get<{ groups: Data1, summary: number }>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        group_by: 'happen_at',
      }, {
        _mock: 'itemSummary',
        _autoLoading: true
      })
      console.log(response.data.groups);

      //  data1.value.slice(-2)[0]
      data1.value = response.data.groups
    }
    onMounted(fetchData1)
    watch(() => kind.value, fetchData1)
    const data2 = ref<Data2>([])
    const betterData2 = computed<{ name: string; value: number }[]>(() =>
      data2.value.map((item) => ({
        name: item.tag.name,
        value: item.amount
      }))
    )
    const fetchData2 = async () => {
      const response = await http.get<{ groups: Data2; summary: number }>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        group_by: 'tag_id',
      }, {
        _mock: 'itemSummary'
      })
      data2.value = response.data.groups
    }
    onMounted(fetchData2)
    watch(() => kind.value, fetchData2)

    const betterData3 = computed<{ tag: Tag; amount: number; percent: number }[]>(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
      return data2.value.map((item) => ({
        ...item,
        percent: Math.round((item.amount / total) * 100)
      }))
    })
    const rate = ref<number>()
    const fetchRate = () => {
      if (kind.value == 'income') {
        rate.value = 0.7
      } else {
        rate.value = 0.5
      }
      console.log(rate.value);
    }
    onMounted(fetchRate)
    watch(() => kind.value, () => {
      fetchRate()
      console.log(111);
    })
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
        <PieChart data={betterData2.value} />
        <BallChart data={rate.value} />
        <Bars data={betterData3.value} />
      </div>
    )
  }
})