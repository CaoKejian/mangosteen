import { defineComponent, PropType, ref} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tab, Tabs } from '../../shared/Tabs';
import s from './ItemCreate.module.scss';
export const ItemCreate= defineComponent({
  props:{
    name:{
      type:String as PropType<string>
    }
  },
  setup:(props,context)=>{
    const refkind = ref('支出')
    return ()=>(
      // {{ 是一个{ + 一个object 中间不能有空格 不然会不渲染页面
      <MainLayout>{
        {
          title:()=> '记一笔',
          icon:()=> <Icon name='left' class={s.navIcon}></Icon>,
          default:()=> <>
            {/* <Tabs selected={refkind.value} onUpdateSelected = {(name) => refkind.value = name}> */}
            <Tabs v-model:selected={refkind.value}>
              <Tab name='支出'>
                icon 
              </Tab>
              <Tab name='收入'>
                icon
              </Tab>
            </Tabs>
          </>
        }
      }
      </MainLayout>
    )
  }
})