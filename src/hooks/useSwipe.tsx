import { computed, onMounted, onUnmounted, ref, Ref } from "vue";

type Point = {
  x: number;
  y: number;
}
interface Options{
  beforeStart?:(e:TouchEvent) => void
  afterStart?:(e:TouchEvent) => void
  beforeMove?:(e:TouchEvent) => void
  afterMove?:(e:TouchEvent) => void
  beforeEnd?:(e:TouchEvent) => void
  afterEnd?:(e:TouchEvent) => void
}
// options 传进去用于判断是否让不让背景跟着动的事件
export const useSwipe = (element: Ref<HTMLElement | undefined>,options:Options) => {
  const start = ref<Point>()
  const end = ref<Point>()
  const swiping = ref(false)
  const distance = computed(() => {
    if (!start.value || !end.value) { return null }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    }
  })
  const direction = computed(() => {
    if (!distance.value) { return '' }
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })
  const onStart = (e: TouchEvent) => {
//左滑的时候不让背景滑动 判断让他触发不
    options?.beforeStart?.(e)
    swiping.value = true
    end.value = start.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
    options?.afterStart?.(e)
  }
  const onMove = (e: TouchEvent) => {
    options?.afterMove?.(e)
    if (!start.value) { return }
    end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY, }
    options?.beforeMove?.(e)
  }
  const onEnd = (e: TouchEvent) => {
    options?.afterEnd?.(e)
    swiping.value = false
    options?.beforeEnd?.(e)
  }

  onMounted(() => {
    if (!element.value) { return }
    element.value.addEventListener('touchstart', onStart)
    element.value.addEventListener('touchmove', onMove)
    element.value.addEventListener('touchend', onEnd)
  })
  onUnmounted(() => {
    if (!element.value) { return }
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMove)
    element.value.removeEventListener('touchend', onEnd)
  })
  return {
    swiping,
    direction,
    distance,
  }
}