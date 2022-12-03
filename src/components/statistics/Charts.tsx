import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';

import * as echarts from 'echarts';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';


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
    
    return () => (
      <div class={s.wrapper}>
        <FormItem label='类型' type='select' class={s.form} options={[
          { value: "expenses", text: '支出' },
          { value: "income", text: '收入' },
        ]} v-model={category.value} />
        <LineChart/>
        <PieChart/>
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