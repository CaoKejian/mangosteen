<template>
  <div v-move class="box">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
defineProps<{
  width: string
  height?: string
  top?: string
  left?: string
  bgColor?: string
}>()
const vMove: Directive = {
  mounted(el: HTMLElement) {
    const moveEl = el.firstElementChild as HTMLElement
    const mouseDown = (e: MouseEvent) => {
      const innerWidth = window.innerWidth - el.clientWidth
      const innerHeight = window.innerHeight - el.clientHeight
      // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      const X = e.clientX - el.offsetLeft
      const Y = e.clientY - el.offsetTop
      const move = (e: MouseEvent) => {
        if (e.clientX - X < 0) return
        if (e.clientY - Y < 0) return
        if (e.clientX - X > innerWidth) return
        if (e.clientY - Y > innerHeight) return
        el.style.left = e.clientX - X + 'px'
        el.style.top = e.clientY - Y + 'px'
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
      })
    }
    moveEl.addEventListener('mousedown', mouseDown)
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  left: v-bind(left);
  top: v-bind(top);
  width: v-bind(width);
  height: v-bind(height);
  background-color: v-bind(bgColor);
  border-radius: 8px;
  z-index: 1000;

  .header {
    min-height: 20px;
    cursor: move;
  }
}
</style>
