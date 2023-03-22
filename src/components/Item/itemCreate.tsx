import { defineComponent, PropType} from 'vue';
import s from './itemCreate.module.scss';
export const itemCreate= defineComponent({
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