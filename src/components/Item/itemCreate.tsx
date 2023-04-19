import { defineComponent, PropType, reactive, ref } from 'vue';
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
import { hasError, validate } from '../../shared/validate';
export const itemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive<Partial<Item>>({
      kind: 'expenses',
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString()
    })
    const errors = reactive<FormErrors<typeof formData>>({
      kind: [],
      tag_ids: [],
      amount: [],
      happen_at: []
    })
    const select = ref(0)
    const { tags: expensesTags, hasMore, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        page: page + 1,
      }, {
        _mock: 'tagIndex',
        _autoLoading: true
      })
    })
    const { tags: incomeTags, hasMore: hasMore2, fetchTags: fetchTags2 } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'income',
        page: page + 1,
      }, {
        _mock: 'tagIndex'
      })
    })
    const onSelect = (tag: Tag) => {
      select.value = tag.id
      formData.tag_ids = [tag.id]
    }
    const router = useRouter()
    const onSubmit = async () => {
      Object.assign(errors, {
        kind: [],
        tag_ids: [],
        amount: [],
        happen_at: []
      })
      Object.assign(errors,validate(formData,[
        {key:'kind',type:'required',message:"类型必填"},
        {key:'tag_ids',type:'required',message:"标签必填"},
        {key:'amount',type:'required',message:"金额必填"},
        {key:'amount',type:'notEqual',value:0,message:"金额不能为0"},
        {key:'happen_at',type:'required',message:"时间必填"},
      ]))
      if(hasError(errors)){
        Dialog.alert({
          title: "出错",
          message: Object.values(errors).filter(i=>i.length>0).join('\n')
        })
        return
      }
      await http.post<Resource<Item>>('/items', formData,
        { _mock: 'itemCreate', _autoLoading: true })
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
    //* 长按编辑功能
    const timer = ref<number>()
    const currentTag = ref<HTMLDivElement>()
    const onLongPress = (id: number) => {
      console.log(id);
      router.push(`/tags/${id}/edit?kind=${formData.kind}&return_to=${router.currentRoute.value.fullPath}`)
    }
    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement
      timer.value = setTimeout(() => {
        onLongPress(tag.id)
      }, 500)
    }
    const onTouchEnd = () => {
      clearTimeout(timer.value)
    }
    const onTouchMove = (e: TouchEvent) => {
      const pointElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if (currentTag.value?.contains(pointElement) || currentTag.value === pointElement) {

      } else {
        clearTimeout(timer.value)
      }
    }
    //*
    return () => (
      <MainLayout class={s.main}>{
        {
          title: () => '记一笔',
          icon: () => <BackIcon class={s.svg} />,
          default: () => <>
            <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind} class={s.tabs}>
                <Tab value="expenses" name='支出' >
                  <div class="animate__animated animate__fadeInLeft animate__faster">
                    <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
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
                          onTouchstart={(e) => onTouchStart(e, tag)}
                          onTouchend={onTouchEnd}
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
                <Tab value="income" name='收入' >
                  <div class="animate__animated animate__fadeInRight animate__faster">
                    <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
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
                          onTouchstart={(e) => onTouchStart(e, tag)}
                          onTouchend={onTouchEnd}
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