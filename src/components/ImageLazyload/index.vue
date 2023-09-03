您好,这里是使用 Vue 3 和 IntersectionObserver API 来实现图片懒加载的代码:

```vue
<template>
  <div class="image-lazyload">
    <img @load="loadImage" ref="image" />
    <div
      v-show="!isLoaded"
      class="image-lazyload-placeholder flex"
    >
      <img class="animate-spin" src="../../assets/loading.svg" alt="loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, toRefs } from "vue";

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { src } = toRefs(props);
    const image = ref<HTMLImageElement | null>(null);
    const isLoaded = ref(false);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries || !entries.length || isLoaded.value) {
          return;
        }
        if (entries[0].isIntersecting) {
          loadImage();
        }
      },
      { threshold: 0 }
    );

    function loadImage() {
      if (image.value) {
        image.value.src = src.value;
        image.value.onload = () => {
          isLoaded.value = true;
        };
      }
    }

    onMounted(() => {
      if (image.value) {
        observer.observe(image.value);
      }
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      image,
      isLoaded,
      loadImage,
    };
  },
};
</script>
<style lang="stylus" scoped>
.image-lazyload {
  position: relative;
  width: 150px;
  height: 150px;

  &-placeholder {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: inline-block;
      width: 50%;
      height: 50%;
    }
  }
}
</style>