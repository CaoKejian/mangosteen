import { Button } from '../../shared/Button';
import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
import { BackIcon } from '../../shared/BackIcon';
import { useRoute, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { Dialog } from 'vant';
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => {
        <div>id 不存在</div>
      }
    }
    const router = useRouter()
    const onDelete = async(options?: {withItems?: boolean} ) =>{
      await Dialog.confirm({
        title:"提示",
        message:"确认删除吗？"
      })
      await http.delete(`/tags/${numberId}`,{
        withItems: options?.withItems? 'true' : 'false'
      })
      router.back()
    }
    const onDeleteHard = () =>{

    }
    return () => (
      <MainLayout>{{
        title: () => '编辑标签',
        icon: () => <BackIcon class={s.svg} />,
        default: () => <>
          <TagForm id={numberId} />
          <div class={s.actions}>
            <Button level='danger' class={s.removeTags} onClick={() =>onDelete()}>删除标签</Button>
            <Button level='danger' class={s.removeTagsAndItems} onClick={()=>onDelete({withItems: true})}>删除标签和记账</Button>
          </div>
        </>
      }}</MainLayout>
    )
  }
})