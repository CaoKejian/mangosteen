import { defineComponent, onMounted, PropType, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import * as echarts from 'echarts';
import 'echarts-liquidfill';

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
    const refDiv2 = ref<HTMLDivElement>()
    const refDiv3 = ref<HTMLDivElement>()
    const initLine = () => {
      if (refDiv.value === undefined) return
      var myChart = echarts.init(refDiv.value);
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

          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
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
          data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410, 191, 234, 290]
        },],
      };
      myChart.setOption(option)
    }
    const initPie = () => {
      if (refDiv2.value === undefined) return
      var myChart = echarts.init(refDiv2.value);
      const option = {
        grid: {
          left: '0',
          right: '0',
          top: '10%',
          bottom: '25%',
          containLabel: true
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
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
      if (refDiv3.value === undefined) return
      var myChart = echarts.init(refDiv3.value);
      const option = {
        title: [{
          text: "本月支出占比\n",
          left: "center",
          bottom: "5%",
          textStyle: {
            fontWeight: "normal",
            fontSize: 14,
            color: "#333",
          },
        },
        ],
        series: [
          {
            type: "liquidFill",
            radius: "45%",
            center: ["50%", "45%"],
            data: [0.5, 0.5, 0.5], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: "rgb(255,0,255,0.1)",
            },
            label: {
              normal: {
                formatter: " \n \n65%",
                // color: "blue",
                textStyle: {
                  fontSize: 20,
                  color: "#fff",
                },
              },
            },
            outline: {
              show: false,
            },
          },
          {
            type: "pie",
            center: ["50%", "45%"],
            radius: ["50%", "52%"],
            hoverAnimation: false,
            data: [
              {
                name: "",
                value: 500,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: "#009cff",
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: "#009cff",
                  },
                },
              },
              {
                //画中间的图标
                name: "",
                value: 4,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: "#ffffff",
                  normal: {
                    color: "#009cff",
                    borderColor: "#009cff",
                    borderWidth: 10,
                    // borderRadius: '100%'
                  },
                },
                label: {
                  borderRadius: "100%",
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: "#009cff",
                  },
                },
              },
              {
                // 解决圆点过大后续部分显示明显的问题
                name: "",
                value: 4,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: "#009cff",
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: "#009cff",
                  },
                },
              },
              {
                //画剩余的刻度圆环
                name: "",
                value: 88,
                itemStyle: {
                  color: "rgba(9,59,118,0.95)",
                },
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: "rgba(255,255,255,0)",
                  },
                },
              },
            ],
          },
        ],
      }
      myChart.setOption(option)
    }
    onMounted(() => {
      initLine()
      initPie()
      initball()
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
        <div ref={refDiv2} class={s.demo2}></div>
        <div ref={refDiv3} class={s.demo3}></div>
      </div>
    )
  }
})