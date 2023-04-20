import { defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import s from './OverLay.module.scss';
import 'animate.css'
import { Dialog } from 'vant';
import { useMeStore } from '../stores/useMeStore';
export const OverLay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const close = () => {
      props.onClose?.()
    }
    const route = useRoute()
    const me = ref<User>()
    const meStore = useMeStore()
    const state = reactive({
      showActive: false,
      showActive2: false,
    })
    onMounted(async () => {
      if (route.path === '/items') {
        state.showActive = true
      } else if (route.path === '/statistics') {
        state.showActive2 = true
      } else {
        state.showActive = false
        state.showActive2 = false
      }
      const response = await meStore.mePromise
      me.value = response?.data.resource
    })
    const onClick = (i: number) => {
      props.onClose?.()
      if (i === 1) {
        if (!state.showActive) return
        Dialog.alert({ title: "提示", message: '你已在记账页面' })
      } else {
        if (!state.showActive2) return
        Dialog.alert({ title: "提示", message: '你已在图标页面' })
      }
    }
    const onSignOut = async () => {
      await Dialog.confirm({
        title: "提示",
        message: "你真的要退出登录吗？"
      })
      localStorage.removeItem('jwt')
      window.location.reload()
    }
    return () => (<>
      <div class={s.mask} onClick={close}></div>
      <div class={`animate__animated animate__fadeInLeft animate__faster ${s.overlay}`}>
        <section class={s.currentUser}>
          {me.value ?
            <div class={s.currentUser_email}>
              <h2>{me.value.email}</h2>
              <p onClick={onSignOut}>点击这里注销</p>
            </div> :
            <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
              <h2>未登录用户</h2>
              <p>点击登录</p>
            </RouterLink>
          }
        </section>
        <nav>
          <ul class={s.action_list}>
            <li>
              <RouterLink to="/items" class={state.showActive ? s.active : s.action}>
                <svg class={s.icon}><use xlinkHref='#pig'></use></svg>
                <span onClick={() => onClick(1)}>记账</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/statistics" class={state.showActive2 ? s.active : s.action}>
                <svg class={s.icon}><use xlinkHref='#charts'></use></svg>
                <span onClick={() => onClick(2)}>统计图表</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/export" class={s.action}>
                <svg class={s.icon}><use xlinkHref='#export'></use></svg>
                <span>导出数据</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/notify" class={s.action}>
                <svg class={s.icon}><use xlinkHref='#notify'></use></svg>
                <span>记账提醒</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
    )
  }
})
