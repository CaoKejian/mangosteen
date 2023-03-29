import { defineComponent, onMounted, PropType, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import * as echarts from 'echarts';


export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: (props, context) => {
    const category = ref('expenses')
    const refDiv = ref<HTMLDivElement>()
    onMounted(() => {
      if (refDiv.value === undefined) return
      var myChart = echarts.init(refDiv.value);
      const fontColor = '#30eee9';
      const option = {
        grid: {
          left: '0',
          right: '0',
          top: '10%',
          bottom: '25%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'rgba(50, 216, 205, 1)'
            },
          }
        },
        xAxis: [{
          type: 'category',
          boundaryGap: 1,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },

          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
            show: true,
            margin: 10,
          },
          axisTick: {
            show: false
          }
        },

        ],
        series: [{
          name: '今日',
          type: 'line',
          smooth: true,
          stack: '总量',
          symbolSize: 5,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: '#38D0FB',
              lineStyle: {
                color: "rgba(95, 52, 191,0.8)",
                width: 1
              },
            }
          },
          areaStyle: {
            normal: {
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
          },
          data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410]
        },],
      };
      myChart.setOption(option)
    })
    return () => (
      <div class={s.wrapepr}>
        <FormItem label='类型' type='select'
          px='level'
          options={[
            { value: 'expenses', text: '支出' },
            { value: 'income', text: '收入' }
          ]} v-model={category.value}
        ></FormItem>
        <div ref={refDiv} class={s.demo}></div>
      </div>
    )
  }
})