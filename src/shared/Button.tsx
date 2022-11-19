import { defineComponent} from 'vue';
import s from './Button.module.scss'
export const Button= defineComponent({
  setup:(props,context)=>{
    return ()=>(
        <div>
            <button class={s.button}>
                {context.slots.default?.()}
            </button>
        </div>
    )
  }
})