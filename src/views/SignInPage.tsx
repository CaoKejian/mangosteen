import axios from 'axios';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBool } from '../hooks/useBool';
import { MainLayout } from '../layouts/MainLayout';
import { BackIcon } from '../shared/BackIcon';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { http } from '../shared/Http';
import { hasError, Rules, validate } from '../shared/validate';
import { useMeStore } from '../stores/useMeStore';
import s from './SignInPage.module.scss';
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const meSotre = useMeStore()
    const formData = reactive({
      email: '1849201815@qq.com',
      code: ''
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const refValidationCode = ref<any>('')
    const { ref: refDisabled, toggle, on, off } = useBool(false)
    const router = useRouter() //两种方式存储路由
    const route = useRoute()
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        email: [], code: []
      })
      const reules: Rules<typeof formData> = [
        { key: 'email', type: 'required', message: '必填' },
        { key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址' },
        { key: 'code', type: 'required', message: '必填' },
      ]
      Object.assign(errors, validate(formData, reules))
      if (!hasError(errors)) {
        const response = await http.post<{ jwt: string }>('/session', formData, { _autoLoading: true })
          .catch(onError)
        localStorage.setItem('jwt', response.data.jwt)
        /*
          第一种方式 localstorage
          第二种方式 return_to
        */
        // const returnTo = localStorage.getItem('returnto')
        // router.push(returnTo ? returnTo : '/' )
        //  router.push('/sign_in?return_to='+ encodeURIComponent(route.fullPath))
        const returnTo = route.query.return_to?.toString()
        meSotre.refreshMe()
        router.push(returnTo || '/')
      }
    }
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
      throw error
    }
    const onClickSendValidationCode = async () => {
      on()
      await http
        .post('/validation_codes', { email: formData.email }, {
          _autoLoading: true
        })
        .catch(onError)
        .finally(off)
      //成功
      refValidationCode.value.startCount()
    }
    return () => (
      <MainLayout>{
        {
          title: () => '登录',
          icon: () => <BackIcon class={s.svg} />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <svg class={s.logo_svg}><use xlinkHref='#mangosteen'></use></svg>
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem label='邮箱地址' type='text' v-model={formData.email}
                  placeholder='请输入邮箱，然后点击发送验证码' error={errors.email?.[0] ?? '　'}></FormItem>
                <FormItem ref={refValidationCode} countForm={60} label='验证码' type='validationcode'
                  placeholder='请输入六位数字'
                  disabled={refDisabled.value}
                  onClick={onClickSendValidationCode}
                  v-model={formData.code} error={errors.code?.[0] ?? '　'}
                ></FormItem>
                <FormItem style={{ paddingTop: '28px' }}>
                  <Button type='submit'>登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }
      }</MainLayout>
    )
  }
})
export default SignInPage
