import * as echarts from 'echarts';
import { defineComponent, onMounted, PropType, Ref, ref, watch } from 'vue';
import s from './Echarts.module.scss'
import 'echarts-liquidfill';
const echartsOption = {
  backgroundColor: 'transparent',
  width: '100%',
  height: '100%',
  title: [{
    text: "支出占比",
    left: "center",
    bottom: "20%",
    textStyle: {
      fontWeight: "bold",
      fontSize: 10,
      color: "#fff",
    },
  },
  ],
}

export const BallChart = defineComponent({
  props: {
    data: {
      type: Number,
      default: 0
    }
  },
  setup: (props, context) => {
    const refDiv3 = ref<HTMLDivElement>()
    let chart: echarts.ECharts | undefined = undefined
    const getData = () => {
      chart?.setOption({
        ...echartsOption,
        series: [
          {
            color: ['#cbb6eb', '#753fca'], //波浪的颜色
            type: 'liquidFill',
            radius: '90%',
            data: [
              {
                value: props.data + 0.05,
              },
              {
                value: props.data,
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
                  return props.data * 100 + '%';
                }
              },
              fontSize: 22,
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
      })
    }
    const hundleClick = () => {

    }
    onMounted(async () => {
      if (refDiv3.value === undefined) { return }
      chart = echarts.init(refDiv3.value)
      getData()
    })
    watch(() => props.data, () => {
      console.log(1);

      getData()
    })
    return () => (<>
      <div ref={refDiv3} class={s.demo1} onClick={hundleClick} ></div>
    </>

    )
  }
})