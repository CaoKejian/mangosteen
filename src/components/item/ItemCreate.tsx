import { defineComponent, PropType} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import s from './ItemCreate.module.scss';
export const ItemCreate= defineComponent({
  props:{
    name:{
      type:String as PropType<string>
    }
  },
  setup:(props,context)=>{
    return ()=>(
      // {{ 是一个{ + 一个object 中间不能有空格 不然会不渲染页面
      <MainLayout>{
        {
          title:()=> '记一笔',
          icon:()=> <Icon name='left' class={s.navIcon}></Icon>,
          default:()=> <>
            <div>main</div>
          </>
        }
      }
      </MainLayout>
    )
  }
})