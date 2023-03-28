import { defineComponent, PropType, reactive, ref, toRaw } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import s from './TagCreate.module.scss';
import { EmojiSelect } from '../../shared/emojiSelect';
import { Rules, validate } from '../../shared/validate';
import { useRouter } from 'vue-router';
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const router = useRouter()
    const formData = reactive({
      name: '',
      sign: '',
    })
    const errors = reactive<{
      [k in keyof typeof formData]?: string[]
    }>({})
    const activeLabel = ref(false)
    const activeName = ref(false)
    const cancel = () => {
      formData.sign = ''
    }
    const onSubmit = (e: Event) => {

      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: "必填" },
        { key: 'name', type: 'pattern', regex: /^.{1,6}$/, message: "只能填1到6个字符" },
        { key: 'sign', type: 'required', message: "必填" }
      ]
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
      if (errors['sign']?.[0]) {
        activeLabel.value = true
        setTimeout(() => {
          activeLabel.value = false
        }, 1000);
      } else if (errors['name']?.[0]) {
        activeName.value = true
        setTimeout(() => {
          activeName.value = false
        }, 1000);
      } else {
        router.push('/items/create')
      }
      e.preventDefault()
    }
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <svg class={s.svg}><use xlinkHref='#return'></use></svg>,
        default: () => (
          <form class={s.form} onSubmit={onSubmit}>
            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>标签名</span>
                <div class={activeName.value == false ? s.formItem_value : s.active}>
                  <input v-model={formData.name} class={[s.formItem, s.input, s.error]}></input>
                </div>
                <div class={s.formItem_errorHint}>
                  <span>{errors['name'] ? errors['name']?.[0] : '　'}</span>
                </div>
              </label>
            </div>
            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name} onClick={cancel}>符号 {formData.sign ? formData.sign + ' ×' : ''} </span>
                <div class={activeLabel.value == false ? s.formItem_value : s.active} >
                  <EmojiSelect v-model={formData.sign} class={[s.formItem, s.emojiList, s.error]} />
                </div>
                <div class={s.formItem_errorHint}>
                  <span>{errors['sign'] ? errors['sign']?.[0] : '　'}</span>
                </div>
              </label>
            </div>
            <p class={s.tips}>记账时长按标签即可进行编辑</p>
            <div class={s.formRow}>
              <div class={s.formItem_value}>
                <Button class={[s.formItem, s.button]}>确定</Button>
              </div>
            </div>
          </form>
        )
      }}</MainLayout>
    )
  }
})