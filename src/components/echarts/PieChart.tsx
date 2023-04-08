import * as echarts from 'echarts';
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import s from './Echarts.module.scss'
import 'echarts-liquidfill';

const echartsOption = {
  grid: {
    left: '0%',
    right: '0',
    top: '0%',
    bottom: '0%',
    containLabel: true
  },
}

export const PieChart = defineComponent({
  // props: {
  //   data: {
  //     type: Array as PropType<[string, number][]>,
  //     required: true,
  //   },
  // },
  setup: (props, context) => {
    const refDiv2 = ref<HTMLDivElement>()
    let chart: echarts.ECharts | undefined = undefined
    onMounted(async () => {
      if (refDiv2.value === undefined) { return }
      chart = echarts.init(refDiv2.value);

      chart.setOption({
        ...echartsOption,
        series: [{
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
        }],
      })
    })
    return () => (<>
      <div ref={refDiv2} class={s.demo}></div>
    </>
    )
  }
})
