<template>
  <div class="pagination flex justify-center items-center box-border border-solid border-2 border-slate-200 rounded-lg shadow-lg py-4">
    <div class="pagination-control prev px-2" v-show="isShowPrevControl" @click="prev">上一页</div>
    <div class="pagination-control next px-2" v-show="isShowNextControl" @click="next">下一页</div>
  </div>
</template>

<script>
import { ref, computed, toRefs } from "vue";

export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    const { total, pageSize } = toRefs(props)
    const page = ref(1);

    const isShowPrevControl = computed(() => {
      return page.value > 1
    })
    const isShowNextControl = computed(() => {
      return page.value < total.value
    })

    function prev() {
      if (page.value > 1) {
        page.value--;
        emit('change', page.value)
      }
    }

    function next() {
      if (page.value < total.value) {
        page.value++;
        emit('change', page.value)
      }
    }

    return {
      isShowPrevControl,
      isShowNextControl,
      page,
      prev,
      next,
    };
  },
};
</script>
<style lang="stylus" scoped>
.pagination-control
  cursor pointer
</style>