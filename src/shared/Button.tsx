import { defineComponent} from 'vue';
import s from './Button.module.scss'

interface Props{
  onClick?:(e: MouseEvent) => void
}

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