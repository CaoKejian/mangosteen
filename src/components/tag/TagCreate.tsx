import { defineComponent, PropType, reactive, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import s from './Tag.module.scss';
import { Rules, validate } from '../../shared/validate';
import { useRouter } from 'vue-router';
import { TagForm } from './TagForm';
import { BackIcon } from '../../shared/BackIcon';
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () =><BackIcon class={s.svg}/>,
        default: () => (
          <TagForm></TagForm>
        )
      }}</MainLayout>
    )
  }
})