import { faker } from '@faker-js/faker';
import { defineComponent, onMounted, onUpdated, PropType, ref, watch } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { http } from '../../shared/Http';
import { Tab, Tabs } from '../../shared/Tabs';
import { useTags } from '../../shared/useTags';
import { InputPad } from './InputPad';
import s from './itemCreate.module.scss';
import 'animate.css';
export const itemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refkind = ref('支出')
    const select = ref(0)
    const refHappenAt = ref<string>(new Date().toISOString())
    const refAmount = ref<number>(0)
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
    }
    return () => (
      <MainLayout class={s.main}>{
        {
          title: () => '记一笔',
          icon: () => <svg class={s.svg}><use xlinkHref='#return'></use></svg>,
          default: () => <>
            <div class={s.wrapper}>
              <Tabs v-model:selected={refkind.value} class={s.tabs}>
                <Tab name='支出' >
                  {refAmount.value}
                  <div class="animate__animated animate__fadeInLeft animate__faster">
                    <div class={s.tags_wrapper}>
                      <div class={s.tag}>
                        <div class={s.sign}>
                          <svg class={s.createTag}><use xlinkHref='#add'></use></svg>
                        </div>
                        <div class={s.name}>
                          新增
                        </div>
                      </div>
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
                      <div class={s.tag}>
                        <div class={s.sign}>
                          <svg class={s.createTag}><use xlinkHref='#add'></use></svg>
                        </div>
                        <div class={s.name}>
                          新增
                        </div>
                      </div>
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
                  v-model:happenAt={refHappenAt.value}
                  v-model:amount={refAmount.value}
                />
              </div>
            </div>
          </>
        }
      }</MainLayout>
    )
  }
})