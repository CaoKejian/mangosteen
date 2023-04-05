import { defineComponent, PropType, reactive, ref } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { Rules, validate } from '../shared/validate';
import s from './SignInPage.module.scss';
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      email: '',
      code: ''
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const onSubmit = (e: Event) => {
      e.preventDefault()
      const reules: Rules<typeof formData> = [
        { key: 'email', type: 'required', message: '必填' },
        { key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址' },
        { key: 'code', type: 'required', message: '必填' },
      ]
      Object.assign(errors, {
        email: undefined, code: undefined
      })
      Object.assign(errors, validate(formData, reules))
      console.log(errors);

    }
    const onClickSendValidationCode = () => {
      console.log(111);

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
                <FormItem label='验证码' type='validationcode'
                  placeholder='请输入六位数字'
                  onClick={onClickSendValidationCode}
                  v-model={formData.code} error={errors.code?.[0] ?? '　'}
                ></FormItem>
                <FormItem style={{ paddingTop: '28px' }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }
      }</MainLayout>
    )
  }
})