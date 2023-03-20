import { defineComponent, PropType} from 'vue';
import s from './first.module.scss';
export const Third= defineComponent({
  props:{
    name:{
      type:String as PropType<string>
    }
  },
  setup:(props,context)=>{
    return ()=>(
        <div>Third
        </div>
    )
  }
})