<template>
  <div class="auto-complete-tag flex">
    <div class="selected-list">
      <div
        class="selected-list-item"
        v-for="(tag, index) in selectedTagList"
        :key="index"
      >
        {{ tag }}
      </div>
    </div>
    <input
      class="flex-1"
      type="text"
      v-model="curInput"
      ref="inputRef"
      @focus="handleFocus"
      @input="handleInput"
      @blur="handleBlur"
      @keydown="handleSearchKeydown($event)"
    />
    <div class="auto-complete-tag-panel" v-show="isShowFilterPanel">
      <div class="filter-list">
        <div
          class="filter-list-item"
          v-for="(item, index) in filterTagList"
          :key="index"
          @click="handleSelectTag(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, toRefs } from "vue";

export default {
  props: {
    tags: Array
  },
  name: "AutoCompleteTagWidget",
  setup(props, { emit }) {
    const { tags } = toRefs(props)
    let curInput = ref("");
    let selectedTagList = ref([]);
    let filterTagList = ref([]);

    const isShowFilterPanel = computed(() => {
      return filterTagList.value.length > 0;
    });

    const reset = () => {
      curInput.value = "";
    };

    const handleInput = (event) => {
      if (tags.value.includes(event.target.value)) {
        if (!filterTagList.value.includes(event.target.value)) {
          filterTagList.value.push(event.target.value);
        }
        reset();
      }
    };

    const handleSearchKeydown = (event) => {
      // 先用if else 超过3个考虑switch 或策略模式
      if (event.keyCode === 13) {
        reset();
      }
      if (event.keyCode === 8) {
        if (selectedTagList.value.length > 0) {
          selectedTagList.value.splice(selectedTagList.value.length - 1, 1);
          if (selectedTagList.value.length === 0) {
            emit('clear')
          }
        }
      }
    };

    // 暂时先支持单选 结构支持多选
    const handleSelectTag = (item) => {
      selectedTagList.value.push(item);
      filterTagList.value = [];
      emit('choose', selectedTagList.value[0]);
    };

    const handleFocus = () => {
      filterTagList.value = [];
    };

    const handleBlur = () => {
      reset();
    };

    return {
      curInput,
      selectedTagList,
      filterTagList,
      isShowFilterPanel,
      handleBlur,
      handleSearchKeydown,
      handleInput,
      handleSelectTag,
    };
  },
};
</script>
<style lang="stylus">
.auto-complete-tag {
  position: relative;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 10px 20px;
  height: 60px;

  input {
    outline: none;
    display: flex;
    align-items: center;
  }

  &-panel {
    position: absolute;
    background: #ffffff;
    width: 100%;
    left: 0px;
    right: 0px;
    bottom: -38px;
    padding: 10px 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 1px solid #e0e0e0;
  }

  .selected-list {
    display: flex;
    align-items: center;

    &-item {
      display: flex;
      align-items: center;
      // padding: 0 15px;
      // background: blue;
      // border: 1px solid #efefef;
      // border-radius: 5px;
    }
  }

  .filter-list {
    &-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      height: 30px;
      cursor: pointer;
    }
  }
}
</style>