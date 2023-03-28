import { Button } from '../../shared/Button';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { EmojiSelect } from '../../shared/emojiSelect';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagExit = defineComponent({

  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <svg class={s.svg}><use xlinkHref='#return'></use></svg>,
        default: () => <>
          <TagForm />
          <div class={s.actions}>
            <Button level='danger' class={s.removeTags} onClick={() => { }}>删除</Button>
            <Button level='danger' class={s.removeTagsAndItems} onClick={() => { }}>删除标签和记账</Button>
          </div>
        </>
      }}</MainLayout>
    )
  }
})