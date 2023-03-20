import { defineComponent, PropType } from 'vue';
export const Bar = defineComponent({
  setup: () => {
    return () => (<>
      <div>Bar
      </div>
    </>
    )
  }
})