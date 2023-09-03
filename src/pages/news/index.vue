<template>
  <div>
    <div>
      <!-- 正常此处应该再封装一层 比如search-bar 将auto complete逻辑封装进去 -->
      <!-- tags 可以替换为 fetch function 由外部定义查询方法 更合理 时间关系 先传入数据 利用内部处理 -->
      <AutoCompleteTagWidget @clear="handleTagClear" @choose="handleChoose" :tags="tagList"></AutoCompleteTagWidget>
    </div>
    <div>
      <NewsItem v-for="item in datas" :data="item" :key="item.id"> </NewsItem>
    </div>
    <div class="mt-2" v-show="!isSearchView">
      <Pagination
        :pageSize="10"
        :total="total"
        @change="handlePaginationChange"
      ></Pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, onBeforeMount } from "vue";
import NewsItem from "@/components/NewsItem/index.vue";
import AutoCompleteTagWidget from "@/components/AutoCompleteTagWidget/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { getNewsList, getNewsListByTag } from "@/services/news";
import { getTagList } from "@/services/tags";

export default {
  name: "NewsIndex",
  components: {
    NewsItem,
    AutoCompleteTagWidget,
    Pagination,
  },
  setup() {
    const datas = ref([]);
    let total = ref(0);
    let tagList = ref([])
    let isSearchView = ref(false)

    const fetchData = (page?: number, pageSize?: number) => {
      const result = getNewsList(page, pageSize);
      datas.value = result.data;
      total.value = result.total;
    };

    const handleTagClear = () => {
      isSearchView.value = false
      init()
    }

    const handlePaginationChange = (payload: number) => {
      fetchData(payload);
    };

    const handleChoose = (payload: string) => {
      const result = getNewsListByTag(payload)
      if (result) {
        // TODO 这个位置应该用另一层视图来渲染 而不是借用列表
        datas.value = result
      }
      isSearchView.value = true
    }

    const init = () => {
      tagList.value = getTagList()
      fetchData()
    }

    onBeforeMount(init);

    return {
      total,
      datas,
      tagList,
      isSearchView,
      handleChoose,
      handlePaginationChange,
      handleTagClear,
    };
  },
};
</script>
<style lang="stylus"></style>