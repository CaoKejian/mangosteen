import { defineComponent, PropType} from 'vue';
import s from './first.module.scss';
export const Second= defineComponent({
  props:{
    name:{
      type:String as PropType<string>
    }
  },
  setup:(props,context)=>{
    return ()=>(
        <div>Second
        </div>
    )
  }
})