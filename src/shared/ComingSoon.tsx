import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from './Button'
import s from './ComingSoon.module.scss'
export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const router = useRouter()
    const onClick = () => {
      router.back()
    }
    return () => (
      <div>
        <div class={s.svg_wrapper}>
          <svg>
            <use xlinkHref='#pig'></use>
          </svg>
        </div>
        <p class={s.text}>敬请期待</p>
        <p class={s.link} >
          <Button onClick={onClick}>返回</Button>
        </p>
      </div>
    )
  }
})
export default ComingSoon
