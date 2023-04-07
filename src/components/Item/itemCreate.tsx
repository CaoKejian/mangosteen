import { faker } from '@faker-js/faker';
import { defineComponent, onMounted, onUpdated, PropType, reactive, ref, watch } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { http } from '../../shared/Http';
import { Tab, Tabs } from '../../shared/Tabs';
import { useTags } from '../../shared/useTags';
import { InputPad } from './InputPad';
import s from './itemCreate.module.scss';
import 'animate.css';
import { RouterLink, useRouter } from 'vue-router';
import { Dialog } from 'vant';
import { BackIcon } from '../../shared/BackIcon';
export const itemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive<{
      kind: string
      tags_id: number[]
      amount: number
      happen_at: string
    }
    >({
      kind: "支出",
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString()
    })
    const select = ref(0)
    const { tags: expensesTags, hasMore, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        page: page + 1,
        _mock: 'tagIndex'
      })
    })
    const { tags: incomeTags, hasMore: hasMore2, fetchTags: fetchTags2 } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'income',
        page: page + 1,
        _mock: 'tagIndex'
      })
    })
    const onSelect = (tag: Tag) => {
      select.value = tag.id
      formData.tags_id = [tag.id]
    }
    const router = useRouter()
    const onSubmit = async () => {
      await http.post<Resource<Item>>('/items', formData,
        { params: { _mock: 'itemCreate' } })
        .catch(error => {
          if (error.response.status === 422) {
            Dialog.alert({
              title: "出错",
              message: Object.values(error.response.data.errors).join('\n')
            })
          }
          throw error
        })
      Dialog.alert({
        title: "提示",
        message: '保存成功'
      })
      router.push("/items")
    }
    return () => (
      <MainLayout class={s.main}>{
        {
          title: () => '记一笔',
          icon: () => <BackIcon class={s.svg} />,
          default: () => <>
            <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind} class={s.tabs}>
                <Tab name='支出' >
                  <div class="animate__animated animate__fadeInLeft animate__faster">
                    <div class={s.tags_wrapper}>
                      <RouterLink to={'/tags/create?kind=expenses'} class={s.tag}>
                        <div class={s.sign}>
                          <svg class={s.createTag}><use xlinkHref='#add'></use></svg>
                        </div>
                        <div class={s.name}>
                          新增
                        </div>
                      </RouterLink>
                      {expensesTags.value.map(tag =>
                        <div class={[s.tag, select.value === tag.id ? s.selected : '']}
                          onClick={() => onSelect(tag)}
                        >
                          <div class={s.sign}>
                            {tag.sign}
                          </div>
                          <div class={s.name}>
                            {tag.name}
                          </div>
                        </div>
                      )}
                    </div>
                    <div class={s.loadMore_wrapper}>
                      {hasMore.value ?
                        <Button class={s.loadMore} onClick={fetchTags}>加载更多</Button> :
                        <span class={s.noMore}>没有更多了</span>
                      }
                    </div>
                  </div>
                </Tab>
                <Tab name='收入' >
                  <div class="animate__animated animate__fadeInRight animate__faster">
                    <div class={s.tags_wrapper} >
                      <RouterLink to={'/tags/create?kind=income'} class={s.tag}>
                        <div class={s.sign}>
                          <svg class={s.createTag}><use xlinkHref='#add'></use></svg>
                        </div>
                        <div class={s.name}>
                          新增
                        </div>
                      </RouterLink>
                      {incomeTags.value.map(tag =>
                        <div class={[s.tag, select.value === tag.id ? s.selected : '']}
                          onClick={() => onSelect(tag)}
                        >
                          <div class={s.sign}>
                            {tag.sign}
                          </div>
                          <div class={s.name}>
                            {tag.name}
                          </div>
                        </div>
                      )}
                    </div>
                    <div class={s.loadMore_wrapper}>
                      {hasMore2.value ?
                        <Button class={s.loadMore} onClick={fetchTags2}>加载更多</Button> :
                        <span class={s.noMore}>没有更多了</span>
                      }
                    </div>
                  </div>
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad
                  v-model:happenAt={formData.happen_at}
                  v-model:amount={formData.amount}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          </>
        }
      }</MainLayout>
    )
  }
})