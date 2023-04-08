import * as echarts from 'echarts';
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import s from './Echarts.module.scss'
import 'echarts-liquidfill';
import { getMoney } from '../../shared/Money';
import { Time } from '../../shared/time';

const echartsOption = {
  grid: [{ left: 16, top: 40, right: 16, bottom: 20 }],
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#6638c3'
      },
    },
    formatter: ([item]: any) => {
      const [x, y] = item.data
      return `${new Time(new Date(x)).format('YYYY年MM月DD日')} ￥${getMoney(y)}`
    },
  },
  xAxis: [{
    type: 'category',
    boundaryGap: ['3%', '0%'],
    axisLabel: {
      formatter: (value: string) => new Time(new Date(value)).format('MM-DD'),
    },
    axisLine: {
      show: true
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
    },
  }],
  yAxis: [{
    type: 'value',
    name: '',
    padding: 5,
    // max: 1000,
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.2)',
        type: 'solid'
      }
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false,
      margin: 10,
    },
    axisTick: {
      show: false
    }
  },
  ],
};

export const LineChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<[string, number][]>,
      required: true,
    },
  },
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>()
    let chart: echarts.ECharts | undefined = undefined
    onMounted(async () => {
      if (refDiv.value === undefined) { return }
      chart = echarts.init(refDiv.value)
      chart.setOption({
        ...echartsOption,
        series: [{
          type: 'line',
          smooth: true,
          symbolSize: 5,
          showSymbol: false,
          data: props.data,
          itemStyle: {
            lineStyle: {
              color: "rgba(95, 52, 191,0.8)",
              width: 1
            },
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(95, 52, 191,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(143, 76, 215,0.2)'
            }
            ], false),
          }
        }],
      })
    })
    watch(() => props.data, () => {
      chart?.setOption({
        series: [{
          data: props.data
        }]
      });
    })
    return () => (<>
      <div ref={refDiv} class={s.demo}></div>
    </>
    )
  }
})