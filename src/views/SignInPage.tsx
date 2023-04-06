import axios from 'axios';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBool } from '../hooks/useBool';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { history } from '../shared/history';
import { http } from '../shared/Http';
import { refreshMe } from '../shared/me';
import { hasError, Rules, validate } from '../shared/validate';
import s from './SignInPage.module.scss';
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
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
      console.log(1);
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
        const response = await http.post<{ jwt: string }>('/session', formData)
        .catch(onError)
        console.log(response)
        localStorage.setItem('jwt', response.data.jwt)
        /*
          第一种方式 localstorage
          第二种方式 return_to
        */
        // const returnTo = localStorage.getItem('returnto')
        // router.push(returnTo ? returnTo : '/' )
        //  router.push('/sign_in?return_to='+ encodeURIComponent(route.fullPath))
        const returnTo = route.query.return_to?.toString()
        refreshMe().then(() => {
          router.push(returnTo || '/')
        }, () => {
          window.alert('登陆失败')
        })
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
      const response = await http
        .post('/validation_codes', { email: formData.email })
        .catch(onError)
        .finally(off)
      //成功
      refValidationCode.value.startCount()
    }
    return () => (
      <MainLayout>{
        {
          title: () => '登录',
          icon: () => <svg class={s.svg}><use xlinkHref='#return'></use></svg>,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <svg class={s.logo_svg}><use xlinkHref='#mangosteen'></use></svg>
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem label='邮箱地址' type='text' v-model={formData.email}
                  placeholder='请输入邮箱，然后点击发送验证码' error={errors.email?.[0] ?? '　'}></FormItem>
                <FormItem ref={refValidationCode} countForm={1} label='验证码' type='validationcode'
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