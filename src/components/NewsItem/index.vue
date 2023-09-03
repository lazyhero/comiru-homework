<template>
  <div class="news-item h-30 box-border rounded-lg shadow-lg py-4">
    <div class="flex py-2">
      <div class="flex-1">
        <div class="news-item-title text-lg font-bold">
          {{data.title}}
        </div>
        <div class="news-item-content">
          {{data.content}}
        </div> 
      </div>
      <div>
        <ImageLazyload class="news-item-cover rounded-lg overflow-hidden" :src="data.cover_image"></ImageLazyload>
      </div>
    </div>
    <div class="text-sm text-gray-400">
      {{ formatTime(data.create_date) }}
    </div>
  </div>
</template>

<script>
import ImageLazyload from '@/components/ImageLazyload/index.vue'
import { formatTime } from '@/utils/date'

export default {
  name: 'NewsItem',
  components: {
    ImageLazyload,
  },
  props: {
    data: Object
  },
  setup() {
    return {
      formatTime,
    }
  },
}
</script>
<style lang="stylus" scoped>
.news-item
  padding 10px 20px
  &-title
    cursor pointer
  &-content
    height: 75px
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis; 
  &-cover
    width 100px
    height 100px
</style>