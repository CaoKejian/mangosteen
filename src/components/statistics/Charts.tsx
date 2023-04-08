import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import { Time } from '../../shared/time';
import { getMoney } from '../../shared/Money';

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
    const category = ref('expenses')
    const refDiv = ref<HTMLDivElement>()
    const refDiv2 = ref<HTMLDivElement>()
    const refDiv3 = ref<HTMLDivElement>()
    const data3 = reactive([
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
      { tag: { id: 2, name: '吃饭', sign: 'x' }, amount: 1000 },
      { tag: { id: 3, name: '娱乐', sign: 'x' }, amount: 900 },
    ])
    const data = [
      ['2018-01-01T00:00:00.000+0800', 150],
      ['2018-01-02T00:00:00.000+0800', 230],
      ['2018-01-03T00:00:00.000+0800', 224],
      ['2018-01-04T00:00:00.000+0800', 218],
      ['2018-01-05T00:00:00.000+0800', 135],
      ['2018-01-06T00:00:00.000+0800', 147],
      ['2018-01-07T00:00:00.000+0800', 260],
      ['2018-01-08T00:00:00.000+0800', 300],
      ['2018-01-09T00:00:00.000+0800', 200],
      ['2018-01-10T00:00:00.000+0800', 300],
      ['2018-01-11T00:00:00.000+0800', 400],
      ['2018-01-12T00:00:00.000+0800', 500],
      ['2018-01-13T00:00:00.000+0800', 400],
      ['2018-01-14T00:00:00.000+0800', 300],
      ['2018-01-15T00:00:00.000+0800', 200],
      ['2018-01-16T00:00:00.000+0800', 100],
      ['2018-01-17T00:00:00.000+0800', 200],
      ['2018-01-18T00:00:00.000+0800', 300],
      ['2018-01-19T00:00:00.000+0800', 400],
      ['2018-01-20T00:00:00.000+0800', 500],
      ['2018-01-21T00:00:00.000+0800', 600],
      ['2018-01-22T00:00:00.000+0800', 700],
      ['2018-01-23T00:00:00.000+0800', 800],
      ['2018-01-24T00:00:00.000+0800', 900],
      ['2018-01-25T00:00:00.000+0800', 1000],
      ['2018-01-26T00:00:00.000+0800', 1100],
      ['2018-01-27T00:00:00.000+0800', 1200],
      ['2018-01-28T00:00:00.000+0800', 1300],
      ['2018-01-29T00:00:00.000+0800', 1400],
      ['2018-01-30T00:00:00.000+0800', 1500],
      ['2018-01-31T00:00:00.000+0800', 1600],
    ]
    const betterData3 = computed(() => {
      const total = data3.reduce((sum, item) => sum + item.amount, 0)
      return data3.map(item => ({
        ...item,
        percent: Math.round(item.amount / total * 100) + '%'
      }))
    })

    const initLine = () => {
      if (refDiv.value === undefined) return
      var myChart = echarts.init(refDiv.value);
      const option = {
        grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],
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
        series: [{
          type: 'line',
          smooth: true,
          symbolSize: 5,
          showSymbol: false,
          data: data,
          itemStyle: {
            // color: '#38D0FB',
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
          },

        },],
      };
      myChart.setOption({
        ...option,
      })
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