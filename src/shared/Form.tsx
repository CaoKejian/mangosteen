import { format } from 'echarts';
import { Popup, DatetimePicker } from 'vant';
import { computed, defineComponent, PropType, ref } from 'vue';
import { Button } from './Button';
import { EmojiSelect } from './emojiSelect';
import s from './Form.module.scss';
import { Time } from './time';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})

export const FormItem = defineComponent({
  props: {
    onCancel: {
      type: Function as PropType<(e: Event) => void>
    },
    label: {
      type: String
    },
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationcode' | 'select'>
    },
    error: {
      type: String
    },
    placeholder: String,
    options: Array as PropType<Array<{ value: string, text: string }>>,
    px: String,
    onClick: Function as PropType<() => void>,
    countForm: {
      type: Number,
      default: 60
    }
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const refDateVisible = ref(false)
    const timer = ref<number>()
    const count = ref<number>(props.countForm)
    const isCounting: any = computed(() => !!timer.value)
    const onClickSendValidationCode = () => {
      props.onClick?.()
      timer.value = setInterval(() => {
        count.value -= 1
        if (count.value == 0) {
          clearInterval(timer.value)
          timer.value = undefined
          count.value = props.countForm
        }
      }, 1000)
    }
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input value={props.modelValue}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            placeholder={props.placeholder}
            class={[s.formItem, s.input]}
          ></input>
        case 'emojiSelect':
          return <EmojiSelect
            modelValue={props.modelValue?.toString()}
            onUpdateModelValue={value => context.emit('update:modelValue', value)}
          >
          </EmojiSelect>
        case 'validationcode':
          return <>
            <input class={[s.formItem, s.input, s.validationcode]}
              onInput={(e: any) => context.emit('update:modelValue', e.target.value)} placeholder={props.placeholder}
            />
            <Button disabled={isCounting.value} onClick={onClickSendValidationCode} class={s.validationcodeButton}>{isCounting.value ? `${count.value}s后可重新发送` : '发送验证码'}</Button>
          </>
        case 'select':
          return <select class={[s.formItem, s.select]}
            onChange={((e: any) => { context.emit('update:modelValue', (e.target.value)) })}
            value={props.modelValue}
          >
            {props.options?.map(options =>
              <option value={options.value} >{options.text}</option>)}
          </select>
        case 'date':
          return <>
            <input readonly={true} value={props.modelValue}
              placeholder={props.placeholder}
              onClick={() => { refDateVisible.value = true }}
              class={[s.formItem, s.input]} />
            <Popup position='bottom' v-model:show={refDateVisible.value}>
              <DatetimePicker value={props.modelValue} type="date" title="选择年月日" min-date={new Date(2023, 1, 1)} max-date={new Date()}
                onConfirm={(date: Date) => {
                  context.emit('update:modelValue', new Time(date).format())
                  refDateVisible.value = false
                }}
                onCancel={() => refDateVisible.value = false} />
            </Popup>
          </>
        case undefined:
          return context.slots.default?.()
      }
    })
    return () => (
      <div class={s.formRow}>
        <label class={props.px === 'level' ? s.selected : s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          {props.error &&
            <div class={s.forItem_errorHint}>
              <span class={s.forItem_span}>{props.error}</span>
            </div>
          }
        </label >
      </div >
    )
  }
})