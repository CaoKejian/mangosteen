import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import { http } from '../../shared/Http';
import { LineChart } from '../echarts/LineChart';
import { Time } from '../../shared/time';

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
    const columnarData = computed<[string, number][]>(() => {
      return data1.value.map(item =>
        [item.happen_at, item.amount] as [string, number]
      )
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
    const initPie = () => {
      if (refDiv2.value === undefined) return
      var myChart = echarts.init(refDiv2.value);
      const option = {
        grid: {
          left: '0%',
          right: '0',
          top: '0%',
          bottom: '0%',
          containLabel: true
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '80%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
    const initball = () => {
      const rate = 0.5
      if (refDiv3.value === undefined) return
      var myChart = echarts.init(refDiv3.value);
      const option = {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        title: [{
          text: "本月支出占比",
          left: "center",
          bottom: "20%",
          textStyle: {
            fontWeight: "bold",
            fontSize: 14,
            color: "#fff",
          },
        },
        ],
        series: [
          {
            color: ['#cbb6eb', '#753fca'], //波浪的颜色
            type: 'liquidFill',
            radius: '90%',
            data: [
              //波浪的高度占比 (第一个是浅色的 : 在传过来的数据上加上一点作为展示效果,第二个用传过来的数据)
              {
                value: rate + 0.05,
              },
              {
                value: rate,
              },
            ],
            center: ['50%', '50%'], //图在整个画布的位置
            backgroundStyle: {
              color: 'white',
              borderColor: '#8f4cd7', //边框颜色
              borderWidth: 2, //边框粗细
              shadowColor: '#8f4cd7', //阴影颜色
              shadowBlur: 5, //阴影范围
            },
            label: {
              //水球图里面的文字喝字体等设置
              formatter: function (value: number) {
                if (!value) {
                  return '加载中';
                } else {
                  return rate * 100 + '%';
                }
              },
              // textStyle: {
              fontSize: 22,
              // },
            },
            outline: {
              //水球图的外层边框 可设置 show:false  不显示
              itemStyle: {
                borderColor: '#DCDCDC',
                borderWidth: 3,
              },
              borderDistance: 0,
            },
            itemStyle: {
              opacity: 0.95,
              shadowColor: 'rgba(0,0,0,0)',
            },
          },
        ],
      }
      myChart.setOption(option)
    }

    onMounted(async () => {
      const response = await http.get<{ groups: Data1, summary: number }>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        _mock: 'itemSummary'
      })
      data1.value = response.data.groups
      initPie(), initball()
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
        <LineChart data={betterData1.value} data1={columnarData.value} />
        <div ref={refDiv2} class={s.demo2}></div>
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