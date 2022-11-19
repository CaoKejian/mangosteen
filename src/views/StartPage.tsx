import { defineComponent} from 'vue';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/icon';
import s from './StartPage.module.scss'
export const StartPage= defineComponent({
  setup:(props,context)=>{
    return ()=>(
        <div>
          <nav>menu</nav>
          <Center class={s.pig_wrapper}>
            <Icon name='pig' class={s.pig}/>
          </Center>
          <div class={s.button_wrapper}>
            <Button class={s.button}>测试</Button>
          </div>
          <FloatButton iconName='add'/>
        </div>
    )
  }
})