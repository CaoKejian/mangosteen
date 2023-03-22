import { defineComponent, PropType} from 'vue';
import s from './itemList.module.scss';
export const itemList= defineComponent({
  props:{
    name:{
      type:String as PropType<string>
    }
  },
  setup:(props,context)=>{
    return ()=>(
        <div>
        </div>
    )
  }
})