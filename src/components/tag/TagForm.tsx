import { defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { Button } from '../../shared/Button';
import { hasError, Rules, validate } from '../../shared/validate';
import { useRoute, useRouter } from 'vue-router'
import s from './Tag.module.scss';
import { EmojiSelect } from '../../shared/emojiSelect';
import { http } from '../../shared/Http';
import { Dialog } from 'vant';
export const TagForm = defineComponent({
  props: {
    id: Number
  },
  setup: (props, context) => {
    const router = useRouter()
    const route = useRoute()
    if (!route.query.kind) {
      return () => <div>参数错误</div>
    }
    const formData = reactive<Partial<Tag>>({
      id: undefined,
      kind: route.query.kind.toString() as ('expenses' | 'income'),
      name: '',
      sign: '',
    })
    const activeLabel = ref(false)
    const activeName = ref(false)
    const errors = reactive<FormErrors<typeof formData>>({})
    const cancel = () => {
      formData.sign = ''
    }
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: "必填" },
        { key: 'name', type: 'pattern', regex: /^.{1,6}$/, message: "只能填1到6个字符" },
        { key: 'sign', type: 'required', message: "必填" }
      ]
      Object.assign(errors, {
        name: [],
        sign: []
      })
      Object.assign(errors, validate(formData, rules))
      if (errors.name?.length !== 0) {
        activeName.value = true
        setTimeout(() => {
          activeName.value = false
        }, 1000);
      } if (errors.sign?.length !== 0) {
        activeLabel.value = true
        setTimeout(() => {
          activeLabel.value = false
        }, 1000);
        return
      } else {
        if (!hasError(errors)) {
          const promise = await formData.id ?
            http.patch(`/tags/${formData.id}`, formData, {
              _mock: 'tagEdit', _autoLoading: true
            }) :
            http.post('/tags', formData, {
              _mock: 'tagCreate', _autoLoading: true
            })
          await promise.catch(error => {
            if (error.response.status === 422) {
              Dialog.alert({
                title: "出错",
                message: Object.values(error.response.data.errors).join('\n')
              })
            }
            throw error
          })
          router.back()
        }
      }
    }
    onMounted(async () => {
      formData.id = props.id
      if (!props.id) return
      const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, {
      }, {
        _mock: 'tagShow'
      })
      Object.assign(formData, response.data.resource)
    })
    return () => (
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
            <Button type='submit' class={[s.formItem, s.button]}>确定</Button>
          </div>
        </div>
      </form>
    )
  }
})